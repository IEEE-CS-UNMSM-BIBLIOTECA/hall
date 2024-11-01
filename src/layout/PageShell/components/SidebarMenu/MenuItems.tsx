import { Anchor, Flex } from '@mantine/core';
import styles from '../../PageShell.module.css';

interface MenuItem {
  id: number;
  label: string;
  link: string;
}

interface MenuItemsProps {
  items: MenuItem[];
  onItemClick: (link: string) => void;
}

export const MenuItems = ({ items, onItemClick }: MenuItemsProps) => (
  <Flex pt={30} direction="column" className={styles.sidebarContent}>
    {items.map(({ id, label, link }) => (
      <Anchor
        key={id}
        variant="text"
        underline="never"
        size="xl"
        onClick={() => onItemClick(link)}
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
);
