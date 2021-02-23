
import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(25 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
  
  const minuteValues = String(minutes).padStart(2, '0').split('')
  const secondValues = String(seconds).padStart(2, '0').split('')

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time-1)
      },1000)  
    }    
  }, [active, time])  
  
  function startCountdown() {
    setActive(true)
  }

  return(
    <>
    <div className={styles.countdownContainer} >
      <div>
        <span>{minuteValues[0]}</span>
        <span>{minuteValues[1]}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondValues[0]}</span>
        <span>{secondValues[1]}</span>
      </div>
    </div>
    <button 
      type='button'
      className={styles.countdownButton} 
      onClick={startCountdown}
    >
      Iniciar um ciclo
    </button>
    </>
  ) 
}