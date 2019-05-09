import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../components/App';
import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import SignOut from '../components/Auth/SignOut';
import Reset from '../components/Auth/Reset';
import NewPassword from '../components/Auth/NewPassword';
import Welcome from '../components/Welcome';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import NoMatch from '../components/NoMatch';
import TermsOfService from "../components/StaticPages/TermsOfService";

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/tos" component={TermsOfService}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signout" component={SignOut}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/reset" component={Reset}/>
        <Route exact path="/newpassword/:token" component={NewPassword}/>
        <Route exact path="/home" component={Home}/>

        <Route exact path="/profile" component={Profile} username="me"/>
        <Route exact path="/settings/:page?" component={Settings}/>
        <Route exact path="/:username" component={Profile}/>
        <Route component={NoMatch}/>
      </Switch>
    </App>
  );
};

export default Routes;
