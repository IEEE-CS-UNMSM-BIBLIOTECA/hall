// components/SidebarMenu/SidebarMenu.tsx
import { Flex, Anchor } from '@mantine/core';
import { useLocation } from 'wouter';

interface MenuItem {
  label: string;
  link: string;
}

interface SidebarMenuProps {
  menuItems: MenuItem[];
}

export const SidebarMenu = ({ menuItems }: SidebarMenuProps) => {
  const [, setLocation] = useLocation();

  return (
    <Flex pt={30} direction="column">
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
  );
};
