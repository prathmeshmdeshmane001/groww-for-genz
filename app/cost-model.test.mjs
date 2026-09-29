import fs from "fs";
import assert from "assert";
const src = fs.readFileSync(new URL("./v2-groww-genz.html", import.meta.url), "utf8");

const grab = (name) => {
  const i = src.indexOf("function " + name + "(");
  assert(i > 0, "missing " + name);
  let d = 0;
  for (let k = src.indexOf("{", i); k < src.length; k++) {
    if (src[k] === "{") d++;
    else if (src[k] === "}") { d--; if (!d) return src.slice(i, k + 1); }
  }
};
const slice = (from, to) => src.slice(src.indexOf(from), src.indexOf(to));

const M = new Function(
  slice("var FUNDS={", "var PEERS=") +
  slice("var WHENS=", "var RISKS=") +
  grab("inr") + grab("rs") + grab("whenTxt") + grab("rate") + grab("grow") +
  grab("feeDrag") + grab("netValue") + grab("fundCost") + grab("stockCost") + grab("fdRate") +
  "; return {FUNDS, whenTxt, rate, grow, feeDrag, netValue, fundCost, stockCost, fdRate};")();

const r = n => Math.round(n * 100) / 100;
let fails = 0;
const t = (label, got, want, tol = 0.01) => {
  const ok = Math.abs(got - want) <= tol; if (!ok) fails++;
  console.log((ok ? "PASS" : "FAIL") + "  " + label + "  got " + r(got) + "  want " + want);
};
const ck = (label, cond) => { if (!cond) fails++; console.log((cond ? "PASS" : "FAIL") + "  " + label); };

// the anchor that must never move
t("stock Rs500 round trip", M.stockCost(500).total, 18.22);
t("stock Rs100 round trip", M.stockCost(100).total, 16.4, 0.25);

// the fee compounds on a growing balance, so it must beat the naive model
for (const [k, y] of [["index", 5], ["balanced", 2], ["next50", 5], ["shortterm", 3]]) {
  const F = M.FUNDS[k], A = 5000;
  const naive = A * F.er * y, real = M.feeDrag(A, F, y);
  ck(k + " fee drag > naive  (" + r(naive) + " -> " + r(real) + ")", real > naive);
}

// exit charges
ck("balanced exit bites inside 1y", M.FUNDS.balanced.load(0.99) === 0.007);
ck("balanced exit gone after 1y", M.FUNDS.balanced.load(1.01) === 0);
ck("index exit always nil", M.FUNDS.index.load(0.1) + M.FUNDS.index.load(9) === 0);
ck("next50 exit always nil", M.FUNDS.next50.load(5) === 0);
ck("shortterm exit always nil", M.FUNDS.shortterm.load(3) === 0);
ck("liquid exit nil from day 7", M.FUNDS.liquid.load(7 / 365) === 0);

// sane across every fund x amount x horizon the UI can produce
let bad = 0;
for (const A of [100, 500, 1000, 5000, 23750, 100000])
  for (const k of Object.keys(M.FUNDS))
    for (const m of [6, 12, 24, 36, 60, 120]) {
      const F = M.FUNDS[k], y = m / 12;
      const c = M.fundCost(A, F, y).total, n = M.netValue(A, F, y);
      if (!(c >= 0) || Number.isNaN(c) || !(n > A) || Number.isNaN(n)) bad++;
    }
ck("no NaN / negative / value-below-principal across funds x amounts x horizons", bad === 0);

// cost must rise with time
ck("index cost grows with time", M.fundCost(5000, M.FUNDS.index, 5).total > M.fundCost(5000, M.FUNDS.index, 1).total);

// the split must never lose or invent money
const splitOK = [0, 5, 10, 20, 50, 100].every(p => {
  const amt = 5000, sw = Math.round(amt * p / 100);
  return sw + (amt - sw) === amt;
});
ck("swing + steady always equals the amount (0-100%)", splitOK);

// FD baseline — SBI retail rates, must match the published slabs
t("FD 1 year", M.fdRate(12) * 100, 6.25);
t("FD 2 years", M.fdRate(24) * 100, 6.40);
t("FD 3 years", M.fdRate(36) * 100, 6.30);
t("FD 5 years", M.fdRate(60) * 100, 6.05);
t("FD 6 months", M.fdRate(6) * 100, 5.65);
ck("FD rate never negative or above 10% at any tenure",
   [1, 6, 11, 12, 23, 24, 35, 36, 59, 60, 120, 240].every(m => M.fdRate(m) > 0 && M.fdRate(m) < 0.10));
// over 5 years the index fund's own record should beat an FD; over 6 months a liquid fund should not
ck("index beats FD over 5y (on its own 10y record)",
   M.netValue(5000, M.FUNDS.index, 5) > M.grow(5000, M.fdRate(60), 5));
// liquid nets 5.9% after its fee vs a 5.65% six-month FD: it wins, but only just.
// If that margin ever inverts the screen must say the FD won, so assert the sign explicitly.
const liq = M.netValue(5000, M.FUNDS.liquid, 0.5), fd6 = M.grow(5000, M.fdRate(6), 0.5);
ck("liquid beats a 6-month FD by under 1% of the amount (" +
   r(liq - fd6) + " on Rs5,000)", liq > fd6 && (liq - fd6) < 50);

console.log("\n--- Rs5,000 for 5 years, by fund ---");
for (const k of Object.keys(M.FUNDS)) {
  const F = M.FUNDS[k], y = 5, d = M.fundCost(5000, F, y);
  const fin = M.netValue(5000, F, y) - (d.total - M.feeDrag(5000, F, y));
  console.log(k.padEnd(10) + " @" + String(F.r10).padStart(4) + "%  ->  Rs" + String(r(fin)).padStart(9) +
              "   charges Rs" + r(d.total));
}
console.log(fails ? "\n" + fails + " FAILED" : "\nall checks passed");
process.exit(fails ? 1 : 0);
