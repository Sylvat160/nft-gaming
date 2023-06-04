import { Contract, ethers } from 'ethers'
import { ABI } from '../contract'

const addNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter)

  provider.on(eventFilter, (logs) => {
    const parsedLogs = new ethers.utils.Interface(ABI).parseLog(logs)

    cb(parsedLogs)
  })
}

export const createEventsListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  setUpdateGameData,
}) => {
  const newPlayerEventFilter = contract.filters.NewPlayer()

  addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
    console.log('New Player created!', args)

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: 'success',
        message: 'New Player created!',
      })
    }
  })

  const NewBattleEventFilter = contract.filters.NewBattle()
  addNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log('New battle started !!', args, walletAddress)

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`)
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1)
  })
}
