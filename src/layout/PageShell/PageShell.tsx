import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { Tooltip, useMatches, Drawer, Text, Anchor, Flex } from '@mantine/core';
import { IconMenu, IconSearch } from '@tabler/icons-react';
import styles from './PageShell.module.css';
import { AUTHENTICATED_MENU_ITEMS, PUBLIC_MENU_ITEMS } from '@/constants/menuItems';

const PageShell = ({ children }: { children: React.ReactNode }) => {
  const [, setLocation] = useLocation();
  const [opened, setOpened] = useState(false);
  const [authenticated] = useState(true);

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
              className={styles.icon}
              size={iconSize}
              onClick={() => setLocation('/search')}
            />
          </Tooltip>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.iconContainer}>
          <IconMenu onClick={() => setOpened(true)} className={styles.icon} size={iconSize} />
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
            <Flex pt={30} direction="column" className={styles.sidebarContent}>
              {menuItems.map(({ label, link }) => (
                <Anchor
                  key={label}
                  variant="text"
                  underline="never"
                  size="xl"
                  onClick={() => setLocation(link)}
                  style={{
                    opacity: 1,
                    transition: 'opacity 0.2s',
                    color: 'var(--mantine-color-primary)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '0.5';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {label}
                </Anchor>
              ))}
            </Flex>
          </Drawer.Body>

          {
            !authenticated && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  padding: '2rem 1rem',
                  textAlign: 'left',
                }}
              >
                <Text fz={25} style={{ cursor: 'pointer' }} onClick={() => setLocation('/login')}>
                  INICIAR SESIÓN
                </Text>
              </div>
            )
          }
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default PageShell;
