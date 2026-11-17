/**
 * Раскладывает строки по ключам и возвращает массивы в том же порядке, что и keys.
 * Именно этого требует DataLoader: результат i-го элемента соответствует i-му ключу.
 */
export function groupByKey<K, T>(keys: readonly K[], rows: readonly T[], getKey: (row: T) => K): T[][] {
  const groups = new Map<K, T[]>(keys.map(key => [key, []]));
  for (const row of rows) {
    groups.get(getKey(row))?.push(row);
  }
  return keys.map(key => groups.get(key) ?? []);
}
