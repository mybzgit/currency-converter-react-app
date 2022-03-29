import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    TextField,
} from '@mui/material';
import supportedCodesJson from './supported-codes.json';
import { useDispatch, useSelector } from 'react-redux';
import { State, Action, ActionTypes, CodeType } from './store';

type CurrencySelectorProps = {
    directionType: 'from' | 'to';
};

interface SupportedCodesResponse {
    result: string;
    supported_codes: [string, string][];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    directionType,
}) => {

    const dispatch = useDispatch();
    const selectedCurrency = useSelector((state: State) => {
        return directionType === 'from' ? state.fromCode : state.toCode;
    });
    const [supportedCodes, setSupportedCodes] = useState<CodeType[]>([]);

    const createAction = (payload: CodeType): Action => {
        let action: Action;
        if (directionType === 'from') {
            action = {
                type: ActionTypes.SET_FROM_CODE,
                fromCode: {
                    code: payload.code,
                    description: payload.description,
                },
            };
        } else {
            action = {
                type: ActionTypes.SET_TO_CODE,
                toCode: {
                    code: payload.code,
                    description: payload.description,
                },
            };
        }
        return action;
    };

    useEffect(() => {
        setSupportedCodes(
            supportedCodesJson.supported_codes.map((c) => {
                return { code: c[0], description: c[1] };
            })
        );
    }, []);

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
