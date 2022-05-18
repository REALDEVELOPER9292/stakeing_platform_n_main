import Web3 from 'web3';
import STAKING_ABI from '../config/ABI/stakingPlatformABI';
import TOKEN_ABI from '../config/ABI/CRSF_tokenABI';
import axios from 'axios';
import * as config from "../config/constants";
import { Store } from 'react-notifications-component';
import {ROOT_URL} from '../.env';

export const stakingActions = {
    fetchData,
    modeHandler,
    withDraw,
    stake,
    harvest
};

export const launchpadActions = {
    getTokenInfoFromAddress,
    increaseStep,
    decreaseStep,
    setLaunchpadInfo,
    setAdditionalInfo,
    displayAlert,
    setInitialAddress,
    sendProjectData,
    fetchProjects
}

const web3 = new Web3(window.ethereum);
const stakingContract = new web3.eth.Contract(STAKING_ABI, config.STAKING_CONTRACT_ADDR);
const tokenContract = new web3.eth.Contract(TOKEN_ABI, config.CRSF_TOKEN_ADDR);

function sendProjectData(tokenInfo, launchpadInfo, additionalInfo, tokenAddress) {
    return async (_dispatch) => { 
        try{
            const res = await axios.post(ROOT_URL + 'saveproject', {
                name: tokenInfo.name,
                symbol: tokenInfo.symbol,
                price: tokenInfo.price,
                logo: additionalInfo.logo,
                presaleRate: launchpadInfo.presaleRate,
                listingRate: launchpadInfo.pancRate,
                whitelist: launchpadInfo.whitelist,
                softcap: launchpadInfo.softcap,
                hardcap: launchpadInfo.hardcap,
                refundType: launchpadInfo.refundType,
                minBNB: launchpadInfo.minBNB,
                maxBNB: launchpadInfo.maxBNB,
                liqPercent: launchpadInfo.pancLiqRate,
                liqLockTime: launchpadInfo.liqLockTime,
                website: additionalInfo.website,
                description: additionalInfo.description,
                facebook: additionalInfo.facebook,
                twitter: additionalInfo.twitter,
                github: additionalInfo.github,
                telegram: additionalInfo.github,
                telegram: additionalInfo.telegram,
                instagram: additionalInfo.instagram,
                discord: additionalInfo.discord,
                reddit: additionalInfo.reddit,
                startTime: launchpadInfo.startTime.toUTCString(),
                endTime: launchpadInfo.endTime.toUTCString(),
                address: tokenAddress,
                tier: launchpadInfo.tier
            })
            displayAlert(res.data, "success");
        } catch (err) {
            console.log(err)
        }
    }
}

function fetchProjects() {
    return async (dispatch) => {
        try{
            const timeNow = new Date();
            const res = await axios.get(ROOT_URL + 'fetchprojects');
            const projects = res.data;
            
            const prevProjects = projects ? projects.filter(project => {return new Date(project.endTime) < new Date(timeNow.toUTCString())}) : [];
            const liveProjects = projects ? projects.filter(project => {return new Date(project.endTime) > new Date(timeNow.toUTCString()) && new Date(project.startTime) < new Date(timeNow.toUTCString())}) : [];
            const upcomingProjects = projects ? projects.filter(project => {return new Date(project.startTime) > new Date(timeNow.toUTCString())}) : []
            
            if (!prevProjects) prevProjects = [];
            if (!liveProjects) liveProjects = [];
            
            dispatch({type: "SET_PREV_PROJECTS", payload: prevProjects});
            dispatch({type: "SET_LIVE_PROJECTS", payload: liveProjects});
            dispatch({type: "SET_UPCOMING_PROJECTS", payload: upcomingProjects});
            
        } catch (err) {
            console.log(err)
        }
    }
}

function setLaunchpadInfo(data) {
    return async (dispatch) => {
        dispatch({type: "SET_LAUNCHPAD_INFO", payload: data})
    }
}

function setInitialAddress(address) {
    return async (dispatch) => {
        dispatch({type: "SET_TOKEN_ADDRESS", payload: address})
    }
}

function setAdditionalInfo(data) {
    return async (dispatch) => {
        dispatch({type: "SET_ADDITIONAL_INFO", payload: data})
    }
}

function increaseStep(step) {
    return async (dispatch) => {
        dispatch(increateStep(step));
    }
    function increateStep(step) {return { type: 'INCREASE_STEP', payload: step + 1 } };
}

