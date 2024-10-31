import { Switch, Route } from 'wouter';

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

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/lists">
          <Lists />
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
        <Route path="/book/:id">
          {(params) => <Book id={params.id} />}
        </Route>
        <Route path="/list/:id">
          {(params) => <List id={params.id} />}
        </Route>
        <Route path="/review/:id">
          {(params) => <Review id={params.id} />}
        </Route>
        <Route path="/user/:id/reviews">
          {(params) => <User id={params.id} tab="reviews" />}
        </Route>
        <Route path="/user/:id/lists">
          {(params) => <User id={params.id} tab="lists" />}
        </Route>
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
