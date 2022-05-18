import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { CDBInput, CDBContainer, CDBBtn } from 'cdbreact';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { launchpadActions } from '../../reducers/actions';

const ProjectDetail = (props) => {
    
    const projects = useSelector(state => state.launchpad.projects);
    const projDetail = projects ? projects.find(project=>{return project._id == props.match.params.id}) : null;
    const [buyAmount, setBuyAmount] = useState(0)

    useEffect(() => {
        console.log(projects)
    }, [])

    const onBuyBtnClick = () => {
        if (buyAmount == 0) {
            launchpadActions.displayAlert("Amount cannot be zero", "danger");
            return;
        }
    }
    return(
        <>
        <div class="gamfi-breadcrumbs-section breadcrumbs-style2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="breadcrumbs-area sec-heading">
                            <div class="sub-inner">
                                <Link class="breadcrumbs-link" to="/">Home</Link>
                                <span class="sub-title">Project Details</span>
                                <img class="heading-left-image" src="assets/images/icons/steps.png" alt="Steps-Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="project-details-conent gamfi-about-secion pb-80 md-pb-20">
            { projDetail &&
            <div class="container">
                <div class="game-price-item hover-shape-inner wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1200ms">
                    <div class="game-price-inner">
                        <div class="total-price">
                            <div class="price-inner d-flex mb-45">
                                <div class="image-icon">
                                    <img src="assets/images/project/ninga-image.png" alt="icon-image" />
                                </div>
                                <div class="price-details">
                                    <h3 class="mb-15">{projDetail.name}</h3>
                                    <div class="dsc">1 BNB = {projDetail.price + projDetail.symbol}</div>
                                </div>
                            </div>
                        </div>
                        <div class="targeted-raise">
                            <div class="all-raise mb-10">Sale End In</div>
                            <div class="price-counter mb-48">
                                <div class="timer">
                                    <ul>
                                        <li class="days"></li>
                                        <li class="hours"></li>
                                        <li class="minutes"></li>
                                        <li class="seconds"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="targeted-raise text-end">
                                {"Liquidity percent: " + projDetail.liqPercent + " %"}
                            </div>
                        </div>
                    </div>
                    <div class="progress-inner">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" style={{ "width": projDetail.progress + "%" }}>
                            </div>
                        </div>
                    </div>
                    <div class="banner-bottom-content mt-40">
                        <div class="btn-area">
                            <CDBInput type="number" placeholder="" color="secondary" onChange={(e) => {setBuyAmount(e.target.value)}}/>
                            <a class="readon white-shape-small" onClick={onBuyBtnClick} href="#">
                                <span class="btn-text">BUY WITH BNB </span>
                                <span class="hover-shape1"></span>
                                <span class="hover-shape2"></span>
                                <span class="hover-shape3"></span>
                            </a>
                        </div>
                        <div class="text-content">
                            {"Lockup Time: " + projDetail.liqLockTime + " minutes"}
                        </div>
                        <div class="social-area">
                            <ul class="social-icon-list">
                                <li><a href={projDetail.telegram}><i class="icon-telegram"></i></a></li>
                                <li><a href={projDetail.twitter}><i class="icon-twitter"></i></a></li>
                                <li><a href={projDetail.discord}><i class="icon-discord"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <span class="border-shadow shadow-1"></span>
                    <span class="border-shadow shadow-2"></span>
                    <span class="border-shadow shadow-3"></span>
                    <span class="border-shadow shadow-4"></span>
                    <span class="hover-shape-bg hover_shape1"></span>
                    <span class="hover-shape-bg hover_shape2"></span>
                    <span class="hover-shape-bg hover_shape3"></span>
                </div>
                <div class="pb-50">
                    <div class="project-item">
                        <div class="project-info d-flex">
                            <h4 class="mb-20">Token Info <img src="assets/images/project/project-heading-image.png" alt="project"/></h4>
                        </div>
                        <div class="project-content">
                            <div class="project-media">
                                <ul class="project-listing">
                                    <li>Token Name <span>{projDetail.name}</span></li>
                                    <li>Token Symbol <span>{projDetail.symbol}</span></li>
                                    <li>Decimals <span>18</span></li>
                                    <li>Address <span>{projDetail.address}</span></li>
                                    <li>Token Price <span>1 BNB = {projDetail.price + projDetail.symbol}</span></li>
                                    <li>Lockup Time <span>{projDetail.liqLockTime + " minutes after pool ends"}</span></li>
                                    <li>Listing rate <span>{projDetail.pancRate + projDetail.symbol}</span></li>
                                    <li>Whitelist <span>{projDetail.whitelist ? "Enable" : "Disable"}</span></li>
                                    <li>Start time <span>{projDetail.startTime}</span></li>
                                    <li>End time <span>{projDetail.endTime}</span></li>
                                    <li>Softcap <span>{projDetail.softcap + " BNB"}</span></li>
                                    <li>Hardcap <span>{projDetail.hardcap + " BNB"}</span></li>
                                    <li>Unsold token <span>{projDetail.refundType}</span></li>
                                    <li>Minimum buy <span>{projDetail.minBNB + " BNB"}</span></li>
                                    <li>Maximum buy <span>{projDetail.maxBNB + " BNB"}</span></li>
                                    <li>Liquidity <span>{projDetail.liqPercent + " %"}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default ProjectDetail;
