/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  optimizeFonts: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.wav$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/media/',
            publicPath: '_next/static/media/',
          },
        },
      ],
    });

    return config;
  },
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "https://arayas-cheats.com/api/:path*",
      // },
      // {
      //   source: "/uploads/:path*",
      //   destination: "https://arayas-cheats.com/uploads/:path*",
      // },
      {
        source: "/api/:path*",
        destination: "http://localhost:4200/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4200/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
