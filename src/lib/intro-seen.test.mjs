// runs with `pnpm test` (node:test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { INTRO_TTL_MS, introMark, introSeen } from "./intro-seen.ts";

const NOW = 1_800_000_000_000;

test("seen in this language a moment ago: no replay", () => {
  assert.equal(introSeen(introMark("fr", NOW - 1000), "fr", NOW, INTRO_TTL_MS), true);
});

test("seen in another language: replays", () => {
  assert.equal(introSeen(introMark("en", NOW - 1000), "fr", NOW, INTRO_TTL_MS), false);
});

test("seen longer ago than the time to live: replays", () => {
  assert.equal(introSeen(introMark("fr", NOW - INTRO_TTL_MS + 1), "fr", NOW, INTRO_TTL_MS), true);
  assert.equal(introSeen(introMark("fr", NOW - INTRO_TTL_MS), "fr", NOW, INTRO_TTL_MS), false);
});

test("never seen, or a mark with no time (the format before the time to live): replays", () => {
  assert.equal(introSeen(null, "fr", NOW, INTRO_TTL_MS), false);
  assert.equal(introSeen("fr", "fr", NOW, INTRO_TTL_MS), false);
  assert.equal(introSeen("fr|", "fr", NOW, INTRO_TTL_MS), false);
  assert.equal(introSeen("fr|soon", "fr", NOW, INTRO_TTL_MS), false);
});

test("a mark from the future (the clock moved back): replays", () => {
  assert.equal(introSeen(introMark("fr", NOW + 5000), "fr", NOW, INTRO_TTL_MS), false);
});

test("survives being inlined: the pre-paint script only has its source", () => {
  const inlined = new Function(`return (${introSeen.toString()})`)();
  assert.equal(inlined(introMark("fr", NOW - 1000), "fr", NOW, INTRO_TTL_MS), true);
  assert.equal(inlined(introMark("fr", NOW - INTRO_TTL_MS), "fr", NOW, INTRO_TTL_MS), false);
});
