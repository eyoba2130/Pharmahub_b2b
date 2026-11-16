import CryptoJS from 'crypto-js';

const key = process.env.ENCRYPTION_KEY;

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decrypt = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};