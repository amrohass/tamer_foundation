import {
  pipeline,
  type FeatureExtractionPipeline,
} from "@huggingface/transformers";

// Must match the model used by scripts/generate-seed.mts so query vectors
// live in the same space as the seeded recipe embeddings.
export const EMBEDDING_MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

const LOAD_TIMEOUT_MS = 9000;

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    extractorPromise = pipeline("feature-extraction", EMBEDDING_MODEL, {
      dtype: "q8",
    }).catch((error: unknown) => {
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
