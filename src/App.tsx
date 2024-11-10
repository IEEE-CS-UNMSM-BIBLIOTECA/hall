import { Switch, Route, Redirect } from 'wouter';

import Books from './pages/Books';
import Search from './pages/Search';
import Book from './pages/Book';
import Lists from './pages/Lists';
import List from './pages/List';
import Reviews from './pages/Reviews';
import Review from './pages/Review';
import User from './pages/User';
import Settings from './pages/Settings';
import Lends from './pages/Lends';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import useAppStart from './hooks/useAppStart';
import useLocationChange from './hooks/useLocationChange';

const App = () => {
  useAppStart();
  useLocationChange();

  return (
    <div className="app-container">
      <Switch>
        <Route path="/">
          <Redirect to="/books" />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/lists">
          <Lists />
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
        <Route path="/book/:id">{({ id }) => <Book id={id} />}</Route>
        <Route path="/list/:id">{({ id }) => <List id={id} />}</Route>
        <Route path="/review/:id">{({ id }) => <Review id={id} />}</Route>
        <Route path="/user/:id">
          <Redirect to="/user/:id/reviews" />
        </Route>
        <Route path="/user/:id/reviews">{({ id }) => <User id={id} initialTab="reviews" />}</Route>
        <Route path="/user/:id/lists">{({ id }) => <User id={id} initialTab="lists" />}</Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/lends">
          <Lends />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
