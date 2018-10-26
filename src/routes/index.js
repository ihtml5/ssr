// client/routes.js

import App from '../App';
import Home from '@/components/home';
import Push from '@/components/push';

const routes = [
<<<<<<< HEAD
<<<<<<< HEAD
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: App,
    path: '/ssr',
    exact: true,
  },
  {
    path: '/home',
	component: Home,
	exact: true,
  },
  {
    path: '/push',
	component: Push,
	exact: true,
  },
=======
=======
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
	{
    component: App,
    path: '/',
		routes: [
			{
				path: '/home',
				component: Home
			},
			{
        path: '/push',
				component: Push
			}
		]
	}
<<<<<<< HEAD
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
];

export default routes;
