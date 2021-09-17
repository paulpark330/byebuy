import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import { Route, Redirect } from 'react-router-dom';
import TopAppBar from '../components/top-appbar';
import BottomNavBar from '../components/bottom-navbar';
import Home from './home';
import Chat from './chat';
import NewPost from './new-post';
import Favorites from './favorites';
import Profile from './profile';
import Details from './details';
import Search from './search';

export default function Pages() {
  const { username } = useContext(AppContext);

  if (!username) return <Redirect to="/auth" />;
  return (
    <div>
      <Route exact path="/">
        <TopAppBar />
        <Home />
        <BottomNavBar />
      </Route>
      <Route path="/new-post">
        <TopAppBar />
        <NewPost />
        <BottomNavBar />
      </Route>
      <Route path="/chat">
        <TopAppBar />
        <Chat />
        <BottomNavBar />
      </Route>
      <Route path="/favorites">
        <TopAppBar />
        <Favorites />
        <BottomNavBar />
      </Route>
      <Route path="/profile">
        <TopAppBar />
        <Profile />
        <BottomNavBar />
      </Route>
      <Route path="/search">
            <TopAppBar />
            <Search />
      </Route>
      <Route path="/post">
            <Details />
      </Route>
    </div>
  );
}
