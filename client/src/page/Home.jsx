import React, { useState, useEffect } from 'react';
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { contract, walletAddress, setShowAlert, gameData } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

   useEffect(() => {
     if (gameData.activeBattle) {
       navigate(`/battle/${gameData.activeBattle.name}`);
     }
   }, [gameData]);

  const handleClick = async () => {
    try {
      const playerExists =  await contract.isPlayer(walletAddress);
      
      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 200000,
        });
        setShowAlert({status: true, type : 'info', message : `${playerName} is being summoned`});
        setPlayerName('');
      }
      
    } catch (e) {
      setShowAlert({
        status: true,
        type: "failure",
        message: e.message.slice(0, 25),
      });
      console.log(e.message.slice(0,25));
    }
  }

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExits = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExits) navigate("/create-battle");
    };

    if (contract) checkForPlayerToken();
  }, [contract]);

  return (
    <div className='flex flex-col'>
      <CustomInput 
        label='Name'
        placeholder='Enter your player name'
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton title="register"
        handleClick={handleClick}
        restStyles='mt-6'
      />
    </div> 
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);