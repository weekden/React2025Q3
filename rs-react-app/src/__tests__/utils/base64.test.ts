import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { convertToBase64 } from '../../utils/base64';

class FakeFileReader {
  public onload: ((e: unknown) => void) | null = null;
  public onerror: ((e: unknown) => void) | null = null;
  public result: unknown = null;
  public error: unknown = null;

  public readAsDataURL = vi.fn(() => {
    Promise.resolve().then(() => {
      this.result = 'data:application/octet-stream;base64,ZmFrZQ==';
      this.onload?.({});
    });
  });
}

describe('convertToBase64', () => {
  const original = globalThis.FileReader;
  let ctorSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    ctorSpy = vi.fn().mockImplementation(() => new FakeFileReader());
    // @ts-expect-error override for tests
    globalThis.FileReader = ctorSpy;
  });

  afterEach(() => {
    globalThis.FileReader = original;
    vi.restoreAllMocks();
  });

  it(' should return "" when file is undefined', async () => {
    await expect(convertToBase64(undefined)).resolves.toBe('');
    expect(ctorSpy).not.toHaveBeenCalled();
  });

  it('should resolve with a data URL on success', async () => {
    const file = new Blob(['hello'], { type: 'text/plain' }) as unknown as File;
    await expect(convertToBase64(file)).resolves.toBe(
      'data:application/octet-stream;base64,ZmFrZQ=='
    );
    expect(ctorSpy).toHaveBeenCalledTimes(1);
  });

  it('should reject when FileReader errors', async () => {
    ctorSpy.mockImplementationOnce(() => {
      const fr = new FakeFileReader();
      fr.readAsDataURL = vi.fn(() => {
        Promise.resolve().then(() => {
          fr.error = new DOMException('boom', 'AbortError');
          fr.onerror?.({});
        });
      });
      return fr;
    });

    const file = new Blob(['x'], { type: 'text/plain' }) as unknown as File;
    await expect(convertToBase64(file)).rejects.toBeInstanceOf(DOMException);
  });
});
