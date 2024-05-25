import ControlAnchor from '../Control/ControlAnchor';

import styles from './styles.module.css'

export default function MainMenu() {
  return (
    <section>
      <h1 className={styles.title}>Juego del ahorcado</h1>
      <ul className={styles.listOfOptions}>
        <li>
          <ControlAnchor href={'/solitario'}>Juego en solitario</ControlAnchor>
        </li>
        <li>
          <ControlAnchor href={'/multijugador/menu'}>Juego multijugador</ControlAnchor>
        </li>
      </ul>
    </section>
  );
}
