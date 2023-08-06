import { createRouter, createWebHistory } from 'vue-router';

import Quizzes from './components/Quizzes.vue';
import Quiz from './components/Quiz.vue';

const routes = [
    {
        path: '/',
        component: Quizzes
    },
    {
        path: '/quizzes/:id',
        component: Quiz
    }
];

export default createRouter({
    routes,
    history: createWebHistory()
});
