import {
  IconMenu,
  IconSearch,
} from '@tabler/icons-react';

import classes from './PageShell.module.css';

const PageShell = ({ children }: {
  children: React.ReactNode;
}) => (
  <>
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <div className={classes['side-icon-container']}>
        <IconSearch />
      </div>
      {children}
      <div className={classes['side-icon-container']}>
        <IconMenu />
      </div>
    </div>
  </>
);

export default PageShell;
