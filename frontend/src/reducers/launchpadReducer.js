const actionType = {
    SET_TOKEN_INFO: "SET_TOKEN_INFO",
    INCREASE_STEP: "INCREASE_STEP",
    SET_LAUNCHPAD_INFO: "SET_LAUNCHPAD_INFO",
    SET_ADITIONAL_INFO: "SET_ADDITIONAL_INFO",
    SET_TOKEN_ADDRESS: "SET_TOKEN_ADDRESS",
    SET_PREV_PROJECTS: "SET_PREV_PROJECTS",
    SET_LIVE_PROJECTS: "SET_LIVE_PROJECTS",
    SET_UPCOMING_PROJECTS: "SET_UPCOMING_PROJECTS"
};

const initState = {
    data: null,
    step: 0,
    tokenAddress: 0,
    launchpadInfo: {
        presaleRate: '',
        softcap: '',
        hardcap: '',
        minBNB: '',
        whitelist: false,
        startTime: '',
        endTime: ''
    },
    additionalInfo: {
        logoURL: '',
        website: '',
        facebook: ''
    },
    upcomingProjects: [],
    prevProjects: [],
    liveProjects: []
};

const launchpadReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_TOKEN_INFO: 
            return {
                ...state, data: action.payload
            }
        case actionType.INCREASE_STEP:
            return {
                ...state, step: action.payload
            }
        case actionType.SET_LAUNCHPAD_INFO:
            return {
                ...state, launchpadInfo: action.payload
            }
        case actionType.SET_TOKEN_ADDRESS:
            return {
                ...state, tokenAddress: action.payload
            }
        case actionType.SET_ADITIONAL_INFO:
            return {
                ...state, additionalInfo: action.payload
            }
        case actionType.SET_PREV_PROJECTS:
            return {
                ...state, prevProjects: action.payload
            }
        case actionType.SET_LIVE_PROJECTS:
            return {
                ...state, liveProjects: action.payload
            }
        case actionType.SET_UPCOMING_PROJECTS:
            return {
                ...state, upcomingProjects: action.payload
            }
        default:
            return state
    }
}

export default launchpadReducer;