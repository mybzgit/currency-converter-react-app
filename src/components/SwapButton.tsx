import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../store/store';

const SwapButton: React.FC = () => {
    const dispatch = useDispatch();
    const onSwapCurrencies = () => {
        dispatch({ type: ActionTypes.SWAP_CODES });
    };
    return (
        <Button onClick={onSwapCurrencies}>
            <SwapHorizIcon fontSize="large" />
        </Button>
    );
};
export default SwapButton;
