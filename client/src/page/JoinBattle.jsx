import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { CustomButton, PageHOC } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  const {
    contract,
    gameData,
    setShowAlert,
    setBattleName,
    walletAddress,
    setErrorMessage,
  } = useGlobalContext();
  const navigate = useNavigate();
  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName, {
        gasLimit: 200000,
      });
      setShowAlert({
        status : true,
        type : 'success',
        message : `Joining ${battleName}`
      })
    } catch (error) {
      setErrorMessage(error)
    }
  }
  return (
    <>
      <h2 className={styles.joinHeadText}> Available Battles : </h2>

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles.filter((battle) => !battle.players.includes(walletAddress)).map((battle, index) => (
            <div key={battle.name + 1} className={styles.flexBetween}>
              <p className={styles.joinBattleTitle}> { index + 1} . { battle.name } </p>
              <CustomButton title='join' handleClick={() => handleClick(battle.name)} />
            </div>
          ))
        ) : (
          <p className={styles.joinLoading}>
            {" "}
            Reload the page to see new Battles
          </p>
        )}
      </div>

      <p
        className={`${styles.infoText}`}
        onClick={() => navigate("/create-battle")}
      >
        {" "}
        Or create a new battle{" "}
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join a <br /> Battle
  </>,
  <>Join already existing battles </>
);
