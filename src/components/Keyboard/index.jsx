import styles from './styles.module.css';

const Button = ({ letter, disabled = false, onClick }) => {
  return (
    <button
      onClick={() => onClick(letter)}
      className={`${styles.button} ${disabled ? styles.inactive : ''}`}
      disabled={disabled}
      type='button'
      title={letter}>
      {letter}
    </button>
  );
};

export default function Keyboard({ handleLetterClick, disabledLetters }) {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)).concat('Ñ');

  return (
    <div className={`${styles.container}`}>
      {letters.map((letter) => (
        <Button
          key={letter}
          letter={letter}
          onClick={handleLetterClick}
          disabled={disabledLetters[letter]}
        />
      ))}
    </div>
  );
}
