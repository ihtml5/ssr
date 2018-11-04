// client/routes.js

import App from '../App';
import Home from '@/components/home';
import Push from '@/components/push';

const routes = [
	{
		component: Home,
		path: '/',
		exact: true
	},
	{
		component: App,
		path: '/ssr',
		exact: true
	},
	{
		path: '/home',
		component: Home,
		exact: true
	},
	{
		path: '/push',
		component: Push,
		exact: true
	}
];

export default routes;
