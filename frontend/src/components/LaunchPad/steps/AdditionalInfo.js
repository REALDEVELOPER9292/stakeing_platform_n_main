import React, { useState, useEffect } from "react";
import { CDBInput, CDBContainer, CDBBtn } from 'cdbreact';
import {useSelector, useDispatch} from 'react-redux';
import {launchpadActions} from '../../../reducers/actions';

export const AdditionalInfo = () => {
  const dispatch = useDispatch();
  const AdditionalInfo = useSelector(state => state.launchpad.additionalInfo);

  const [logo, setlogo] = useState(AdditionalInfo.logo);
  const [website, setWebsite] = useState(AdditionalInfo.website);
  const [facebook, setFacebook] = useState(AdditionalInfo.facebook);
  const [twitter, setTwitter] = useState(AdditionalInfo.twitter);
  const [github, setGithub] = useState(AdditionalInfo.github);
  const [telegram, setTelegram] = useState(AdditionalInfo.twitter);
  const [instagram, setInstagram] = useState(AdditionalInfo.twitter);
  const [discord, setDiscord] = useState(AdditionalInfo.discord);
  const [reddit, setReddit] = useState(AdditionalInfo.reddit);
  const [description, setDescription] = useState(AdditionalInfo.description);
  
  const stepForward = () => {
    if (logo == "" || logo == null || website == "" || website == null) {
        launchpadActions.displayAlert("Fill in required fields", "danger");
        return;
    }
    dispatch(launchpadActions.setAdditionalInfo({logo, website, facebook, twitter, github, telegram, instagram, discord, reddit, description}))  
    dispatch(launchpadActions.increaseStep(2));
  }

  const stepBack = () => {
    dispatch(launchpadActions.setAdditionalInfo({logo, website, facebook, twitter, github, telegram, instagram, discord, reddit, description}))
    dispatch(launchpadActions.decreaseStep(2));
}
  
  return (
    <div className="mt-80">
        <CDBContainer className='row'>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Logo URL</h5><p className="font-red">* Required</p>
                <CDBInput type="text" placeholder="Logo URL" color="secondary" onChange={(e) => {setlogo(e.target.value)}} value={AdditionalInfo.logo}/>
                <span className="ml-10 font-blue">URL must end with a supported image extension png, jpg, jpeg or gif.</span>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Website URL</h5><p className="font-red">* Required</p>
                <CDBInput type="text" placeholder="Website" color="secondary" onChange={(e) => {setWebsite(e.target.value)}} value={AdditionalInfo.website}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Facebook</h5>
                <CDBInput type="text" placeholder="Facebook: Ex: https://facebook.com/..." color="secondary" onChange={(e) => {setFacebook(e.target.value)}} value={AdditionalInfo.facebook}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Twitter</h5>
                <CDBInput type="text" placeholder="Twitter: Ex: https://twitter.com/..." color="secondary" onChange={(e) => {setTwitter(e.target.value)}} value={AdditionalInfo.twitter}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Github</h5>
                <CDBInput type="text" placeholder="Github: Ex: https://github.com/..." color="secondary" onChange={(e) => {setGithub(e.target.value)}} value={AdditionalInfo.github}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Telegram</h5>
                <CDBInput type="text" placeholder="Telegram: Ex: https://t.me/..." color="secondary" onChange={(e) => {setTelegram(e.target.value)}} value={AdditionalInfo.telegram}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Instagram</h5>
                <CDBInput type="text" placeholder="Instagram: Ex: https://instagram.com/..." color="secondary" onChange={(e) => {setInstagram(e.target.value)}} value={AdditionalInfo.instagram}/>
            </div>
            <div className="col-md-6">
                <h5 className="m1-5 pt-20">Discord</h5>
                <CDBInput type="text" placeholder="Discord: Ex: https://t.me/..." color="secondary" onChange={(e) => {setDiscord(e.target.value)}} value={AdditionalInfo.discord}/>
            </div>
            <h5 className="m1-5 pt-20">Reddit</h5>
            <CDBInput type="text" placeholder="Reddit: Ex: https://reddit.com/..." color="secondary" onChange={(e) => {setReddit(e.target.value)}} value={AdditionalInfo.reddit}/>
            <h5 className="m1-5 pt-20">Description</h5>
            <CDBInput type="textarea" color="secondary" placeholder="Description" onChange={(e) => {setDescription(e.target.value)}} value={AdditionalInfo.description}/>
            <CDBBtn color="dark" className="col-md-6" size="large" onClick={stepBack}>back</CDBBtn>
            <CDBBtn className="col-md-6" color="secondary" size="large" onClick={stepForward}>next</CDBBtn>
        </CDBContainer>
    </div>
  );
};

export default AdditionalInfo;