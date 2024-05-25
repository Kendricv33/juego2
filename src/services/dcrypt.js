import { createDecipheriv, scryptSync } from 'node:crypto';

export const decrypt = (text) => {
  const algorithm = 'aes-192-cbc';
  const password = 'juego-del-ahorcado-2024';
  const [iv, encrypted] = text.split(':').map((part) => Buffer.from(part, 'hex'));

  const key = scryptSync(password, 'salt', 24);

  try {
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};
