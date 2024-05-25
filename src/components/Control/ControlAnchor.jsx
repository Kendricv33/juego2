import Link from 'next/link';
import styles from './styles.module.css';

export default function ControlAnchor({ href, title, children }) {
  return (
    <Link className={`${styles.control}`} href={href} title={title}>
      {children}
    </Link>
  );
}
