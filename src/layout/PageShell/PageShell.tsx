import { useMatches } from '@mantine/core';
import { IconMenu, IconProps, IconSearch } from '@tabler/icons-react';
import { useLocation } from 'wouter';

const iconContainerProps: React.HTMLProps<HTMLDivElement> = {
  style: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const PageShell = ({ children }: { children: React.ReactNode }) => {
  const [, setLocation] = useLocation();

  const iconSize = useMatches({
    base: 20,
    md: 24,
  });

  const iconProps: IconProps = {
    size: iconSize,
    stroke: 1.25,
    style: {
      cursor: 'pointer',
    },
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <div {...iconContainerProps}>
          <IconSearch
            {...iconProps}
            onClick={() => setLocation('/search')}
          />
        </div>
        {children}
        <div {...iconContainerProps}>
          <IconMenu
            {...iconProps}
          />
        </div>
      </div>
    </>
  );
};

export default PageShell;
