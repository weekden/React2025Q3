import type { Character } from '../types/api';

export default async function saveFile(
  selector: Character[],
  quantity: number
): Promise<void> {
  if (!selector.length) {
    return;
  }

  const response = await fetch('/api/create-csv', {
    method: 'POST',
    body: JSON.stringify(selector),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${quantity}_items.csv`;
  link.click();
}
