import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // transformers.js loads native onnxruntime bindings at runtime; they must
  // not be bundled.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node"],
  // File tracing misses onnxruntime's dynamically-loaded shared library
  // (libonnxruntime.so.1) on Linux hosts — include it explicitly so the
  // embedding model can run on the deployment platform.
  outputFileTracingIncludes: {
    "/api/search-recipes": [
      "./node_modules/onnxruntime-node/bin/napi-v6/linux/**",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
