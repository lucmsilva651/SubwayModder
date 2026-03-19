const IV = new Uint8Array(16); // 16 zero bytes

async function getKey(usage) {
  const keyBytes = new Uint8Array(__ENCRYPTION_KEY__);
  return window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    [usage]
  );
}

export async function encrypt(input) {
  const cryptoKey = await getKey("encrypt");
  const data = new TextEncoder().encode(input);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: IV },
    cryptoKey,
    data
  );

  const bytes = new Uint8Array(encryptedBuffer);
  return btoa(String.fromCharCode(...bytes));
}

export async function decrypt(input) {
  const cryptoKey = await getKey("decrypt");
  const rawCiphertext = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: IV },
    cryptoKey,
    rawCiphertext
  );

  return new TextDecoder().decode(decryptedBuffer);
}