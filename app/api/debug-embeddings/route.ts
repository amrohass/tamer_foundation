import { NextResponse } from "next/server";
import { EMBEDDING_MODEL } from "@/lib/embeddings";

// TEMPORARY diagnostic route to surface the embedding-model load error on
// the deployment host. Removed before freeze.
export const maxDuration = 60;

export async function GET() {
  const steps: string[] = [`node ${process.version}`];
  const record = (label: string, error: unknown) =>
    steps.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);

  try {
    const os = await import("node:os");
    const path = await import("node:path");
    steps.push("importing transformers…");
    const { env, pipeline } = await import("@huggingface/transformers");
    steps.push("import ok");
    env.cacheDir = path.join(os.tmpdir(), "transformers-cache");
    try {
      steps.push("loading native backend…");
      const extractor = await pipeline("feature-extraction", EMBEDDING_MODEL, {
        dtype: "q8",
      });
      const output = await extractor(["hello"], {
        pooling: "mean",
        normalize: true,
      });
      steps.push(`native ok, dims=${(output.tolist() as number[][])[0].length}`);
    } catch (nativeError) {
      record("native failed", nativeError);
      try {
        steps.push("loading wasm backend…");
        const extractor = await pipeline("feature-extraction", EMBEDDING_MODEL, {
          dtype: "q8",
          device: "wasm",
        });
        const output = await extractor(["hello"], {
          pooling: "mean",
          normalize: true,
        });
        steps.push(`wasm ok, dims=${(output.tolist() as number[][])[0].length}`);
      } catch (wasmError) {
        record("wasm failed", wasmError);
      }
    }
  } catch (importError) {
    record("import failed", importError);
  }

  return NextResponse.json({ steps });
}
