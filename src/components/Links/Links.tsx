export interface LinkType {
  href: string;
  label: string;
}

interface LinksProps extends React.HTMLProps<HTMLDivElement> {
  links: LinkType[];
}

const Links = ({ links, ...rest }: LinksProps) => {
  return (
    <div {...rest}>
      {
        links.map(({ href, label }, i) => (
          <span key={href}>
            <a href={href}>
              {label}
            </a>
            {i !== (links.length - 1) && ', '}
          </span>
        ))
      }
    </div>
  );
};

export default Links;
