import React, { useState, useEffect } from "react";
import { CDBInput, CDBContainer, CDBBtn } from 'cdbreact';
import {useSelector, useDispatch} from 'react-redux';
import {launchpadActions} from '../../../reducers/actions';
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker';

export const LaunchpadInfo = () => {

  const dispatch = useDispatch();

  const launchpadInfo = useSelector(state => state.launchpad.launchpadInfo);

  const [startTime, setStartTime] = useState(launchpadInfo.startTime);
  const [endTime, setEndTime] = useState(launchpadInfo.endTime);
  const [presaleRate, setPresaleRate] = useState(launchpadInfo.presaleRate);
  const [softcap, setSoftcap] = useState(launchpadInfo.softcap);
  const [hardcap, setHardcap] = useState(launchpadInfo.hardcap);
  const [minBNB, setMinBNB] = useState(launchpadInfo.minBNB);
  const [maxBNB, setMaxBNB] = useState(launchpadInfo.maxBNB);
  const [pancLiqRate, setPancLiqRate] = useState(launchpadInfo.pancLiqRate);
  const [pancRate, setPancRate] = useState(launchpadInfo.pancRate);
  const [liqLockTime, setLiqLockTime] = useState(launchpadInfo.liqLockTime);
  const [refundType, setRefundType] = useState(launchpadInfo.refundType);
  const [whitelist, setWhitelist] = useState(launchpadInfo.whitelist);
  const [tier, setTier] = useState(launchpadInfo.whitelist);

  const options = [
    { value: 'Refund', label: 'Refund' },
    { value: 'Burn', label: 'Burn' },
  ]

  const onStartTimeChange = (e) => {
    setStartTime(e)
  }

  const onEndTimeChange = (e) => {
    setEndTime(e)
  }

  const stepForward = () => {
      if (Number(presaleRate) * Number(softcap) * Number(hardcap) * Number(minBNB) * Number(maxBNB) * Number(pancLiqRate) * Number(pancRate) * Number(liqLockTime) == 0 || (refundType != "Refund" && refundType != "Burn") || startTime == null || endTime == null) {
        launchpadActions.displayAlert("fill correct values in all fields", "danger");  
        return;
      }
      if (Number(minBNB) >= Number(maxBNB)) {
        launchpadActions.displayAlert("minimum buy should be less than maximum buy", "danger");
        return;
      }
      if (Number(softcap) < Number(hardcap) * 0.5 || Number(softcap) >= Number(hardcap)) {
        launchpadActions.displayAlert("Softcap must be >= 50% of Hardcap and less than Hardcap", "danger");
        return;
      }
      
      const timeNow = new Date()
      if (startTime - timeNow <= 0) {
        launchpadActions.displayAlert("Start time should be later than now", "danger");
        return;
      }
      
      if (endTime - startTime <= 0) {
        launchpadActions.displayAlert("End time should be later than start time.", "danger");
        return;
      }
      
      dispatch(launchpadActions.setLaunchpadInfo({presaleRate, softcap, hardcap, minBNB, maxBNB, pancLiqRate, pancRate, liqLockTime, refundType, whitelist, startTime, endTime, tier}))
      dispatch(launchpadActions.increaseStep(1));
  }

  const stepBack = () => {
      dispatch(launchpadActions.setLaunchpadInfo({presaleRate, softcap, hardcap, minBNB, maxBNB, pancLiqRate, pancRate, liqLockTime, refundType, whitelist, startTime, endTime, tier}))
      dispatch(launchpadActions.decreaseStep(1));
  }
  
  return (
    <div className="mt-80">
        <CDBContainer className='row'>
            <h5 className="m1-5">Presale Rate</h5>
            <CDBInput type="number" placeholder="Presale Rate" color="secondary" onChange={(e) => {setPresaleRate(e.target.value)}} value={launchpadInfo.presaleRate}/>
            <span className="ml-10 font-blue">If I spend 1 BNB how many tokens will I receive?</span>
            
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Softcap (BNB)</h5>
                <CDBInput type="number" placeholder="Softcap" color="secondary" onChange={(e) => {setSoftcap(e.target.value)}} value={launchpadInfo.softcap}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Hardcap (BNB)</h5>
                <CDBInput type="number" placeholder="Hardcap" color="secondary" onChange={(e) => {setHardcap(e.target.value)}} value={launchpadInfo.hardcap}/>
            </div>
            <p className="ml-10 font-blue warn">Softcap must be &gt;= 50% of Hardcap</p>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Minimum Buy</h5>
                <CDBInput type="number" placeholder="Minimum buy (BNB)" color="secondary" onChange={(e) => {setMinBNB(e.target.value)}} value={launchpadInfo.minBNB}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Maximum Buy</h5>
                <CDBInput type="number" placeholder="Maximum buy (BNB)" color="secondary" onChange={(e) => {setMaxBNB(e.target.value)}} value={launchpadInfo.maxBNB}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Start Time</h5>
                <DateTimePicker
                    className="font-white"
                    value={startTime}
                    onChange={onStartTimeChange}
                />
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">End Time</h5>
                <DateTimePicker
                    className="font-white"
                    value={endTime}
                    onChange={onEndTimeChange}
                />
            </div>
            <div className="row pl-30 pb-30 pt-30">
                <h5 className="m1-5 mb-20">Whitelist</h5>
                <div className="col-md-1">
                    { launchpadInfo.whitelist ?
                        <input className="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault1" onFocus={() => {setWhitelist(false)}}/>:
                        <input className="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault1" checked onFocus={() => {setWhitelist(false)}}/>
                    }
                    <label className="form-check-label" for="flexRadioDefault1">
                        &nbsp;Disable
                    </label>
                </div>
                <div className="col-md-11">
                    { launchpadInfo.whitelist ? 
                        <input className="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault2" checked onFocus={() => {setWhitelist(true)}}/>:
                        <input className="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault2" onFocus={() => {setWhitelist(true)}}/>
                    } 
                    <label className="form-check-label" for="flexRadioDefault2">
                        &nbsp;Enable
                    </label>
                </div>
            </div>
            <div className="row pl-30 pb-30 pt-30">
                <h5 className="m1-5 mb-20">Minimum Staking Tier</h5>
                <div className="col-md-2">
                    { launchpadInfo.tier == 0 ?
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault3" checked onFocus={() => {setTier(0)}}/>:
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault3" onFocus={() => {setTier(0)}}/>
                    }
                    <label className="form-check-label" for="flexRadioDefault3">
                        &nbsp;COPPER
                    </label>
                </div>
                <div className="col-md-2">
                    { launchpadInfo.tier == 1 ? 
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault4" checked onFocus={() => {setTier(1)}}/>:
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault4" onFocus={() => {setTier(1)}}/>
                    } 
                    <label className="form-check-label" for="flexRadioDefault4">
                        &nbsp;SILVER
                    </label>
                </div>
                <div className="col-md-8">
                    { launchpadInfo.tier == 2 ? 
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault5" checked onFocus={() => {setTier(2)}}/>:
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault5" onFocus={() => {setTier(2)}}/>
                    } 
                    <label className="form-check-label" for="flexRadioDefault5">
                        &nbsp;GOLDEN
                    </label>
                </div>
            </div>
            <div className="mb-10">
                <h5 className="ml-5">Refund Type</h5>
                <Select options={options} className="font-black" onChange={(e) => {setRefundType(e.value)}}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Pancakeswap Liquidity</h5>
                <CDBInput type="number" placeholder="Pancakeswap liquidity (%)" color="secondary" onChange={(e) => {setPancLiqRate(e.target.value)}} value={launchpadInfo.pancLiqRate}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 mt-20">Pancakeswap Listing Rate</h5>
                <CDBInput type="number" placeholder="Pancakeswap listing rate" color="secondary" onChange={(e) => {setPancRate(e.target.value)}} value={launchpadInfo.pancRate}/>
            </div>
            <h5 className="m1-5 pt-20">Liquidity Lockup Time</h5>
            <CDBInput type="number" placeholder="Liquidity lockup time (minutes)" color="secondary" onChange={(e) => {setLiqLockTime(e.target.value)}} value={launchpadInfo.liqLockTime}/>
            <div className="mb-30"></div>
            <CDBBtn color="dark" className="col-md-6" size="large" onClick={stepBack}>back</CDBBtn>
            <CDBBtn className="col-md-6" color="secondary" size="large" onClick={stepForward}>next</CDBBtn>
        </CDBContainer>
    </div>
  );
};

export default LaunchpadInfo;