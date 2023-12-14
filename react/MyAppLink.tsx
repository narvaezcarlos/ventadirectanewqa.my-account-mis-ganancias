import React, { Fragment } from 'react';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

type Link = {
  name: string;
  path: string;
};

type MyAppLinkProps = {
  render: (links: Link[]) => React.ReactNode;
};

const MyAppLink: FunctionComponent<MyAppLinkProps> = ({ render }) => {
  const intl = useIntl();

  const links: Link[] = [
    {
      name: intl.formatMessage({ id: 'store-misGanancias.label' }),
      path: '/mis-ganancias',
    },
  ];

  return (
    <Fragment>
      {render(links)}
    </Fragment>
  );
};

export default MyAppLink;
