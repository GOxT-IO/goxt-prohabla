import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/confirmar", destination: "/contacto", permanent: true }];
  },
};

export default nextConfig;
