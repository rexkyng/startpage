import { defineConfig } from "astro/config";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
	integrations: [compress(), prefetch(), react()],
    output: "server",
    adapter: vercel(),
});
