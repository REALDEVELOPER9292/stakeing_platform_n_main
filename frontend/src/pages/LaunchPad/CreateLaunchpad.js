import React, {useState} from 'react';
import { useEffect } from 'react';
import CreateStepper from '../../components/LaunchPad/CreateStepper';
import {launchpadActions} from '../../reducers/actions'
import {useDispatch} from 'react-redux'

const CreateLaunchPad = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(launchpadActions.setLaunchpadInfo({
                presaleRate: '',
                softcap: '',
                hardcap: '',
                minBNB: '',
                startTime: '',
                endTime: ''
            }))
            dispatch(launchpadActions.setAdditionalInfo({
                logoURL: '',
                website: '',
                facebook: ''
            }))
            dispatch(launchpadActions.increaseStep(-1))
            dispatch(launchpadActions.setInitialAddress(''))
        }
    })
    return(
        <>
        <div class="project-details-conent gamfi-about-secion pb-80 md-pb-20">
            <div class="container">
                <CreateStepper />
            </div>
        </div>
        </>
    )
}

export default CreateLaunchPad;
