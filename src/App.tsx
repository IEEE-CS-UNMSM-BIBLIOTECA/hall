import { Switch, Route } from 'wouter';

import pages from '@/pages';

const App = () => {
  return (
    <div className="app-container">
      <Switch>
      {
        pages.map(page => (
          <Route
            key={page.href}
            path={page.href}
            component={page.component}
          />
        ))
      }
      </Switch>
    </div>
  );
};

export default App;
