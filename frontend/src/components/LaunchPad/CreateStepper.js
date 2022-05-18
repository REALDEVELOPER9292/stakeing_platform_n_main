import React, { useState, useEffect } from "react";
import Stepper from 'react-stepper-horizontal';
import VerifyToken from "./steps/VerifyToken";
import LaunchpadInfo from "./steps/LaunchpadInfo";
import AdditionalInfo from "./steps/AdditionalInfo";
import FinalReview from "./steps/FinalReview";
import {useSelector, useDispatch} from 'react-redux';
import {launchpadActions} from "../../reducers/actions"

export const CreateStepper = () => {
  const step = useSelector(state => state.launchpad.step);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {dispatch(launchpadActions.setStep(-1));}
  // })

  return (
    <div className="mb-100 font-white mt-10 pt-40">
      <Stepper size={50} completeTitleColor='#ffffff' defaultTitleColor='#ffffff' activeTitleColor='#ffffff' steps={ [{title: 'Verify token'}, {title: 'DeFi launchpad info'}, {title: 'Add additional info'}, {title: 'Finish'}] } activeStep={ step } />
      {
        step == 0 ? <VerifyToken/> : ( step == 1 ? <LaunchpadInfo/> : (step == 2 ? <AdditionalInfo/> : ( step == 3 ? <FinalReview/> : <></> ) ) )
      }
    </div>
  );
};

export default CreateStepper;