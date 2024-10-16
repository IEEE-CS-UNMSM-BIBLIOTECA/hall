import {
  IconMenu,
  IconProps,
  IconSearch,
} from '@tabler/icons-react';

const iconContainerProps: React.HTMLProps<HTMLDivElement> = {
  style: {
    paddingLeft: 'var(--mantine-spacing-xl)',
    paddingRight: 'var(--mantine-spacing-xl)',
    paddingTop: 'var(--mantine-spacing-xl)',
    height: '100%',
  },
};

const iconProps: IconProps = {
  size: 'var(--mantine-spacing-lg)',
  style: { cursor: 'pointer' },
};

const PageShell = ({ children }: {
  children: React.ReactNode;
}) => (
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
