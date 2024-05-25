import { pool } from '@/services/connection';
import { createCipheriv, randomBytes, scryptSync } from 'node:crypto';

const encrypt = (text) => {
  const algorithm = 'aes-192-cbc';
  const password = 'juego-del-ahorcado-2024';
  const key = scryptSync(password, 'salt', 24);
  const iv = randomBytes(16);

  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { word } = req.body;

      if (!word) {
        return res.status(400).json({ message: "Se requiere la palabra" });
      }

      await pool.query(
        'INSERT INTO tbl_palabras (palabra) VALUES ($1) RETURNING *', 
        [word]
      );

      const encryptedWord = encrypt(word);

      res.status(200).json({ word: encryptedWord });
    } catch (error) {
      console.error('Error al crear el juego: ', error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Método no permitido' });
  }
}
