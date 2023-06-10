import React from 'react'
import Tilt from 'react-parallax-tilt'
import styles from '../styles'
import { allCards } from '../assets' 

const generateRandomCardImage = () => allCards[Math.floor(Math.random() * ( allCards.length - 1))];
const img1 = generateRandomCardImage();
const img2 = generateRandomCardImage();

const Card = ({card, title, restStyles, playerTwo, cardRef}) => {
  return (
    <Tilt>
      <div ref={cardRef} className={`${styles.cardContainer} ${restStyles}`}>
        <img
          src={playerTwo ? img2 : img1}
          alt="card"
          className={styles.cardImg}
        />

        <div
          className={`${styles.cardPointContainer} md:left-[26.2%] left-[26%] bottom-[28.7%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-yellow-400`}> {card.att} </p>
        </div>
        <div
          className={`${styles.cardPointContainer} md:right-[20.2%] right-[21.5%] bottom-[28.7%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-red-700`}> {card.def} </p>
        </div>

        <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
          <p className={styles.cardText}> {title} </p>
        </div>
      </div>
    </Tilt>
  );
}

export default Card