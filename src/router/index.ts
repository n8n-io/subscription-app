import ManagementView from '@/views/ManagementView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/manage',
			name: 'management',
			component: ManagementView,
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: NotFoundView,
		},
	],
});

export default router;
