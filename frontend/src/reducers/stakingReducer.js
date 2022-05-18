const actionType = {
    SET_CURWALLET: "SET_CURWALLET",
    SET_TOKEN_PRICE: "SET_TOKEN_PRICE",
    SET_REWARD_RATE: "SET_REWARD_RATE",
    SET_STAKED: "SET_STAKED",
    SET_REWARD: "SET_REWARD",
    SET_LOCKED: "SET_LOCKED",
    SET_MY_STAKED: "SET_MY_STAKED",
    SET_TOTAL_STAKED: "SET_TOTAL_STAKED",
    SET_STAKER_NUM: "SET_STAKER_NUM",
    SET_BALANCE: "SET_BALANCE",
    SET_MIN_STAKING_AMOUNT: "SET_MIN_STAKING_AMOUNT",
    SET_LOCK_PERIOD: "SET_LOCK_PERIOD"
};

const initState = {
    curwallet: '0',
    tokenPrice: 0,
    isLocked: "unLocked",
    balance: 0,
    reward: 0,
    isStated: 0,
    stakerNum: 0,
    totalStaked: 0,
    rewardRate: 0,
    myStaked: 0,
    minStakingAmount: 0
};

const stakingReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_CURWALLET: 
            return {
                ...state, curwallet: action.payload
            }
        case actionType.SET_TOKEN_PRICE:
            return {
                ...state, tokenPrice: action.payload
            }
        case actionType.SET_BALANCE: 
            return {
                ...state, balance: action.payload
            }
        case actionType.SET_LOCKED:
            return {
                ...state, isLocked: action.payload
            }
        case actionType.SET_REWARD:
            return {
                ...state, reward: action.payload
            }
        case actionType.SET_STAKED:
            return {
                ...state, isStaked: action.payload
            }
        case actionType.SET_STAKER_NUM:
            return {
                ...state, stakerNum: action.payload
            }
        case actionType.SET_TOTAL_STAKED:
            return {
                ...state, totalStaked: action.payload
            }
        case actionType.SET_REWARD_RATE:
            return {
                ...state, rewardRate: action.payload
            }
        case actionType.SET_MY_STAKED:
            return {
                ...state, myStaked: action.payload
            }
        case actionType.SET_MIN_STAKING_AMOUNT:
            return {
                ...state, minStakingAmount: action.payload
            }
        case actionType.SET_LOCK_PERIOD:
            return {
                ...state, lockPeriod: action.payload
            }
        default:
            return state
    }
}

export default stakingReducer;