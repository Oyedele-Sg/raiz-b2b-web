declare module "aes-everywhere" {
  export default class AES256 {
    static encrypt(data: string, key: string): string;
    static decrypt(encryptedData: string, key: string): string;
  }
}
