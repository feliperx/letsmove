import React from "react";
import Head from "next/head";
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import { ChallengeProvider } from "../contexts/ChallengeContext";

interface HomeProps {
  level: number; 
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps){ 

  console.log(props);

  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <ExperienceBar />
        <Head>
          <title>Home - LetsMove</title>
        </Head>

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  );
} 

//Execute on Server Node (NextJS)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return{
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
