import TextField from '@mui/material/TextField';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    Fragment,
    useEffect,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ActionTypes, State } from '../store/store';

type UserInputProps = {
    directionType: 'from' | 'to';
};

const UserInput: React.FC<UserInputProps> = ({ directionType }) => {
    const conversionRate = useSelector((state: State) => {
        return directionType === 'from'
            ? state.convertionRatesFromCode
            : state.convertionRatesToCode;
    });

    const currentValue = useSelector((state: State) => {
        return directionType === 'from'
            ? state.fromInputValue
            : state.toInputValue;
    });

    const [inputValue, setInputValue] = useState(currentValue);

    const dispatch = useDispatch();


    const onValueChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setInputValue(event.target.value);
        dispatch({
            type: (directionType === 'from' ? ActionTypes.SET_FROM_VALUE : ActionTypes.SET_TO_VALUE),
            toInputValue: event.target.value,
            fromInputValue: event.target.value
        });
    };

    const createAction = (value: string): Action => {
        let action: Action;
        if (directionType === 'from') {
            action = {
                type: ActionTypes.SET_TO_VALUE,
                toInputValue: value,
            };
        } else {
            action = {
                type: ActionTypes.SET_FROM_VALUE,
                fromInputValue: value,
            };
        }
        return action;
    };

    useEffect(() => {
        console.log(+inputValue * conversionRate);
        dispatch(createAction((+inputValue * conversionRate).toFixed(4).toString()));
    }, [conversionRate, inputValue]);

    return (
        <Fragment>
            <TextField
                sx={{ mt: 2, width: '100%' }}
                id="standard-basic"
                variant="standard"
                type="number"
                onChange={onValueChange}
                value={currentValue}
                inputProps={{ style: { fontSize: 30, fontWeight: 600 } }}
            />
        </Fragment>
    );
};

export default UserInput;
