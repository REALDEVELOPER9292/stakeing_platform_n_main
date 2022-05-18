import React, {useState} from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import { launchpadActions } from '../../reducers/actions';
import {useSelector, useDispatch} from 'react-redux';

const PreviousProjects = () => {

    const projectDetails = useSelector(state => state.launchpad.prevProjects);

    return(
        <>
            <div className="gamfi-previous-section pb-90 md-pb-50">
                <div className="container">
                    <div className="sec-inner align-items-center d-flex justify-content-between  mb-50">
                        <div className="sec-heading">
                            <div className="sub-inner mb-15">
                                <span className="sub-title">Complete Projects</span>
                                <img className="heading-left-image" src="assets/images/icons/steps.png" alt="Steps-Image" />
                            </div>
                            <h2 className="title mb-0 xs-pb-20">Previous Projects</h2>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="previous-mainmenu mb-15">
                                <ul className="menu-list">
                                    <li className="list3 mr-60">Token name</li>
                                    <li className="list2">Symbol</li>
                                    <li className="list3">Liquidity %</li>
                                    <li className="list4">Lockup Time</li>
                                    <li className="list5 pl-50">Progress</li>
                                </ul>
                            </div>
                        </div>
                        { projectDetails &&
                        projectDetails.map((projectDetail) => (
                            <div className="col-md-12 row"> 
                                <Link to={projectDetail._id}>
                                    <div className="previous-item hover-shape-border hover-shape-inner">
                                        <div className="col-md-3 row">
                                            <div className='col-md-4'><img src={projectDetail.logo} alt="Previous-Image" />
                                            </div>
                                            <div className="col-md-8">
                                                <h4 className="mb-10">{projectDetail.name}</h4>
                                                <div className="dsc">{"1 BNB = " + Math.round(projectDetail.price * 1e5) / 1e5 + projectDetail.symbol}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <span>{projectDetail.symbol}</span>
                                        </div>
                                        <div className='col-md-1'>
                                        <span>{projectDetail.liqPercent + "%"}</span>
                                        </div>
                                        <div className="col-md-3 pl-70">
                                            <span>{projectDetail.liqLockTime + " minutes"}</span>
                                        </div>
                                        <div className="progress-inner col-md-3">
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{"width" : projectDetail.progress + "%"}}></div>
                                            </div>
                                        </div>
                                        <span className="border-shadow shadow-1"></span>
                                        <span className="border-shadow shadow-2"></span>
                                        <span className="border-shadow shadow-3"></span>
                                        <span className="border-shadow shadow-4"></span>
                                        <span className="hover-shape-bg hover_shape1"></span>
                                        <span className="hover-shape-bg hover_shape2"></span>
                                        <span className="hover-shape-bg hover_shape3"></span>
                                    </div>
                                </Link>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreviousProjects;
