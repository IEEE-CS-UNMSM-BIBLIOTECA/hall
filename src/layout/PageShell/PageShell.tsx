import { IconMenu, IconProps, IconSearch } from '@tabler/icons-react';

const iconContainerProps: React.HTMLProps<HTMLDivElement> = {
  style: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const iconProps: IconProps = {
  size: 24,
  stroke: 1.25,
  style: {
    cursor: 'pointer',
  },
};

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <>
    <div style={{ display: 'flex', height: '100%' }}>
      <div {...iconContainerProps}>
        <IconSearch {...iconProps} />
      </div>
      {children}
      <div {...iconContainerProps}>
        <IconMenu {...iconProps} />
      </div>
    </div>
  </>
);

export default PageShell;
