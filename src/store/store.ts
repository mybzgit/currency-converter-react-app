import { compose, createStore, Reducer, Store } from 'redux';
import { CodeType } from './types';

export type State = {
    fromCode: CodeType;
    toCode: CodeType;
    supportedCodes: CodeType[];
    convertionRatesFromCode: number;
    convertionRatesToCode: number;
    fromInputValue: string;
    toInputValue: string;
};

export enum ActionTypes {
    SET_FROM_CODE,
    SET_TO_CODE,
    SWAP_CODES,
    SET_CONVERSION_RATES_FROM_CODE,
    SET_CONVERSION_RATES_TO_CODE,
    SET_SUPPORTED_CODES,
    SET_INPUT_VALUES,
}

export type Action = {
    type: ActionTypes;
    fromCode?: CodeType;
    toCode?: CodeType;
    supportedCodes?: CodeType[];
    convertionRatesFromCode?: number;
    convertionRatesToCode?: number;
    fromInputValue?: string;
    toInputValue?: string;
};

const initialState: State = {
    fromCode: { code: 'USD', description: 'United States Dollar' },
    toCode: { code: 'RUB', description: 'Russian Ruble' },
    supportedCodes: [],
    convertionRatesFromCode: 0,
    convertionRatesToCode: 0,
    fromInputValue: '0',
    toInputValue: '0',
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
    if (action.type == ActionTypes.SET_FROM_CODE) {
        return {
            ...state,
            fromCode: { ...action.fromCode! },
        };
    }
    if (action.type == ActionTypes.SET_TO_CODE) {
        return {
            ...state,
            toCode: { ...action.toCode! },
        };
    }
    if (action.type == ActionTypes.SWAP_CODES) {
        return {
            ...state,
            fromCode: { ...state.toCode },
            toCode: { ...state.fromCode },
        };
    }
    if (action.type == ActionTypes.SET_SUPPORTED_CODES) {
        return {
            ...state,
            supportedCodes: [...action.supportedCodes!],
        };
    }
    if (action.type == ActionTypes.SET_CONVERSION_RATES_FROM_CODE) {
        return {
            ...state,
            convertionRatesFromCode: action.convertionRatesFromCode!,
        };
    }
    if (action.type == ActionTypes.SET_CONVERSION_RATES_TO_CODE) {
        return {
            ...state,
            convertionRatesToCode: action.convertionRatesToCode!,
        };
    }
    if (action.type == ActionTypes.SET_INPUT_VALUES) {
        return {
            ...state,
            fromInputValue: action.fromInputValue!,
            toInputValue: action.toInputValue!,
        };
    }
    return state;
};

const store: Store<State, Action> = createStore(reducer);

export default store;
