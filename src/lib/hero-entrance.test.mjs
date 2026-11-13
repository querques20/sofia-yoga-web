// runs with `pnpm test` (node:test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { heroEntrance, heroEntranceEnds, heroEntranceStarts, heroLeft, onHeroEntrance } from "./hero-entrance.ts";

test("with no hero on the page there is no entrance", () => {
  assert.equal(heroEntrance(), "none");
});

test("the hero says when its entrance starts and when it ends, and whoever listens hears both", () => {
  const heard = [];
  const stop = onHeroEntrance((state) => heard.push(state));
  heroEntranceStarts();
  assert.equal(heroEntrance(), "running");
  heroEntranceEnds();
  assert.equal(heroEntrance(), "done");
  stop();
  assert.deepEqual(heard, ["running", "done"]);
});

test("saying the same thing twice is heard once", () => {
  const heard = [];
  const stop = onHeroEntrance((state) => heard.push(state));
  heroEntranceEnds();
  heroEntranceEnds();
  stop();
  assert.deepEqual(heard, []);
});

test("when the hero leaves, the next visit starts from nothing, and a listener that left hears no more", () => {
  const heard = [];
  const stop = onHeroEntrance((state) => heard.push(state));
  heroLeft();
  stop();
  heroEntranceStarts();
  assert.deepEqual(heard, ["none"]);
  assert.equal(heroEntrance(), "running");
  heroLeft();
});
