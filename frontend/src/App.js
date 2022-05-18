import React from 'react';
import GamfiHeader from "./components/root/GamfiHeader";
import GamfiFooter from './components/root/GamfiFooter';
import Staking from "./pages/Staking";
import LaunchPad from "./pages/LaunchPad/LaunchPad";
import ProjectDetail from "./pages/LaunchPad/ProjectDetail";
import CreateLaunchPad from './pages/LaunchPad/CreateLaunchpad';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import {useSelector} from 'react-redux';
import './App.css';
import './index.css';
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  const isLoading = useSelector(state => state.loading.isLoading);
  
  return(
    <Router>
        <ReactNotifications />
        <Loading loading={isLoading} background="transparent" loaderColor="#a3ff12" /> 
        <div className='App font-white'>
          <GamfiHeader/>
          <Switch>
            <Route exact strict path='/staking' component={Staking} />
            <Route exact strict path='/' component={LaunchPad} />
            <Route exact strict path='/:id' component={ProjectDetail} />
            <Route exact strict path='/createlaunchpad' component={CreateLaunchPad} />
          </Switch>
          <GamfiFooter/>
        </div>
    </Router>
  )
}

export default App;
