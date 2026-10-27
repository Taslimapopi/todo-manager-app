import { test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Regression test for GHSA-mrhx-c7xc-m3w5 (CVE-2023-54404).
// zod < 4.6.6 walked every element of an array before enforcing an upper size
// bound (`.max()` / `.length()`), accumulating one validation issue per failing
// element. An attacker could submit a very large array of invalid elements to
// exhaust memory. Fixed versions reject oversized arrays up front, reporting a
// single `too_big` issue without parsing any element.
test("array max() bound is enforced before elements are parsed", () => {
  const schema = z.array(z.string()).max(2);
  const oversized = new Array(5000).fill(123); // every element is invalid

  const result = schema.safeParse(oversized);

  assert.equal(result.success, false);
  assert.equal(result.error.issues.length, 1);
  assert.equal(result.error.issues[0].code, "too_big");
});
