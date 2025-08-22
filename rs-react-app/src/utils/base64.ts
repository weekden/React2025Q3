export async function convertToBase64(file: File | undefined): Promise<string> {
  if (typeof file === 'undefined') {
    return '';
  }
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (): void => res(reader.result as string);
    reader.onerror = (): void => rej(reader.error);
    reader.readAsDataURL(file);
  });
}
