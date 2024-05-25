import styles from './styles.module.css'

export default function Layout({ children }) {
  return (
    <main className={`${styles.main}`}>
      {children}
    </main>
  )
}
