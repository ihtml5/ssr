// client/routes.js

import App from '../App';
import Home from '@/components/home';
import Push from '@/components/push';

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/push',
        component: Push,
      }
    ]
  }
];

export default routes;