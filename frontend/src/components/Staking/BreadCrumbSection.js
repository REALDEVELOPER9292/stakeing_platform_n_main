import React from 'react';
import {Link} from 'react-router-dom'

const BreadCrumbSection = () => {
  return(
    <div className="gamfi-breadcrumbs-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className="breadcrumbs-area sec-heading">
                        <div className="sub-inner mb-15">
                            <Link className="breadcrumbs-link" to="/">Home</Link>
                            <span className="sub-title">Staking</span>
                            <img className="heading-left-image" src="assets/images/icons/steps.png" alt="Steps-Image" />
                        </div>
                        <h2 className="title mb-0">Staking</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BreadCrumbSection;
