import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';

window.Vue = require('vue').default;
Vue.use(VueRouter);
const router = new VueRouter ({
    mode:'history',
    routes
});
const app = new Vue({
    el:"#app",
    router: router,
})
