import { Switch, Route } from 'wouter';

import Home from './pages/Home';
import Search from './pages/Search';

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
