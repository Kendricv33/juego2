import { useGame } from '@/hooks/useGame';
import styles from './styles.module.css';
import Person from '../Person';
import Keyboard from '../Keyboard';
import Word from '../Word';
import Control from '../Control';
import ControlAnchor from '../Control/ControlAnchor';
import { useRouter } from 'next/router';

export default function Solitario({ initialWord = null }) {
  const { handleLetterClick, handleNewGame, failedAttempts, disabledLetters, wordState } = useGame({ initialWord });
  const router = useRouter();

  const handleNewGameRandom = () => {
    if (router.pathname === '/solitario') {
      router.reload();
    } else {
      router.push('/solitario');
    }
  }

  return (
    <section>
      <header className={`${styles.controls}`}>
        <Control onClick={handleNewGameRandom} className={`${styles.control}`} type='button'>
          Nuevo juego aleatorio
        </Control>
        <Control onClick={handleNewGame} className={`${styles.control}`} type='button'>
          Nuevo juego personalizado
        </Control>
        <ControlAnchor href={'/'} title={'Regresar al menú principal'}>
          Regresar al menú principal
        </ControlAnchor>
      </header>
      <Person numberOfTries={failedAttempts} />
      <Word word={wordState} />
      <Keyboard handleLetterClick={handleLetterClick} disabledLetters={disabledLetters} />
    </section>
  );
}
