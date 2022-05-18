import React from 'react';
import {Link} from 'react-router-dom';

const PreviousProjects = () => {
    
    return(
        <>
        <div className="gamfi-footer-section">
            <div className="container">
                <div className="footer-cta-area text-center active-shape hover-shape-inner">
                    <h2 className="title mb-15">
                        Apply for project
                    </h2>
                    <div className="dsc mb-40 md-mb-30">
                        If you want to lanuch an IDO, It will be your perfect choice
                    </div>
                    <Link className="banner-btn wow fadeInUp black-shape" data-wow-delay="300ms" data-wow-duration="2500ms" to="/createlaunchpad">
                        <span className="btn-text">Create Launchpad</span>
                        <span className="hover-shape1"></span>
                        <span className="hover-shape2"></span>
                        <span className="hover-shape3"></span>
                    </Link>
                    <span className="border-shadow shadow-1"></span>
                    <span className="border-shadow shadow-2"></span>
                    <span className="border-shadow shadow-3"></span>
                    <span className="border-shadow shadow-4"></span>
                    <span className="hover-shape-bg hover_shape1"></span>
                    <span className="hover-shape-bg hover_shape2"></span>
                    <span className="hover-shape-bg hover_shape3"></span>
                </div>
            </div></div>
        </>
    )
}

export default PreviousProjects;
