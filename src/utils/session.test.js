import assert from "node:assert/strict";
import {describe, it} from "node:test";
import {getSessionStatus, getTokenExpiration} from "./session.js";

function makeToken(payload){
  const encode = value => btoa(JSON.stringify(value))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${encode({alg: "none"})}.${encode(payload)}.signature`;
}

describe("session expiry", () => {
  it("uses the JWT expiration without extending it", () => {
    const token = makeToken({exp: 1_800_000_000});

    assert.equal(getTokenExpiration(token), 1_800_000_000_000);
    assert.equal(getSessionStatus(token, 1_799_999_999_999), "valid");
    assert.equal(getSessionStatus(token, 1_800_000_000_000), "expired");
  });

  it("rejects malformed or missing expiration claims", () => {
    assert.equal(getSessionStatus(null), "missing");
    assert.equal(getSessionStatus("not-a-token"), "invalid");
    assert.equal(getTokenExpiration(makeToken({sub: "player"})), null);
  });
});
