import styles from './styles.module.css'

export default function Reward({ doYouLose }) {
  return (
    <img className={`${styles.reward}`} src={`${doYouLose ? '/you-lose.png' : "/reward.png"}`} alt="You lose" />
  )
}
