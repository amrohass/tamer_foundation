import { NextResponse } from "next/server";
import { getQueryEmbedding } from "@/lib/embeddings";
import { getSupabase } from "@/lib/supabase";

// Allow time for the embedding model cold start on serverless hosts.
export const maxDuration = 30;

const MATCH_COUNT = 6;
const MIN_SEMANTIC_SIMILARITY = 0.25;
const MIN_KEYWORD_SIMILARITY = 0.08;

type RpcResult = { slug: string; similarity: number };

export type SearchResponse = {
  mode: "semantic" | "keyword" | "unavailable";
  results: RpcResult[];
};

/**
 * Search recipes by meaning. Chain: query embedding + pgvector similarity →
 * trigram keyword RPC when the model is unavailable → "unavailable" (the
 * client then filters its already-loaded recipes locally). Never throws.
 */
export async function POST(request: Request) {
  let query: unknown;
  try {
    ({ query } = (await request.json()) as { query?: unknown });
  } catch {
    query = null;
  }
  if (typeof query !== "string" || !query.trim() || query.length > 200) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }
  const text = query.trim();

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json<SearchResponse>({
      mode: "unavailable",
      results: [],
    });
  }

  const embedding = await getQueryEmbedding(text);
  if (embedding) {
    const { data, error } = await supabase.rpc("match_recipes", {
      query_embedding: `[${embedding.join(",")}]`,
      match_count: MATCH_COUNT,
    });
    if (!error && data) {
      const results = (data as RpcResult[])
        .filter((row) => row.similarity >= MIN_SEMANTIC_SIMILARITY)
        .map(({ slug, similarity }) => ({ slug, similarity }));
      return NextResponse.json<SearchResponse>({ mode: "semantic", results });
    }
  }

  const { data, error } = await supabase.rpc("search_recipes_keyword", {
    q: text,
    match_count: MATCH_COUNT,
  });
  if (!error && data) {
    const results = (data as RpcResult[])
      .filter((row) => row.similarity >= MIN_KEYWORD_SIMILARITY)
      .map(({ slug, similarity }) => ({ slug, similarity }));
    return NextResponse.json<SearchResponse>({ mode: "keyword", results });
  }

  return NextResponse.json<SearchResponse>({
    mode: "unavailable",
    results: [],
  });
}
