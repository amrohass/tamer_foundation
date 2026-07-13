import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // transformers.js loads native onnxruntime bindings at runtime; they must
  // not be bundled.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
