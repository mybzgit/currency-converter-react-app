import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import CurrencySelector from './CurrencySelector';
import UserInput from './UserInput';
import classes from './CurrencyCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ActionTypes, State } from '../store/store';
import axios from 'axios';
import { ConversionRate, ConversionRatesResponse } from '../store/types';

type CurrencyCardProps = {
    directionType: 'from' | 'to';
};

const CurrencyCard: React.FC<CurrencyCardProps> = ({ directionType }) => {
    // const conversionRates = useSelector((state: State) => {
    //     if (directionType === 'from') return state.convertionRatesFromCode;
    //     else return state.convertionRatesToCode;
    // });

    const [convertedValue, setConvertedValue] = useState(0);

    const selectedCurrency = useSelector((state: State) => {
        return directionType === 'from' ? state.fromCode : state.toCode;
    });
    const currencyToConvert = useSelector((state: State) => {
        return directionType === 'from' ? state.toCode : state.fromCode;
    });

    const [conversionRates, setConversionRates] = useState<ConversionRate>({});

    useEffect(() => {
        const action: Action = {
            type:
                directionType === 'from'
                    ? ActionTypes.SET_CONVERSION_RATES_FROM_CODE
                    : ActionTypes.SET_CONVERSION_RATES_TO_CODE,
            convertionRatesFromCode:
                directionType === 'from'
                    ? conversionRates[currencyToConvert.code]
                    : 0,
            convertionRatesToCode:
                directionType === 'to'
                    ? conversionRates[currencyToConvert.code]
                    : 0,
        };
        dispatch(action);
        setConvertedValue(conversionRates[currencyToConvert.code]);
    }, [currencyToConvert.code, conversionRates]);

    const exchangeRatesUrl =
        'https://v6.exchangerate-api.com/v6/f85e1ab717a788b92e1bf176/latest/';

    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get<ConversionRatesResponse>(
                exchangeRatesUrl + selectedCurrency.code
            )
            .then((response) => {
                if (response.data.result === 'success') {
                    setConversionRates({ ...response.data.conversion_rates });
                }
            });
    }, [selectedCurrency.code]);

    const unitInfo = `1 ${selectedCurrency.code} = ${convertedValue} ${currencyToConvert.code}`;

    return (
        <Card sx={{ minWidth: 300, height: 200 }}>
            <CardContent>
                <CurrencySelector
                    directionType={directionType}
                    selectedCurrency={selectedCurrency}
                />
                <UserInput directionType={directionType} />
                {convertedValue && (
                    <span className={classes.unit_info}>{unitInfo}</span>
                )}
            </CardContent>
        </Card>
    );
};

export default CurrencyCard;
