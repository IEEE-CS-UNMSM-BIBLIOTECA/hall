import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { Tooltip, useMatches, Drawer } from '@mantine/core';
import { IconMenu, IconSearch } from '@tabler/icons-react';
import { AUTHENTICATED_MENU_ITEMS, PUBLIC_MENU_ITEMS } from '@/constants/menuItems';
import { SidebarMenu } from './components/SidebarMenu';
import { LoginButton } from './components/LoginButton';
import styles from './PageShell.module.css';

const PageShell = ({ children }: { children?: React.ReactNode }) => {
  const [, setLocation] = useLocation();
  const [opened, setOpened] = useState(false);
  const [authenticated] = useState(false);

  const iconSize = useMatches({
    base: 20,
    md: 24,
  });

  const menuItems = useMemo(() => {
    return authenticated ? AUTHENTICATED_MENU_ITEMS : PUBLIC_MENU_ITEMS;
  }, [authenticated]);

  return (
    <>
      <div className={styles.pageShell}>
        <div className={styles.iconContainer}>
          <Tooltip
            label="Buscar"
            withArrow
            transitionProps={{ duration: 200, transition: 'fade-down' }}
          >
            <IconSearch
              className="icon-button"
              size={iconSize}
              onClick={() => setLocation('/search')}
            />
          </Tooltip>
        </div>

        <div className={styles.content}>{children}</div>

        <div className={styles.iconContainer}>
          <IconMenu
            className="icon-button"
            size={iconSize}
          />
        </div>
      </div>

      <Drawer.Root opened={opened} onClose={() => setOpened(false)} position="right" size="sm">
        <Drawer.Overlay />

        <Drawer.Content p={10}>
          <Drawer.Header>
            <Drawer.CloseButton
              style={{
                outline: 'none',
              }}
            />
          </Drawer.Header>

          <Drawer.Body>
            <SidebarMenu menuItems={menuItems} />
          </Drawer.Body>

          {!authenticated && <LoginButton />}
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default PageShell;
