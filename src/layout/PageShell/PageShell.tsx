import { useMatches } from '@mantine/core';
import { IconMenu, IconSearch } from '@tabler/icons-react';
import { useLocation } from 'wouter';
import styles from './PageShell.module.css';

const PageShell = ({ children }: { children?: React.ReactNode }) => {
  const [, setLocation] = useLocation();

  const iconSize = useMatches({
    base: 20,
    md: 24,
  });

  return (
    <>
      <div className={styles.pageShell}>
        <div className={styles.iconContainer}>
          <IconSearch
            className="icon-button"
            size={iconSize}
            onClick={() => setLocation('/search')}
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.iconContainer}>
          <IconMenu
            className="icon-button"
            size={iconSize}
          />
        </div>
      </div>
    </>
  );
};

export default PageShell;
