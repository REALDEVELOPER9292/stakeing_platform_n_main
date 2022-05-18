import React, {useState, useEffect} from 'react';ta
import {useSelector, useDispatch} from 'react-redux';
import {stakingActions} from '../../reducers/actions';
import * as config from '../../config/constants';

const ProjectDetailContent = () => {

    const curwallet = useSelector(state => state.staking.curwallet);
    const reward = useSelector(state => state.staking.reward);
    const tokenPrice = useSelector(state => state.staking.tokenPrice);
    const balance = useSelector(state => state.staking.balance);
    const isLocked = useSelector(state => state.staking.isLocked);
    const isStaked = useSelector(state => state.staking.isStaked);
    const stakerNum = useSelector(state => state.staking.stakerNum);
    const totalStaked = useSelector(state => state.staking.totalStaked);
    const rewardRate = useSelector(state => state.staking.rewardRate);
    const myStaked = useSelector(state => state.staking.myStaked);
    const minStakingAmount = useSelector(state => state.staking.minStakingAmount);
    const lockPeriod = useSelector(state => state.staking.lockPeriod);
    
    const dispatch = useDispatch();
    
    const [mode, setMode] = useState(config.DAILY_STAKING_MODE);
    const [stakingAmount, setStakingAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [rewardMode, setRewardMode] = useState("Reward Per Day");
    const [rewardRateDisplay, setRewardRateDisplay] = useState(0);

    useEffect(async () => {
        dispatch(stakingActions.modeHandler(mode));
    }, [mode]);

    useEffect(() => {
        switch(mode) {
            case config.DAILY_STAKING_MODE:
                setRewardMode("Reward Per Day");
                setRewardRateDisplay(rewardRate);
                break;
            default:
                setRewardMode("Reward Per Week");
                setRewardRateDisplay(rewardRate * 7);
                break;
        }
        dispatch(stakingActions.fetchData(curwallet, mode));
    });
    
    const withdraw = async (e) => {

        e.preventDefault();
        dispatch(stakingActions.withDraw(curwallet, withdrawAmount, myStaked));
    }

    const roundFloat = (value) => {
        return Math.round(value * 100) / 100;
    }
    
    const stake = async (e) => {
        
        e.preventDefault();
        
        dispatch(stakingActions.stake(curwallet, balance, stakingAmount, minStakingAmount, isStaked, mode, isStaked));
        
    }
    
    const harvest = async (e) => {
        
        e.preventDefault();

        dispatch(stakingActions.harvest(curwallet, reward));
    }
    
    return(
        <div className="participat-information project-details-conent gamfi-about-secion pb-80 md-pb-50">
            <div className="container">
                <div className="row pt-70">
                    <div className="col-lg-6 pr-25 md-pr-15 pb-50">
                        <div className="project-item">
                            <div className="project-info border-bottom-2">
                                <h3 className="mb-15">Staking</h3>
                            </div>
                            <ul className="date-listing mb-35">
                                <li className="StakeTablinks">
                                    <button className='selectStakingMode0' onClick={() => {setMode(config.DAILY_STAKING_MODE)}}>3 MONTH</button>
                                </li>
                                <li className="StakeTablinks">
                                    <button className='selectStakingMode3' onClick={() => {setMode(config.GOLD_STAKING_MODE)}}>GOLDEN</button>
                                </li>
                                <li className="StakeTablinks">
                                    <button className='selectStakingMode2' onClick={() => {setMode(config.SILVER_STAKING_MODE)}}>SILVER</button>
                                </li>
                                <li className="StakeTablinks">
                                    <button className='selectStakingMode1' onClick={() => {setMode(config.COPPER_STAKING_MODE)}}>COPPER</button>
                                </li>
                            </ul>
                            <div className="project-content">
                                <div id="sevenDays" className="StakeTabcontent">
                                    <div className="project-media mb-40">
                                        <ul className="project-listing">
                                            <li>Lock period: <strong>{(mode === 0 ? "first " : "every ") + lockPeriod} days</strong> <span>Reward Rate</span></li>
                                            <li>Early unstake fee: <strong>15%</strong> <a href="#"><span className="big-text">{rewardRateDisplay / 100.0} %</span></a></li>
                                            <li>Status: <strong>{isLocked}</strong><span>{rewardMode}</span></li>
                                            <li>Minimum Staking Amount: <strong>{minStakingAmount}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="project-form-list">
                                <h5 className="mb-18">Balance: {roundFloat(balance)} CRSF</h5>
                                <div className="balance-form-area mb-27">
                                    <input className='txt_stake' type="text" onChange={(e) => {setStakingAmount(e.target.value)}} placeholder="00.00"/>
                                    <span className="max" onClick={() => {document.querySelector(".txt_stake").value = roundFloat(balance); setStakingAmount(roundFloat(balance))}}>MAX</span>
                                    <div className="white-shape-small approve">
                                        <input type="submit" value="Stake" onClick={stake}/>
                                        <span className="hover-shape1"></span>
                                        <span className="hover-shape2"></span>
                                        <span className="hover-shape3"></span>      
                                    </div>

                                </div>
                                <h5 className="mb-18">Staked: {roundFloat(myStaked)} CRSF</h5>
                                <div className="balance-form-area">
                                    <input type="text" className='txt_withdraw' onChange={(e) => {setWithdrawAmount(e.target.value)}} placeholder="0.00"/>
                                    <span className="max" onClick={() => {document.querySelector(".txt_withdraw").value = roundFloat(myStaked); setWithdrawAmount(roundFloat(myStaked))}}>MAX</span>
                                    <div className="white-shape-small">
                                        <input type="submit" value="Withdraw" onClick={withdraw}/>
                                        <span className="hover-shape1"></span>
                                        <span className="hover-shape2"></span>
                                        <span className="hover-shape3"></span>      
                                    </div>
                                </div><br></br>
                                
                                <div className="balance-form-area">
                                <h5 className="mb-18">Reward:</h5><h4>{roundFloat(reward)} CRSF</h4>
                                    <div className="white-shape-small mt-18">
                                        <input type="submit" value="harvest" onClick={harvest}/>
                                        <span className="hover-shape1"></span>
                                        <span className="hover-shape2"></span>
                                        <span className="hover-shape3"></span>      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pl-25 md-pl-15">
                        <div className="project-item project-value-inner d-flex justify-content-between align-items-center mb-30">
                            <div className="project-value">
                                <h3 className="mb-15">{roundFloat(totalStaked * tokenPrice)} <br></br>$</h3>
                                <span>Total Staked</span>
                            </div>
                            <div className="project-value-image">
                                <img className="heading-right-image" src="assets/images/project/rank.png" alt="rank"/>
                            </div>
                        </div>
                        <div className="project-item project-value-inner d-flex justify-content-between align-items-center mb-30">
                            <div className="project-value">
                                <h3 className="mb-15">{roundFloat(totalStaked)} <br></br>CRSF</h3>
                                <span>Total Staked</span>
                            </div>
                            <div className="project-value-image">
                                <img className="heading-right-image" src="assets/images/project/rank2.png" alt="rank"/>
                            </div>
                        </div>
                        <div className="project-item project-value-inner d-flex justify-content-between align-items-center">
                            <div className="project-value">
                                <h3 className="mb-15">{stakerNum}</h3>
                                <span>Number of Stakers</span>
                            </div>
                            <div className="project-value-image">
                                <img className="heading-right-image" src="assets/images/project/rank3.png" alt="rank"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailContent;
