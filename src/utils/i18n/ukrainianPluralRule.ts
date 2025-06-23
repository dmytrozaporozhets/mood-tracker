export function ukrainianPluralRule(n: number): number {
  const n10 = n % 10;
  const n100 = n % 100;

  if (n10 === 1 && n100 !== 11) return 0; // one
  if (n10 >= 2 && n10 <= 4 && !(n100 >= 12 && n100 <= 14)) return 1; // few
  return 2; // many
}
