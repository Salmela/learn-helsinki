import { expect, jest, it } from "@jest/globals";
import { isPointInPolygon } from "./isPointInPolygon";

describe("isPointInPolygon", () => {
  const triangle = [
    { lat: 0, lng: 0 },
    { lat: 1, lng: 0 },
    { lat: 0, lng: 1 },
  ];
  it("returns true if inside triangle", () => {
    expect(isPointInPolygon({ lat: 0.2, lng: 0.2 }, triangle)).toEqual(true);
  });
  it("returns true if on corner of triangle", () => {
    expect(isPointInPolygon({ lat: 0, lng: 0 }, triangle)).toEqual(true);
  });
  it("returns true if almost on below corner of triangle", () => {
    expect(isPointInPolygon({ lat: 0.999, lng: 0 }, triangle)).toEqual(true);
  });
  it("returns true if almost on right corner of triangle", () => {
    expect(isPointInPolygon({ lat: 0, lng: 0.999 }, triangle)).toEqual(true);
  });

  it("returns false if above triangle", () => {
    expect(isPointInPolygon({ lat: -1, lng: 0.5 }, triangle)).toEqual(false);
  });
  it("returns false if below triangle", () => {
    expect(isPointInPolygon({ lat: 1, lng: 0.5 }, triangle)).toEqual(false);
  });

  it("returns false if left side of triangle", () => {
    expect(isPointInPolygon({ lat: 0.5, lng: -1 }, triangle)).toEqual(false);
  });

  it("returns false if right side of triangle", () => {
    expect(isPointInPolygon({ lat: 0.5, lng: 1 }, triangle)).toEqual(false);
  });
});
