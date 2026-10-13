import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { getMedicalCategory } from "@/data/medical";
import { getMedicalProductGroups } from "./medical-groups";

describe("medical device brand separation", () => {
  test("International brands first, ComWell in its own separate section", () => {
    const category = getMedicalCategory("devices");
    if (!category) throw new Error("Medical devices category is required");
    const groups = getMedicalProductGroups(category);
    assert.equal(groups.length, 2);
    assert.deepEqual(groups[0]?.products.map((p) => p.slug), ["scd", "ted"]);
    assert.deepEqual(groups[1]?.products.map((p) => p.slug), ["comwell"]);
    assert.equal(groups.flatMap((g) => g.products).length, 3);
  });
});
