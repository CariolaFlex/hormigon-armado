import type { NextConfig } from "next";
import path from "path";

const turfStub = path.resolve(__dirname, "src/stubs/turf.js");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/capitulo-1", destination: "/materiales/hormigon", permanent: true },
      { source: "/capitulo-1/:path*", destination: "/materiales/hormigon/:path*", permanent: true },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback as Record<string, unknown> || {}),
        "buffer": require.resolve("buffer/"),
        "stream": false,
        "fs": false,
        "path": false,
        "crypto": false,
        "os": false,
        "url": false,
        "assert": false,
        "util": false,
      };
    }
    // Replace @turf/* with empty stubs — Plotly only uses them for scattergeo/
    // scattermap traces which are not used in this application.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> || {}),
      "@turf/helpers": turfStub,
      "@turf/area":    turfStub,
      "@turf/centroid": turfStub,
      "@turf/meta":    turfStub,
    };
    return config;
  },
};

export default nextConfig;
