import { createRouter, createWebHistory } from 'vue-router';
import Found from '../views/Found/Found.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/found'
  },
  {
    path: '/found',
    name: 'found',
    redirect: '/found/personality',
    component: Found,
    children:[
      {  path: '/found/personality', name: 'personality', component: ()=>import('../views/Found/children/Personality') },
      {  path: '/found/exclusive', name: 'exclusive', component: ()=>import('../views/Found/children/Exclusive') },
      {  path: '/found/songList', name: 'songList', component: ()=>import('../views/Found/children/SongList') },
      {  path: '/found/rank', name: 'rank', component: ()=>import('../views/Found/children/Rank') },
      {  path: '/found/singer', name: 'singer', component: ()=>import('../views/Found/children/Singer') },
      {  path: '/found/latest', name: 'latest', component: ()=>import('../views/Found/children/Latest') }
    ]
  },
  {
    path: '/podcast',
    name: 'podcast',
    component: ()=>import('../views/Podcast/Podcast'),
  },
  {
    path: '/songs',
    name: 'songs',
    component: ()=>import('../views/Songs/Songs'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
