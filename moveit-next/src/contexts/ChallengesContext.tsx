import { createContext, ReactNode, useEffect, useState } from "react";

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;

}

interface ChallengesContextData {
  level: number;
  experienceToNextLevel: number;
  currentExperience: number;
  challengesCompleted: number;
  challengeStarted: boolean;
  challengeFinished: boolean;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  hasFinishedChallenge: (t: boolean) => void;
  hasStartedChallenge: (t: boolean) => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeFinished, setChallengeFinished] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1);
  }

  function hasFinishedChallenge(t: boolean) {
    setChallengeFinished(t);
  }

  function hasStartedChallenge(t: boolean) {
    setChallengeStarted(t);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio 🎉', {
        body: `Valendo ${challenge.amount} xp!`,
        icon: '/favicon.png'
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
    setChallengeFinished(false);
    setChallengeStarted(false);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setChallengeFinished(false);
    setChallengeStarted(false);
  }

  return (
    <ChallengesContext.Provider value={
      {
        level,
        experienceToNextLevel,
        currentExperience,
        challengesCompleted,
        challengeStarted,
        challengeFinished,
        activeChallenge,
        levelUp,
        startNewChallenge,
        hasFinishedChallenge,
        hasStartedChallenge,
        resetChallenge,
        completeChallenge
      }
    }>
      { children}
    </ChallengesContext.Provider>
  );
}