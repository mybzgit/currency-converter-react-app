import { createStore, Reducer, Store } from 'redux';

export type State = {
    fromCode: CodeType;
    toCode: CodeType;
};

export enum ActionTypes {
    SET_FROM_CODE,
    SET_TO_CODE,
    SWAP_CODES,
}

export type Action = {
    type: ActionTypes;
    fromCode?: CodeType;
    toCode?: CodeType;
};

export type CodeType = {
    code: string;
    description: string;
};

const initialState: State = {
    fromCode: { code: 'USD', description: 'United States Dollar' },
    toCode: { code: 'RUB', description: 'Russian Ruble' },
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
    if (action.type == ActionTypes.SET_FROM_CODE) {
        return {
            fromCode: { ...action.fromCode! },
            toCode: { ...state.toCode },
        };
    }
    if (action.type == ActionTypes.SET_TO_CODE) {
        return {
            fromCode: { ...state.fromCode },
            toCode: { ...action.toCode! },
        };
    }
    if (action.type == ActionTypes.SWAP_CODES) {
        return {
            fromCode: { ...state.toCode },
            toCode: { ...state.fromCode },
        };
    }
    return state;
};

const store: Store<State, Action> = createStore(reducer);

export default store;
