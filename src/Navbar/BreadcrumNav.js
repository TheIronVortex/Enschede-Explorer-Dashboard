import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function BreadcrumbNav() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = decodeURIComponent(name);
        return (
          <Breadcrumb.Item key={name} href={routeTo} active={isLast}>
            {displayName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbNav;
