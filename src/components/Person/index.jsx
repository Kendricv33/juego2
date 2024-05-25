import Bomb from '../Bomb'
import Reward from '../Reward'
import styles from './styles.module.css'

export default function Person({ numberOfTries = 0 }) {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.bombContainer}`}>
        <Bomb isExplode={numberOfTries > 0} />
        <Bomb isExplode={numberOfTries > 1} />
        <Bomb isExplode={numberOfTries > 2} />
      </div>
      <Reward doYouLose={numberOfTries >= 6} />
      <div className={`${styles.bombContainer}`}>
        <Bomb isExplode={numberOfTries > 3} />
        <Bomb isExplode={numberOfTries > 4} />
        <Bomb isExplode={numberOfTries > 5} />
      </div>
    </div>
  )
}
