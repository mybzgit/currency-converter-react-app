import './App.css';
import CurrencySelector from './currency-selector';
import { Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useDispatch } from 'react-redux';
import { ActionTypes } from './store';
import UserInput from './user-input';

function App() {
    const dispatch = useDispatch();
    const onSwapCurrencies = () => {
        dispatch({ type: ActionTypes.SWAP_CODES });
    };

    return (
        <div className="App">
            <CurrencySelector directionType="from" />
            <UserInput directionType="from" />
            <Button onClick={onSwapCurrencies}>
                <SwapHorizIcon fontSize="large" />
            </Button>
            <CurrencySelector directionType="to" />
        </div>
    );
}

export default App;