function decreaseStep(step) {
    return async (dispatch) => {
        dispatch(decreaseStep(step));
    }
    function decreaseStep(step) {return { type: 'INCREASE_STEP', payload: step - 1 } };
}

function getTokenInfoFromAddress(address) {
    return async (dispatch) => {
        axios.get(`https://api.pancakeswap.info/api/v2/tokens/${address}`).then((response) => {
            dispatch(setTokenInfo(response.data.data));
            dispatch({type: "SET_TOKEN_ADDRESS", payload: address})
        }).catch((error) => {
            dispatch(setTokenInfo(null));
        })
    }
    function setTokenInfo(data) {return { type: 'SET_TOKEN_INFO', payload: data } };
}

function fetchData(curwallet, mode) {

    return async (dispatch) => {
        
        axios.get(config.TOKEN_PRICE_API_URL).then((response) => {
            dispatch(setTokenPrice(response.data.data.price));
        }).catch((error) => {
            console.log(error)
        })
        
        let rewardRate = await stakingContract.methods.getRewardRate().call(function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            return res;
        });
        dispatch(setRewardRate(rewardRate));

        let totalStaked = await stakingContract.methods.getTotalStaked().call(function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            return res;
        });
        dispatch(setTotalStaked(web3.utils.fromWei(totalStaked, 'ether')));
        
        let stakerNum = await stakingContract.methods.getNumberofStakers().call(function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            return res;
        });
        dispatch(setStakerNum(stakerNum));
        
        let lockPeriod = await stakingContract.methods.lockupPeriod(mode).call(function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            return res;
        })
        dispatch(setLockPeriod(lockPeriod));

        if (curwallet != 0) {
            let balance = await tokenContract.methods.balanceOf(curwallet).call(function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res;
            });
            dispatch(setBalance(web3.utils.fromWei(balance, 'ether')));
            
            let myStaked = await stakingContract.methods.stakedAmount(curwallet).call(function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res;
            });
            dispatch(setMyStaked(web3.utils.fromWei(myStaked, 'ether')));
            
            let isLocked = await stakingContract.methods.isLocked(curwallet).call(function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res;
            });
            if (isLocked == 0) {
                
                dispatch(setLocked("unLocked"));
            }
            else {
                dispatch(setLocked("Locked"));
            }
            
            let isStaked = await stakingContract.methods.isStartStaking(curwallet).call(function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res;
            });
            dispatch(setStaked(isStaked));
            let rewardToHarvest = await stakingContract.methods.rewardToHarvest(curwallet).call(function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res;
            });
            dispatch(setReward(web3.utils.fromWei(rewardToHarvest, 'ether')));
        }
    }
    
    function setTokenPrice(price) { return { type: "SET_TOKEN_PRICE", payload: Number(price) } }
    function setRewardRate(rewardRate) { return { type: "SET_REWARD_RATE", payload: rewardRate } }
    function setStaked(isStaked) { return { type: "SET_STAKED", payload: isStaked } }
    function setReward(reward) { return { type: "SET_REWARD", payload: reward } }
    function setLocked(isLocked) { return { type: "SET_LOCKED", payload: isLocked } }
    function setMyStaked(myStaked) { return { type: "SET_MY_STAKED", payload: myStaked } }
    function setTotalStaked(totalStaked) { return { type: "SET_TOTAL_STAKED", payload: totalStaked } }
    function setStakerNum(stakerNum) { return { type: "SET_STAKER_NUM", payload: stakerNum } }
    function setBalance(balance) { return { type: "SET_BALANCE", payload: balance } }
    function setLockPeriod(lockPeriod) { return { type: "SET_LOCK_PERIOD", payload: lockPeriod } }
}

function displayAlert(message, type) {
    Store.addNotification({
      title: "Notification",
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    })
}

function modeHandler(mode) {
    return async (dispatch) => {
        let minStakingAmount = await stakingContract.methods.getMinimumStakingAmount(mode).call(function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            return res;
        });
        let i;
        for await (i of [config.DAILY_STAKING_MODE, config.COPPER_STAKING_MODE, config.SILVER_STAKING_MODE, config.GOLD_STAKING_MODE]) {
            document.querySelector(".selectStakingMode" + i).style.color = "#ffffff";
        }
        document.querySelector(".selectStakingMode" + mode).style.color = "#a3ff12";
        await dispatch(setMinStakingAmount(web3.utils.fromWei(minStakingAmount, 'ether')));
    }
    function setMinStakingAmount(minStakingAmount) { return { type: "SET_MIN_STAKING_AMOUNT", payload: minStakingAmount } }
}

