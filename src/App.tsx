import { Switch, Route } from 'wouter';

import Books from './pages/Books';
import Search from './pages/Search';
import Book from './pages/Book';
import Lists from './pages/Lists';
import List from './pages/List';
import Reviews from './pages/Reviews';
import Review from './pages/Review';

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/">
          <Books />
        </Route>
        <Route path="/book/:id">
          {(params) => <Book id={params.id} />}
        </Route>
        <Route path="/lists">
          <Lists />
        </Route>
        <Route path="/list/:id">
          {(params) => <List id={params.id} />}
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
        <Route path="/review/:id">
          {(params) => <Review id={params.id} />}
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
