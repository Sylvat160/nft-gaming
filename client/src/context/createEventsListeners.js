import { Contract, ethers } from "ethers";
import { ABI } from "../contract";

const addNewEvent = (eventFilter, provider, cb) => {
    provider.removeListener(eventFilter);

    provider.on(eventFilter, (logs) => {
        const parsedLogs = (new ethers.utils.Interface(ABI)).parseLog(logs);

        cb(parsedLogs);
    })
}

export const createEventsListeners = ({
        navigate, contract, provider, walletAddress, setShowAlert
      }) => {
    const newPlayerEventFilter = contract.filters.NewPlayer();

    addNewEvent(newPlayerEventFilter, provider, ({args}) => {
        console.log('New Player created!', args);

        if (walletAddress === args.owner) {
            setShowAlert({
                status: true,
                type: 'success',
                message: 'New Player created!',
            });
        }
    })
}