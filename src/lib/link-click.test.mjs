// runs with `pnpm test` (node:test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { isPlainClick, urlWithoutHash } from "./link-click.ts";

const click = (over = {}) => ({
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  ...over,
});

test("a plain left click is taken over", () => {
  assert.equal(isPlainClick(click()), true);
});

test("a click that opens elsewhere (new tab, new window, download) is left to the browser", () => {
  assert.equal(isPlainClick(click({ metaKey: true })), false);
  assert.equal(isPlainClick(click({ ctrlKey: true })), false);
  assert.equal(isPlainClick(click({ shiftKey: true })), false);
  assert.equal(isPlainClick(click({ altKey: true })), false);
  assert.equal(isPlainClick(click({ button: 1 })), false);
});

test("a click someone else already handled is left alone", () => {
  assert.equal(isPlainClick(click({ defaultPrevented: true })), false);
});

test("going up drops the hash and keeps the path and the query", () => {
  assert.equal(urlWithoutHash({ pathname: "/en/yoga-classes-geneva", search: "" }), "/en/yoga-classes-geneva");
  assert.equal(urlWithoutHash({ pathname: "/cours-de-yoga-geneve", search: "?a=1" }), "/cours-de-yoga-geneve?a=1");
});
