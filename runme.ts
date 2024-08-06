import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  scriptPath: "cloudflare-worker.js",
});

const response = await mf.dispatchFetch(
  "http://localhost:8787/course/anchor-pdas"
);
const responseText = await response.text();
if (!responseText.includes("<title>Anchor PDAs and Accounts")) {
  throw new Error("❌ did not redirect properly");
}
console.log("✅ it worked");
await mf.dispose();
