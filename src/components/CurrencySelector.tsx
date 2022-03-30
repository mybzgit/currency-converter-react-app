import React, { SyntheticEvent } from 'react';
import {
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    TextField,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Action, ActionTypes, State } from '../store/store';
import { CodeType } from '../store/types';

type CurrencySelectorProps = {
    directionType: 'from' | 'to';
    selectedCurrency: CodeType;
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    directionType,
    selectedCurrency,
}) => {
    const dispatch = useDispatch();

    const supportedCodes = useSelector((state: State) => {
        return state.supportedCodes;
    });

    const createAction = (payload: CodeType): Action => {
        let action: Action;
        if (directionType === 'from') {
            action = {
                type: ActionTypes.SET_FROM_CODE,
                fromCode: { ...payload },
            };
        } else {
            action = {
                type: ActionTypes.SET_TO_CODE,
                toCode: { ...payload }
            };
        }
        return action;
    };

    const onChange = (
        event: SyntheticEvent,
        value: CodeType | null,
        reason: AutocompleteChangeReason
    ) => {
        if (reason === 'selectOption') {
            let action = createAction(value!);
            dispatch(action);
        }
    };

    return (
        <Autocomplete
            id="combo-box"
            value={selectedCurrency}
            onChange={onChange}
            getOptionLabel={(option) => option.code}
            isOptionEqualToValue={(option, value) => {
                return (
                    option.code === value.code &&
                    option.description === value.description
                );
            }}
            options={supportedCodes}
            disableClearable={true}
            sx={{ width: '100%', minWidth: 200 }}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ '& > div': { width: 50, fontWeight: 600 } }}
                    {...props}>
                    <div>{option.code}</div> {option.description}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={directionType}
                />
            )}
        />
    );
};

export default CurrencySelector;
