import { encodeBase64, decodeBase64 } from '@/utils/base64';

describe('Base64 Encoding and Decoding', () => {
    it('should correctly encode and decode a valid string', () => {
        const originalString = 'Hello, World!';
        const encoded = encodeBase64(originalString);
        const decoded = decodeBase64(encoded);

        expect(decoded).toBe(originalString);
    });

    it('should throw an error for an invalid Base64 string', () => {
        const invalidBase64 = 'invalid_base64_string!@#';

        expect(() => {
            decodeBase64(invalidBase64);
        }).toThrowError('Invalid character');
    });

    it('should decode a URL-safe Base64 string correctly', () => {
        const validUrlSafeBase64 = 'SGVsbG8tV29ybGQ_';
        const decoded = decodeBase64(validUrlSafeBase64.replace(/-/g, '+').replace(/_/g, '/'));

        expect(decoded).toBe('Hello-World?');
    });
});
