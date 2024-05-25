import styles from './styles.module.css';

export default function Control({ onClick, type = 'button', children }) {
  return (
    <button onClick={onClick} className={`${styles.control}`} type={type}>
      {children}
    </button>
  );
}
