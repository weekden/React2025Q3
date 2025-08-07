import type { Character } from '../types/api';

const saveFile = (selector: Character[], quantity: number): void => {
  if (selector.length === 0) {
    return;
  }

  const header: (keyof Character)[] = [
    'id',
    'name',
    'gender',
    'race',
    'description',
    'appearances',
  ];

  const rowsArr = selector.map((item) => {
    return header.map((head) => item[head]).join(',');
  });

  const csvText = [header.join(','), ...rowsArr].join('\n');
  const blob = new Blob([csvText], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${quantity}_items`;
  link.click();
};

export default saveFile;
