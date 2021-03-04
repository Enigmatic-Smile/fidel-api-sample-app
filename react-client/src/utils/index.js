export function formatCard(card) {
  return `${card?.firstNumbers}******${card?.lastNumbers}`
    .match(/.{4}/g)
    .join(" ");
}
