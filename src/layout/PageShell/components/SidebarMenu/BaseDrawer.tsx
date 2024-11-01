// src/components/common/Drawer/BaseDrawer.tsx
import { Drawer as MantineDrawer } from '@mantine/core';

interface BaseDrawerProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string | number;
}

export const BaseDrawer = ({
  opened,
  onClose,
  children,
  position = 'right',
  size = 'sm',
}: BaseDrawerProps) => {
  return (
    <MantineDrawer.Root opened={opened} onClose={onClose} position={position} size={size}>
      <MantineDrawer.Overlay />
      <MantineDrawer.Content p={10}>
        <MantineDrawer.Header>
          <MantineDrawer.CloseButton style={{ outline: 'none' }} />
        </MantineDrawer.Header>
        <MantineDrawer.Body>
          {children}
        </MantineDrawer.Body>
      </MantineDrawer.Content>
    </MantineDrawer.Root>
  );
};
