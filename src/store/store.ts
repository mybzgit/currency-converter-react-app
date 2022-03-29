import { createStore, Reducer, Store } from 'redux';
import { CodeType, ConversionRate } from './types';

export type State = {
    fromCode: CodeType;
    toCode: CodeType;
    supportedCodes: CodeType[];
    convertionRatesFromCode: ConversionRate;
    convertionRatesToCode: ConversionRate;
};

export enum ActionTypes {
    SET_FROM_CODE,
    SET_TO_CODE,
    SWAP_CODES,
    SET_CONVERSION_RATES_FROM_CODE,
    SET_CONVERSION_RATES_TO_CODE,
    SET_SUPPORTED_CODES,
}

export type Action = {
    type: ActionTypes;
    fromCode?: CodeType;
    toCode?: CodeType;
    supportedCodes?: CodeType[];
    convertionRatesFromCode?: ConversionRate;
    convertionRatesToCode?: ConversionRate;
};

const initialState: State = {
    fromCode: { code: 'USD', description: 'United States Dollar' },
    toCode: { code: 'RUB', description: 'Russian Ruble' },
    supportedCodes: [],
    convertionRatesFromCode: {},
    convertionRatesToCode: {}
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
    if (action.type == ActionTypes.SET_FROM_CODE) {
        return {
            fromCode: { ...action.fromCode! },
            toCode: { ...state.toCode },
            supportedCodes: [...state.supportedCodes],
            convertionRatesFromCode: { ...state.convertionRatesFromCode },
            convertionRatesToCode: { ...state.convertionRatesToCode },
        };
    }
    if (action.type == ActionTypes.SET_TO_CODE) {
        return {
            fromCode: { ...state.fromCode },
            toCode: { ...action.toCode! },
            supportedCodes: [...state.supportedCodes],
            convertionRatesFromCode: { ...state.convertionRatesFromCode },
            convertionRatesToCode: { ...state.convertionRatesToCode },
        };
    }
    if (action.type == ActionTypes.SWAP_CODES) {
        return {
            fromCode: { ...state.toCode },
            toCode: { ...state.fromCode },
            supportedCodes: [...state.supportedCodes],
            convertionRatesFromCode: { ...state.convertionRatesFromCode },
            convertionRatesToCode: { ...state.convertionRatesToCode },
        };
    }
    if (action.type == ActionTypes.SET_SUPPORTED_CODES) {
        return {
            fromCode: { ...state.fromCode },
            toCode: { ...state.toCode },
            supportedCodes: [...action.supportedCodes!],
            convertionRatesFromCode: { ...state.convertionRatesFromCode },
            convertionRatesToCode: { ...state.convertionRatesToCode },
        };
    }
    if (action.type == ActionTypes.SET_CONVERSION_RATES_FROM_CODE) {
        return {
            fromCode: { ...state.fromCode },
            toCode: { ...state.toCode },
            supportedCodes: [...state.supportedCodes],
            convertionRatesFromCode: { ...action.convertionRatesFromCode! },
            convertionRatesToCode: { ...state.convertionRatesToCode },
        };
    }
    if (action.type == ActionTypes.SET_CONVERSION_RATES_TO_CODE) {
        return {
            fromCode: { ...state.fromCode },
            toCode: { ...state.toCode },
            supportedCodes: [...state.supportedCodes],
            convertionRatesFromCode: { ...state.convertionRatesFromCode },
            convertionRatesToCode: { ...action.convertionRatesToCode! },
        };
    }
    return state;
};

const store: Store<State, Action> = createStore(reducer);

export default store;
