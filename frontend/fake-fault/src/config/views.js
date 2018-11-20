import React from 'react';

//models
import { Route } from 'mobx-router';

//components
import Table from '../components/Table/Table';
import EditFaults from '../components/EditFaults/EditFaults';
// import Document from 'components/Document';
// import Gallery from 'components/Gallery';
// import Book from 'components/Book';
import Visualize from '../components/Visualize/Visualize';
import DocMobxRout from '../components/DocMobxRout';

const views = {
  home: new Route({
    path: '/',
    component: <Table />
  }),
  visualize: new Route({
    path: '/visualize',
    component: <Visualize />,
    onEnter: () => {
      console.log('entering user profile!');
    },
    beforeExit: () => {
      console.log('exiting user profile!');
    },
    onParamsChange: (route, params, store) => {
      console.log('params changed to', params);
    }
  }),
  document: new Route({
    path: '/data/:id',
    component: <EditFaults />,
    onEnter: (route, params) => {
      console.log(`entering EditFaults with params`, params);
    }
  })
};
export default views;
