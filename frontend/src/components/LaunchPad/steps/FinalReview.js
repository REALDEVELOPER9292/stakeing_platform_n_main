import React, { useState, useEffect } from "react";
import { CDBInput, CDBContainer, CDBBtn } from 'cdbreact';
import {useSelector, useDispatch} from 'react-redux';
import {launchpadActions} from '../../../reducers/actions';
import { useHistory } from "react-router-dom";

export const FinalReview = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const tokenInfo = useSelector(state => state.launchpad.data);
    const launchpadInfo = useSelector(state => state.launchpad.launchpadInfo);
    const additionalInfo = useSelector(state => state.launchpad.additionalInfo);
    const tokenAddress = useSelector(state => state.launchpad.tokenAddress);
    
    const complete = async () => {
        dispatch(launchpadActions.sendProjectData(tokenInfo, launchpadInfo, additionalInfo, tokenAddress))
        history.push('/');
        dispatch(launchpadActions.fetchProjects());
    }
    
    const stepBack = () => {
        dispatch(launchpadActions.decreaseStep(3));
    }
    
    return (
        <div className="mt-80">
        <CDBContainer className='row'>
            <div className="project-content mt-50">
                <div className="project-media flex justify-center">
                    <ul className="project-listing pl-10">
                        <li>Token Name <span>{tokenInfo.name}</span></li>
                        <li>Token Symbol <span>{tokenInfo.symbol}</span></li>
                        <li>Token Address <span>{tokenInfo.address}</span></li>
                        <li>Token Decimals <span>18</span></li>
                        <li>Presale rate <span>{launchpadInfo.presaleRate + tokenInfo.symbol}</span></li>
                        <li>Listing rate <span>{launchpadInfo.pancRate + tokenInfo.symbol}</span></li>
                        <li>Whitelist <span>{launchpadInfo.whitelist ? "Enable" : "Disable"}</span></li>
                        <li>Start time <span>{launchpadInfo.startTime.toUTCString()}</span></li>
                        <li>End time <span>{launchpadInfo.endTime.toUTCString()}</span></li>
                        <li>Softcap <span>{launchpadInfo.softcap + " BNB"}</span></li>
                        <li>Hardcap <span>{launchpadInfo.hardcap + " BNB"}</span></li>
                        <li>Unsold token <span>{launchpadInfo.refundType}</span></li>
                        <li>Minimum buy <span>{launchpadInfo.minBNB + " BNB"}</span></li>
                        <li>Maximum buy <span>{launchpadInfo.maxBNB + " BNB"}</span></li>
                        <li>Liquidity <span>{launchpadInfo.pancLiqRate + " %"}</span></li>
                        <li>Liquidity lockup time <span>{launchpadInfo.liqLockTime + " minutes"}</span></li>
                        <li>Website <span>{additionalInfo.website}</span></li>
                        <li>Description <span>{additionalInfo.description}</span></li>
                    </ul>
                </div>
            </div>
            <CDBBtn color="dark" className="col-md-6" size="large" onClick={stepBack}>back</CDBBtn>
            <CDBBtn className="col-md-6" color="secondary" size="large" onClick={complete}>complete</CDBBtn>
        </CDBContainer>
        
        </div>
    );
};

export default FinalReview;