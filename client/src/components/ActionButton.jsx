import React from 'react'
import Tilt from "react-parallax-tilt";

import styles from '../styles'


const ActionButton = ({imgUrl, handleClick, restStyles}) => {
  return (
    <div className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles}`}>
      <img src={imgUrl} alt="action_img" className={styles.gameMoveIcon} />
    </div>
  )
}

export default ActionButton