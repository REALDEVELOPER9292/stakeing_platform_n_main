import React, { useState, useEffect } from "react";
import { CDBInput, CDBContainer, CDBBtn } from 'cdbreact';
import {useSelector, useDispatch} from 'react-redux';
import {launchpadActions} from '../../../reducers/actions';

export const VerifyToken = () => {
  
  const dispatch = useDispatch();
  const tokenInfo = useSelector(state => state.launchpad.data);
  const address = useSelector(state => state.launchpad.tokenAddress);
  const [tokenAddress, setTokenAddress] = useState(address);

  useEffect(() => {
    dispatch(launchpadActions.getTokenInfoFromAddress(tokenAddress));
    console.log(tokenInfo)
  }, [tokenAddress])

  const stepForward = () => {
      dispatch(launchpadActions.increaseStep(0));
  }
  
  return (
    <CDBContainer className='mt-40'>
        <h5 className="m1-5 pt-20">Token Address</h5>
        <CDBInput type="text" placeholder="Token Address" color="secondary" value={address} onChange={(e) => {setTokenAddress(e.target.value)}}/>
        {
          tokenInfo == null || tokenAddress.length < 10 ? 
            <div>
              <p className="font-red"> Invalid Token address</p>
              <CDBBtn color="secondary" className="ml-10 mt-40" size="large" disabled>next</CDBBtn>
            </div> : 
            <div className="project-content mt-50">
                <div className="project-media flex justify-center">
                    <ul className="project-listing pl-10">
                      <li>Token Name <span>{tokenInfo.name}</span></li>
                      <li>Token Symbol <span>{tokenInfo.symbol}</span></li>
                      <li>Decimals <span>18</span></li>
                      <li>Token Price <span>1 BNB = {tokenInfo.price}</span></li>
                    </ul>
                    <CDBBtn className="ml-10 mt-40" color="secondary" size="large" onClick={stepForward}>next</CDBBtn>
                </div>
            </div>
        }
    </CDBContainer>
  );
};

export default VerifyToken;