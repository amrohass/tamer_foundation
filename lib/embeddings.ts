import os from "node:os";
import path from "node:path";
import type { FeatureExtractionPipeline } from "@huggingface/transformers";

// Must match the model used by scripts/generate-seed.mts so query vectors
// live in the same space as the seeded recipe embeddings.
export const EMBEDDING_MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

const LOAD_TIMEOUT_MS = 9000;

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

async function loadExtractor(): Promise<FeatureExtractionPipeline> {
  // Imported dynamically: on hosts where the native ONNX runtime cannot load
  // (e.g. serverless), the failure lands in getQueryEmbedding's catch and
  // search degrades to keyword mode instead of crashing the route.
  const { env, pipeline } = await import("@huggingface/transformers");
  // The default model cache lives in node_modules, which is read-only on
  // serverless hosts — /tmp is the only writable location there.
  env.cacheDir = path.join(os.tmpdir(), "transformers-cache");
  try {
    return await pipeline("feature-extraction", EMBEDDING_MODEL, {
      dtype: "q8",
    });
  } catch {
    // Native backend unavailable — retry on the portable WASM backend.
    return await pipeline("feature-extraction", EMBEDDING_MODEL, {
      dtype: "q8",
      device: "wasm",
    });
  }
}

function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    extractorPromise = loadExtractor().catch((error: unknown) => {
      // A failed load should not poison future requests.
      extractorPromise = null;
      throw error;
    });
  }
  return extractorPromise;
}

/**
 * Embeds a search query with the multilingual model, or returns `null` when
 * the model cannot be loaded in time — callers fall back to keyword search.
 * A load timeout leaves the model warming in the background, so a later
 * request can still succeed.
 */
export async function getQueryEmbedding(text: string): Promise<number[] | null> {
  try {
    const extractor = await Promise.race([
      getExtractor(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Embedding model load timed out")),
          LOAD_TIMEOUT_MS,
        ),
      ),
    ]);
    const output = await extractor([text], { pooling: "mean", normalize: true });
    return (output.tolist() as number[][])[0];
  } catch {
    return null;
  }
}
