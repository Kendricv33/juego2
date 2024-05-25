import styles from './styles.module.css'

export default function Bomb({ isExplode = false }) {

  return (
    <img className={`${styles.bomb}`} src={`${isExplode ? '/you-lose.png' : '/bomb.png'}`} alt="Bomba" />
  )
}
