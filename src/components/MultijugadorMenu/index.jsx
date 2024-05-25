import Control from '../Control';
import { useState } from 'react';
import { createGame } from '@/services/sql/createGame';

import styles from './styles.module.css'

const createAllowedCharacters = () => {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
  letters.push('Ñ');
  return new Set(letters);
};

const sanitizeString = (input) => {
  const allowedCharacters = createAllowedCharacters();
  let result = '';

  const newInput = input.toUpperCase();

  for (const char of newInput) {
    if (allowedCharacters.has(char)) {
      result += char;
    }
  }

  return result;
};

export default function MultijugadorMenu() {
  const [invitationUrl, setInvitationUrl] = useState('');
  const [finalWord, setFinalWord] = useState("second");

  const handleCreateGame = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const word = formData.get('player1-word');
    const newWord = sanitizeString(word);

    if (!newWord) {
      alert('Por favor, ingrese una palabra válida para jugar.');
      return;
    }

    const result = await createGame({ word: newWord });
    setInvitationUrl(result.word);
    setFinalWord(newWord)
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`https://juego-del-ahorcado-three.vercel.app/multijugador/${invitationUrl}`)
      .then(() => {
        alert('Enlace copiado al portapapeles!');
      })
      .catch((err) => {
        console.error('Error al copiar el enlace: ', err);
        alert('Error al copiar el enlace.');
      });
  };

  return (
    <section>
      <h1>Multijugador</h1>
      <section>
        <form onSubmit={handleCreateGame}>
          <div className={`${styles.inputContainer}`}>
            <label htmlFor='player1-word'>Ingrese una palabra para el juego:</label>
            <input
              className={`${styles.input}`}
              type='text'
              name='player1-word'
              id='player1-word'
              placeholder='Escaleras, Monitor, Compiladores...'
              aria-label='Ingrese una palabra para el juego'
            />
          </div>
          <span className={`${styles.note}`}>Nota: Todo caracter no válido, será eliminado antes de guardar en la base de datos.</span>
          {invitationUrl === '' ? (
            <Control type='submit'>Crear juego</Control>
          ) : (
            <div>
              <p>De click al botón para copiar el enlace del juego y enviéselo al contricante:</p>
              <Control onClick={copyToClipboard} title='Copiar enlace' type='button'>
                Copiar enlace
              </Control>
              <span className={`${styles.note}`}>La palabra a jugar será: {finalWord}</span>
            </div>
          )}
        </form>
      </section>
    </section>
  );
}
