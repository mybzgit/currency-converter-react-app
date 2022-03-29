import './App.css';
import CurrencyCard from './components/CurrencyCard';
import { Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useDispatch } from 'react-redux';
import { Action, ActionTypes } from './store/store';
import { useEffect } from 'react';

import supportedCodesJson from './supported-codes.json';

function App() {
    const dispatch = useDispatch();
    const onSwapCurrencies = () => {
        dispatch({ type: ActionTypes.SWAP_CODES });
    };

    useEffect(() => {
        // const supportedCodesUrl =
        //     'https://v6.exchangerate-api.com/v6/f85e1ab717a788b92e1bf176/codes';

        const action: Action = {
            type: ActionTypes.SET_SUPPORTED_CODES,
            supportedCodes: supportedCodesJson.supported_codes.map((c) => {
                return { code: c[0], description: c[1] };
            }),
        };
        dispatch(action);
    }, []);

    return (
        <div className="App">
            <CurrencyCard directionType="from" />
            <Button onClick={onSwapCurrencies}>
                <SwapHorizIcon fontSize="large" />
            </Button>
            <CurrencyCard directionType="to" />
        </div>
    );
}

export default App;
