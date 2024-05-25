import styles from './styles.module.css';

export default function Word({ word }) {
  return (
    <div className={`${styles.hiddenWord}`}>
      {word.split('').map((character, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <span key={index}>
          {character}{' '}
        </span>
      ))}
    </div>
  );
}
