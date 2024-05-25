import { pool } from '../connection';

export const getWord = async () => {
  try {
    const result = await pool.query('SELECT palabra FROM tbl_palabras ORDER BY RANDOM() LIMIT 1');
    if (result.rows.length > 0) {
      return result.rows[0].palabra;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
