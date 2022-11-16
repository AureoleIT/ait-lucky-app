const withImages = require("next-images");
/** @type {import('next').NextConfig} */
module.exports = withImages({
  webpack(config, options) {
    delete config.resolve.alias.url;
    return config;
  },
  // comment below when building on localhost
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     "/": { page: "/" },
  //     "/auth/login": { page: "/auth/login" },
  //     "/auth/register": { page: "/auth/login" },
  //   };
  // },
  // distDir: "../../dist/client",
  // output: "standalone",
  // false for dev, true for product
  // reactStrictMode: false,

  // images: {
  //   domains: ["s120-ava-talk.zadn.vn", "blob"],
  // },

  // swcMinify: true,
  // assetPrefix: "./",

  // experimental: {
  //   images: {
  //     unoptimized: true,
  //   },
  // },
});

