import { describe, expect, test } from "bun:test";
import { getMedicalCategory } from "@/data/medical";
import { getMedicalProductGroups } from "./medical-groups";

describe("medical device brand separation", () => {
  test("ComWell is alone and separate from T.E.D. and SCD", () => {
    const category = getMedicalCategory("devices");
    if (!category) throw new Error("Medical devices category is required");
    const groups = getMedicalProductGroups(category);
    expect(groups).toHaveLength(2);
    expect(groups[0]?.products.map((product) => product.slug)).toEqual(["comwell"]);
    expect(groups[1]?.products.map((product) => product.slug)).toEqual(["ted", "scd"]);
    expect(groups.flatMap((group) => group.products)).toHaveLength(3);
  });
});