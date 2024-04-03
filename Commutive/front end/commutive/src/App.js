import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./login.component";
import SignUp from "./signUp.component";
import Dashboard from './dashboard';
import CommunityPage from './CommunityPage';
import Homepage from "./homepage";
import  CreateCommunity from "./createCommunity";
import addPost from './addPost';
import CreatePost from './CreatePost';
import createCommunity from './createCommunity';
import ListPost from './listPost';
import LikePost from "./likePost";
import PictureUploader from './pictureUploader';
import Popup from './popup';
import ReportPost from './reportPost';
import createEvent from './createEvent';
import Showevent from './showevent';
import Notification from './notification';
import ProfileUser from './ProfileUser';
import ShowCalendarUser from './showCalendarUser';
import DashboardPosts from './dashboardPosts';
import PostPage from './postPage';
import ShowCalendar from './showCalendar';








function App() {

  
  function PrivateRoute ({component: Component, ...rest}) {

    return (
      <Route
        {...rest}
        render={(props) => !!localStorage.getItem('loginToken')
          ? <Component {...props} />
          : <Redirect to={{pathname: '/sign-in', state: {from: props.location}}} />} //or from: props.location
      />
    )
  }
  return (<Router>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path="/notification" component={Notification} /> 
            <PrivateRoute path='/dashboard' component={DashboardPosts} />
            <PrivateRoute path='/mycommunities' component={Dashboard} />
            <Route path="/community/:id/post/:postid" /*component={PostPage}*/ render={(props) => <PostPage {...props}/>} />
            <Route path='/community/:id' component={CommunityPage} /> 
            <Route path="/sign-in" component={Login} /> 
            <Route path="/sign-up" component={SignUp} />
            <PrivateRoute path="/create-community" component={CreateCommunity} /> 
            {/* <Route  expect path="/like" component={LikePost} /> 
            <Route exact path='/' component={Popup} /> */}
            <Route path="/createEvent/:id" component={createEvent} />
            <PrivateRoute path="/profile" component={ProfileUser} />
             <PrivateRoute path="/mycalendar" component={ShowCalendarUser} />
          </Switch>
    </Router>
  );
}

export default App;
