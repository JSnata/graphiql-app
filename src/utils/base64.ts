function base64ToBytes(base64: string) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
} // from MDN (https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem)

function bytesToBase64(bytes: Uint8Array) {
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
    return btoa(binString);
} // from MDN (https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem)

export function encodeBase64(str: string): string {
    return bytesToBase64(new TextEncoder().encode(str));
}

export function decodeBase64(str: string): string {
    return new TextDecoder().decode(base64ToBytes(str));
}
