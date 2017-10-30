// import getBreadcrumbs from './breadcrumbs';

// const routes = {
//   '/': 'APM',
//   '/:appName/errors': 'Errors',
//   '/:appName/errors/:groupId': params => params.groupId,
//   '/:appName': {
//     url: params => `/${params.appName}/transactions`,
//     label: params => params.appName
//   },
//   '/:appName/transactions/:transactionType': params => params.transactionType,
//   '/:appName/transactions/:transactionType/:transactionName': params =>
//     params.transactionName
// };

// // const pathname = '/opbeans-backend/errors/a43bcaa33f1577ca6b5d99f05faa4e07';
// // const pathname = '/opbeans-backend/transactions/request/GET ~2Fapi~2Fstats';
// const pathname = '/python-app';

// const breadcrumbs = getBreadcrumbs(routes)(pathname);
// console.log(breadcrumbs);

import { matchPath } from 'react-router';
import React from 'react';
import { Router, Route } from 'react-router-dom';

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
});

export default () => {
  return (
    <Router>
      <Route {...match} />
    </Router>
  );
};
