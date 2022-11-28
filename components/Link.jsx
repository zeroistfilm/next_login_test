import NextLink from 'next/link';

export { Link };

function Link({ href, children, ...props }) {
    return (
        <NextLink href={href}>
            <div {...props}>
                {children}
            </div>
        </NextLink>
    );
}