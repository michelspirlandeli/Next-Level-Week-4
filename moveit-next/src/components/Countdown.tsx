
import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  const {  
    minutes, 
    seconds,
    hasFinished, 
    isActive, 
    startCountDown,
    resetCountDown,
  } = useContext(CountDownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <>
      <div className={styles.countdownContainer} >
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={` ${styles.countdownButton} ${styles.countdownButtonActive} `}
        >
          Ciclo encerrado
          <img src="icons/check-circle.svg" alt="Level" />
        </button>
      ) : (
          <>
            {isActive ? (
              <button
                type='button'
                className={styles.countdownButton}
                onClick={resetCountDown}
              >
                Abandonar ciclo
                <img src="icons/close.svg" alt="Level" />
              </button>
            ) : (
                <button
                  type='button'
                  className={styles.countdownButton}
                  onClick={startCountDown}
                >
                  Iniciar um ciclo
                  <img src="icons/play_arrow.svg" alt="Level" />
                </button>
              )}
          </>
        )}
    </>
  )
}