import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import CurrencySelector from './CurrencySelector';
import UserInput from './UserInput';
import classes from './CurrencyCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ActionTypes, State } from '../store/store';
import axios from 'axios';
import {
    CodeType,
    ConversionRate,
    ConversionRatesResponse,
} from '../store/types';

type CurrencyCardProps = {
    directionType: 'from' | 'to';
    supportedCodes: CodeType[];
};

const CurrencyCard: React.FC<CurrencyCardProps> = ({
    directionType,
    supportedCodes,
}) => {
    const [convertedValue, setConvertedValue] = useState(0);

    const selectedCurrency = useSelector((state: State) => {
        return directionType === 'from' ? state.fromCode : state.toCode;
    });
    const currencyToConvert = useSelector((state: State) => {
        return directionType === 'from' ? state.toCode : state.fromCode;
    });

    const conversionRates: ConversionRate = useSelector((state: State) => {
        return directionType === 'from'
            ? state.convertionRatesFromCode
            : state.convertionRatesToCode;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setConvertedValue(conversionRates[currencyToConvert.code]);
    }, [currencyToConvert.code, conversionRates]);

    const exchangeRatesUrl =
        'https://v6.exchangerate-api.com/v6/f85e1ab717a788b92e1bf176/latest/';

    useEffect(() => {
        console.log(selectedCurrency, conversionRates)
        if (Object.keys(conversionRates).length === 0) {
            axios
                .get<ConversionRatesResponse>(
                    exchangeRatesUrl + selectedCurrency.code
                )
                .then((response) => {
                    if (response.data.result === 'success') {
                        const action: Action = {
                            type:
                                directionType === 'from'
                                    ? ActionTypes.SET_CONVERSION_RATES_FROM_CODE
                                    : ActionTypes.SET_CONVERSION_RATES_TO_CODE,
                            convertionRatesFromCode:
                                directionType === 'from'
                                    ? {
                                          ...response.data.conversion_rates,
                                      }
                                    : {},
                            convertionRatesToCode:
                                directionType === 'to'
                                    ? {
                                          ...response.data.conversion_rates,
                                      }
                                    : {},
                        };
                        dispatch(action);
                    }
                })
                .catch((error) => {
                    setConvertedValue(0);
                });
        }
    }, [selectedCurrency.code]);

    const unitInfo = `1 ${selectedCurrency.code} = ${convertedValue} ${currencyToConvert.code}`;

    return (
        <Card sx={{ minWidth: 300, height: 200 }}>
            <CardContent>
                <CurrencySelector
                    supportedCodes={supportedCodes}
                    directionType={directionType}
                    selectedCurrency={selectedCurrency}
                />
                <UserInput directionType={directionType} />
                {!!convertedValue && (
                    <span className={classes.unit_info}>{unitInfo}</span>
                )}
                {!convertedValue && (
                    <span className={classes.unit_info}>
                        Unable to load latest exchange rate for the{' '}
                        {selectedCurrency.code} currency
                    </span>
                )}
            </CardContent>
        </Card>
    );
};

export default React.memo(CurrencyCard);
