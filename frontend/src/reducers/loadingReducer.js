const actionType = {
    SET_LOADING: "SET_LOADING"
};

const initState = {
    isLoading: false
};

const loadingReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_LOADING: 
            return {
                ...state, isLoading: action.payload
            }
        default:
            return state
    }
}

export default loadingReducer;