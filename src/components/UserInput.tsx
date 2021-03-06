import TextField from '@mui/material/TextField';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    useCallback,
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

    const codeToConvert = useSelector((state: State) => {
        return directionType === 'from'
            ? state.toCode.code
            : state.fromCode.code; 
    })

    const currentValue = useSelector((state: State) => {
        return directionType === 'from'
            ? state.fromInputValue
            : state.toInputValue;
    });

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');

    const onValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            let inputValue = event.target.value;
            const validValue = /^\d+\.?\d{0,4}$/g;
            const invalidValue = /^0\d+/g;
            if (invalidValue.test(inputValue))
                inputValue = inputValue.substring(1, inputValue.length);
            if (!validValue.test(inputValue)) return;
            else {
                setInputValue(inputValue);
            }
        },
        []
    );

    const sendInputValues = (
        currentValue: string,
        convertedValue: string
    ): Action => {
        let action: Action = {
            type: ActionTypes.SET_INPUT_VALUES,
        };
        if (directionType === 'from') {
            action.fromInputValue = currentValue;
            action.toInputValue = convertedValue;
        } else {
            action.fromInputValue = convertedValue;
            action.toInputValue = currentValue;
        }
        return action;
    };

    const calculateConvertedValue = useCallback((value: number): string => {
        let intPart = Math.trunc(value);
        return value - intPart > 0 ? value.toFixed(4) : intPart.toString();
    }, []);

    useEffect(() => {
        if (conversionRate[codeToConvert] > 0 && inputValue !== '') {
            const newConvertedValue = calculateConvertedValue(
                +inputValue * conversionRate[codeToConvert]
            );
            dispatch(sendInputValues(inputValue, newConvertedValue));
        }
    }, [inputValue]);

    useEffect(() => {
        if (conversionRate[codeToConvert] > 0 && directionType === 'from') {
            const newConvertedValue = calculateConvertedValue(
                +currentValue * conversionRate[codeToConvert]
            );
            dispatch(
                sendInputValues(currentValue, newConvertedValue.toString())
            );
        }
    }, [codeToConvert, conversionRate[codeToConvert]]);

    return (
        <TextField
            sx={{ mt: 2, width: '100%' }}
            id="standard-basic"
            variant="standard"
            type="number"
            onChange={onValueChange}
            value={currentValue}
            inputProps={{ min: 0, style: { fontSize: 30, fontWeight: 600 } }}
        />
    );
};

export default UserInput;
