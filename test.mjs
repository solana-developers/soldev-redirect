import { before, after, describe, test } from "node:test";
import { Miniflare } from "miniflare";

describe("soldev redirects", () => {
  const mf = new Miniflare({
    modules: true,
    scriptPath: "cloudflare-worker.js",
  });

  test("Ironforge redirection works", async () => {
    const response = await mf.dispatchFetch("http://localhost:8787/");
    const responseText = await response.text();
    if (!responseText.includes("<title>Ironforge</title>")) {
      throw new Error("❌ did not redirect properly");
    }
  });

  test("Course page redirection works", async () => {
    const response = await mf.dispatchFetch("http://localhost:8787/course");
    const responseText = await response.text();
    if (!responseText.includes("<title>Developer Courses")) {
      throw new Error("❌ did not redirect properly");
    }
  });

  test("Deep link redirection works", async () => {
    const response = await mf.dispatchFetch(
      "http://localhost:8787/course/anchor-pdas"
    );
    const responseText = await response.text();
    if (!responseText.includes("<title>Anchor PDAs and Accounts")) {
      throw new Error("❌ did not redirect properly");
    }
  });

  test("Even if redirect is unknown, send people to /course", async () => {
    const response = await mf.dispatchFetch(
      "http://localhost:8787/course/course-that-does-not-exist-anymore"
    );
    const responseText = await response.text();
    if (!responseText.includes("<title>Developer Courses")) {
      throw new Error("❌ did not redirect properly");
    }
  });

  after(async () => {
    await mf.dispose();
  });
});
