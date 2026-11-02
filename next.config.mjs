import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// NEXT_PUBLIC_STATIC_EXPORT=1 → statyczny eksport do out/ (GitHub Pages).
// NEXT_PUBLIC_BASE_PATH → np. "/ceramineczka" dla agalapinska.github.io/ceramineczka;
// pusty przy własnej domenie. Workflow bierze go z actions/configure-pages.
const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin tracing root so Next.js stops walking up to ~/package-lock.json (orphan).
  outputFileTracingRoot: __dirname,
  ...(isStatic && {
    output: "export",
    basePath,
    trailingSlash: true,
  }),
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
