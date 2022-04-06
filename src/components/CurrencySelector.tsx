import React, { SyntheticEvent, useCallback } from 'react';
import {
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    TextField,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { Action, ActionTypes } from '../store/store';
import { CodeType } from '../store/types';

type CurrencySelectorProps = {
    directionType: 'from' | 'to';
    selectedCurrency: CodeType;
    supportedCodes: CodeType[];
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    directionType,
    selectedCurrency,
    supportedCodes,
}) => {
    const dispatch = useDispatch();

    const createAction = useCallback((payload: CodeType): Action => {
        let action: Action;
        action = {
            type:
                directionType === 'from'
                    ? ActionTypes.SET_FROM_CODE
                    : ActionTypes.SET_TO_CODE,
            fromCode: { ...payload },
            toCode: { ...payload },
        };
        return action;
    }, []);

    const onChange = useCallback((
        event: SyntheticEvent,
        value: CodeType | null,
        reason: AutocompleteChangeReason
    ) => {
        if (reason === 'selectOption') {
            let action = createAction(value!);
            dispatch(action);
        }
    }, []);

    return (
        <Autocomplete
            id={'combo-box-' + directionType}
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

export default React.memo(CurrencySelector);
