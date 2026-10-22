
const WEIGHTS = Object.freeze({
  written: 20,
  interview1: 30,
  interview2: 50
});

function calculateTotal(scores = {}) {
  const written = Number(scores.written ?? 0);
  const interview1 = Number(scores.interview1 ?? 0);
  const interview2 = Number(scores.interview2 ?? 0);

  return Number(
    (
      written * WEIGHTS.written / 100 +
      interview1 * WEIGHTS.interview1 / 100 +
      interview2 * WEIGHTS.interview2 / 100
    ).toFixed(2)
  );
}

module.exports = { WEIGHTS, calculateTotal };
