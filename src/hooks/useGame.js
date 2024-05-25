import { useState } from 'react';

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

export const useGame = ({ initialWord }) => {
  const [word, setWord] = useState(sanitizeString(initialWord));
  const [wordState, setWordState] = useState('_'.repeat(word.length));
  const [failedAttempts, setFailedAttempts] = useState(0);
  const initializeDisabledLetters = (disabled = false) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)).concat('Ñ');
    const disabledLetters = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    letters.forEach((letter) => {
      disabledLetters[letter] = disabled;
    });
    return disabledLetters;
  };

  const [disabledLetters, setDisabledLetters] = useState(initializeDisabledLetters(false));

  const handleLetterClick = (letter) => {
    setDisabledLetters((prev) => ({ ...prev, [letter]: true }));

    let acierto = false;
    const newState = [...wordState]
      .map((caracter, idx) => {
        if (word[idx] === letter && caracter === '_') {
          acierto = true;
          return letter;
        }
        return caracter;
      })
      .join('');

    setWordState(newState);

    if (!acierto) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts === 6) {
        const newDisabledLetters = { ...disabledLetters };
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(newDisabledLetters).forEach((key) => {
          newDisabledLetters[key] = true;
        });

        setDisabledLetters(newDisabledLetters);
        alert('Has perdido. Intenta otra vez!');
      }
    } else {
      // Comprobar si el jugador ha ganado
      if (!newState.includes('_')) {
        alert('¡Felicidades! Has ganado.');
        const newDisabledLetters = { ...disabledLetters };
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(newDisabledLetters).forEach((key) => {
          newDisabledLetters[key] = true;
        });
        setDisabledLetters(newDisabledLetters);
      }
    }
  };

  const handleNewGame = () => {
    const newWord = prompt('Ingrese la nueva palabra para el juego:', '');
    if (newWord) {
      const word = sanitizeString(newWord);
      setWord(word);
      setWordState('_'.repeat(word.length));
      setFailedAttempts(0);
      setDisabledLetters(initializeDisabledLetters());
    }
  };

  return {
    handleLetterClick,
    handleNewGame,
    failedAttempts,
    wordState,
    disabledLetters,
    word,
  };
};
