import AES256 from "aes-everywhere";

const PUBLIC_KEY = `${process.env.NEXT_PUBLIC_ENCRYPTION_KEY}`;

// Function to generate a random 15-character string
export const generateNonce = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < 15; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
};

// Function to encrypt data
export const encryptData = (data: string): string =>
  AES256.encrypt(data, PUBLIC_KEY);

// Function to decrypt data
export const decryptData = (encryptedData: string): string =>
  AES256.decrypt(encryptedData, PUBLIC_KEY);
