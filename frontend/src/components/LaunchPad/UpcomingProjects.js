import React, {useState} from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import { launchpadActions } from '../../reducers/actions';
import {useSelector, useDispatch} from 'react-redux';

const LiveProjects = () => {

    const projects = useSelector(state => state.launchpad.upcomingProjects);
    return(
        <div className="gamfi-project-section main-project-area">
            <div className="container">
                <div className="sec-inner align-items-center d-flex justify-content-between mb-30">
                    <div className="sec-heading">
                        <div className="sub-inner mb-15">
                            <span className="sub-title">Next Projects</span>
                            <img className="heading-left-image" src="assets/images/icons/steps.png" alt="Steps-Image" />
                        </div>
                        <h2 className="title">Upcoming Projects</h2>
                    </div>
                </div>
                <div className="row align-items-center">
                    {   projects &&
                        projects.map((projectDetail) => (
                        <div className="col-lg-4 col-md-6">
                            <div className="project-item hover-shape-border">
                                <div className="project-info d-flex">
                                    <Link to="/launchpaddetail">
                                        <img src={projectDetail.logo} alt="Project-Image"/>
                                    </Link>
                                    <div className="project-auother">
                                        <h4 className="mb-10">
                                            <Link to="/launchpaddetail">
                                                {projectDetail.name}
                                            </Link>
                                        </h4>
                                        <div className="dsc">1 BNB = {Math.round(projectDetail.price * 1e5) / 1e5 + projectDetail.symbol} </div>
                                    </div>
                                </div>
                                <div className="project-content">
                                    
                                    <div className="project-media">
                                        <ul className="project-listing">
                                            <div className="progress-inner">
                                                <div className="progress">
                                                    <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow={projectDetail.progress} aria-valuemin="0" aria-valuemax="100" style={{ "width": projectDetail.progress + "%" }}></div>
                                                </div>
                                            </div><br></br>
                                            <li>Liquidity % <span>{ projectDetail.liqPercent }</span></li>
                                            <li>Lockup Time <span> {projectDetail.liqLockTime + ' minutes'}  </span></li>
                                            <li>Lockup Time <span> {projectDetail.liqLockTime + ' minutes'}  </span></li>
                                            
                                            <li className="social-share">
                                                Social
                                                <ul className="social-icon-list">
                                                    <li><a href={projectDetail.telegram}><i className="icon-telegram"></i></a></li>
                                                    <li><a href={projectDetail.twitter}><i className="icon-twitter"></i></a></li>
                                                    <li><a href={projectDetail.discord}><i className="icon-discord"></i></a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                    ))  
                }
                </div>
            </div>
        </div>
    )
}

export default LiveProjects;
