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
    //     return state.convertionRatesToBaseCode;
    // });

    const [convertedValue, setConvertedValue] = useState(0);

    const selectedCurrency = useSelector((state: State) => {
        return directionType === 'from' ? state.fromCode : state.toCode;
    });
    const currencyToConvert = useSelector((state: State) => {
        return directionType === 'to' ? state.fromCode : state.toCode;
    });

    useEffect(() => {
        setConvertedValue(conversionRates[currencyToConvert.code]);
    }, [selectedCurrency.code, currencyToConvert.code]);

    const exchangeRatesUrl =
        'https://v6.exchangerate-api.com/v6/f85e1ab717a788b92e1bf176/latest/';

    const dispatch = useDispatch();

    useEffect(() => {
        // axios
        //     .get<ConversionRatesResponse>(
        //         exchangeRatesUrl + selectedCurrency.code
        //     )
        //     .then((response) => {
        //         if (response.data.result === 'success') {
        //             const action: Action = {
        //                 type: ActionTypes.SET_CONVERSION_RATES,
        //                 convertionRates: response.data
        //                     .conversion_rates as ConversionRate,
        //             };
        //             dispatch(action);
        //         }
        //     });
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
                <span className={classes.unit_info}>{unitInfo}</span>
            </CardContent>
        </Card>
    );
};

export default CurrencyCard;
