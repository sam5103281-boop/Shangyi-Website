import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { getMedicalCategory } from "@/data/medical";
import { getMedicalProductGroups } from "./medical-groups";

describe("medical device brand separation", () => {
  test("ComWell is alone and separate from T.E.D. and SCD", () => {
    const category = getMedicalCategory("devices");
    if (!category) throw new Error("Medical devices category is required");
    const groups = getMedicalProductGroups(category);
    assert.equal(groups.length, 2);
    assert.deepEqual(groups[0]?.products.map((product) => product.slug), ["comwell"]);
    assert.deepEqual(groups[1]?.products.map((product) => product.slug), ["ted", "scd"]);
    assert.equal(groups.flatMap((group) => group.products).length, 3);
  });
});