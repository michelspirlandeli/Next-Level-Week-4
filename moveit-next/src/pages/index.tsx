import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { CompletedChallenges } from '../components/CompletedChallenges';

import Head from 'next/head'
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <>
    <Head>
      <title>Inicio | move.it</title>
    </Head>
    
    <div className={styles.container} >
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
    </>
  )
}
