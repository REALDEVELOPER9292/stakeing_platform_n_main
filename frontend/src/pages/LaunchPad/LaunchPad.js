import React from 'react';
import UpcomingProjects from '../../components/LaunchPad/UpcomingProjects';
import PreviousProjects from '../../components/LaunchPad/PreviousProjects';
import LiveProjects from '../../components/LaunchPad/LiveProjects';
import ApplyProjects from '../../components/LaunchPad/ApplyProjects';
import { launchpadActions } from '../../reducers/actions';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

const LaunchPad = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(launchpadActions.fetchProjects());
    })
    
    return(
        <>
            <LiveProjects/>
            <UpcomingProjects/>
            <PreviousProjects/>
            <ApplyProjects/>
        </>
    )
}

export default LaunchPad;