const roundFloat = (value) => {
    return Math.round(value * 100) / 100;
}

function withDraw(curwallet, withdrawAmount, myStaked) {
    return async (dispatch) => {
        fetchData(curwallet);
        if (curwallet == 0) {
            displayAlert("connect the wallet", "danger");
            return;
        }
        if (Number(withdrawAmount) == 0) {
            displayAlert("Can't be zero", "danger");
            return;
        }
        if (roundFloat(Number(myStaked) === 0)) {
            displayAlert("No token to withdraw", "danger")
            return;
        }
        if (Number(withdrawAmount) > Number(myStaked)){
            displayAlert("Invalid amount", "danger");
            return;
        }
        
        await dispatch(setLoading(true));

        try{
            await stakingContract.methods.withdraw(web3.utils.toWei(withdrawAmount.toString(), 'ether')).send({from:curwallet}).then(() => {
                fetchData(curwallet);
                dispatch(setLoading(false));
                displayAlert("unstake succeeded", "success");
            });
        } catch (error) {
            await dispatch(setLoading(false));
            displayAlert("unstake canceled", "warning");
        }
        
    }
}

function stake(curwallet, balance, stakingAmount, minStakingAmount, isStaked, mode, isLocked) {
    return async (dispatch) => {
        fetchData(curwallet);
        if (curwallet == 0) {
            displayAlert("connect the wallet", "danger");
            return;
        }
        if (stakingAmount == 0) {
            displayAlert("Can't be zero", "danger");
            return;
        }
        if (Number(stakingAmount) < Number(minStakingAmount)) {
            displayAlert("Insufficient Token. More than " + minStakingAmount + " CRSF needed", "danger");
            return;
        }
        if (Number(stakingAmount) > roundFloat(Number(balance))) {
            displayAlert("Insufficient token in your wallet", "danger");
            return;
        }
        
        await dispatch(setLoading(true));
        try {
            if (Number(isStaked) !== 0) {
                const stakerMode = await stakingContract.methods.getStakerMode(curwallet).call(function (err, res) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res;
                })
                if (stakerMode != mode && isLocked != 0) {
                    displayAlert("Can't change staking mode during lockup period", "danger");
                    await dispatch(setLoading(false));
                    return;
                }
                await tokenContract.methods.approve(config.STAKING_CONTRACT_ADDR, web3.utils.toWei(stakingAmount.toString(), 'ether')).send({from:curwallet});
                await stakingContract.methods.stake(web3.utils.toWei(stakingAmount.toString(), 'ether')).send({from:curwallet}).then(() => {
                    fetchData(curwallet);
                    dispatch(setLoading(false));
                });
            }
            else {
                await tokenContract.methods.approve(config.STAKING_CONTRACT_ADDR, web3.utils.toWei(stakingAmount.toString(), 'ether')).send({from:curwallet});
                await stakingContract.methods.startStaking(web3.utils.toWei(stakingAmount.toString(), 'ether'), mode).send({from:curwallet}).then(() => {
                    fetchData(curwallet);
                    dispatch(setLoading(false));
                });
            }
        } catch (error) { 
            console.log(error)
            await dispatch(setLoading(false));
            displayAlert("staking canceled", "warning");
        }
        
        
    }
}

function harvest(curwallet, reward) {
    return async (dispatch) => {
        fetchData(curwallet);
        if (curwallet == 0) {
            displayAlert("connect the wallet", "danger");
            return;
        }
        
        if (roundFloat(Number(reward)) == 0) {
            displayAlert("no token to harvest", "danger");
            return;
        }
        await dispatch(setLoading(true));
        try {
            await stakingContract.methods.harvest().send({from:curwallet}).then(() => {
                fetchData(curwallet);
        
                dispatch(setLoading(false));
                displayAlert("harvest succeeded", "success");
            });
        } catch (error) { 
            console.log(error)
            await dispatch(setLoading(false));
            displayAlert("harvest canceled", "warning");
        }
    }
}

function setLoading(isLoading) { return { type: "SET_LOADING", payload: isLoading } }