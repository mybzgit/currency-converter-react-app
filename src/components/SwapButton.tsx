import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../store/store';
import React, { useCallback } from 'react';

const SwapButton: React.FC = () => {
    const dispatch = useDispatch();
    const onSwapCurrencies = useCallback(() => {
        dispatch({ type: ActionTypes.SWAP_CODES });
    }, []);
    return (
        <Button onClick={onSwapCurrencies}>
            <SwapHorizIcon fontSize="large" />
        </Button>
    );
};
export default React.memo(SwapButton);
