import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import About from '../views/About.vue'
import Capacitadores from '../components/Capacitadores/Capacitadores.vue'
import ClientesEmpresas from '../components/ClientesEmpresas/ClientesEmpresas.vue'
import Cursos from '../components/Cursos/Cursos.vue'
import Duraciones from '../components/Duraciones/Duraciones.vue'
import Capacitaciones from '../components/Capacitaciones/Capacitaciones.vue'
import Grupos from '../components/Capacitaciones/Detalle/Grupos.vue'
import {Action as drawerActions} from '../store/drawer/types'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        title: 'Home', 
        requiresAuth: true
      } 
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Login' } 
    },
    {
      path: '/register',
      name: 'register',
      component: Signup,
      meta: { 
        title: 'Signup',
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { 
        title: 'About',
        requiresAuth: true 
      }
    },
    {
      path: '/capacitadores',
      name: 'capacitadores',
      component: Capacitadores,
      meta: { 
        title: 'Capacitadores',
        requiresAuth: true 
      }
    },
    {
      path: '/clientes_empresas',
      name: 'clientes_empresas',
      component: ClientesEmpresas,
      meta: { 
        title: 'Empresas',
        requiresAuth: true 
      }
    },
    {
      path: '/cursos',
      name: 'cursos',
      component: Cursos,
      meta: { 
        title: 'Cursos',
        requiresAuth: true 
      }
    },
    {
      path: '/duraciones',
      name: 'duraciones',
      component: Duraciones,
      meta: { 
        title: 'Duraciones',
        requiresAuth: true 
      }
    },
    {
      path: '/capacitaciones',
      name: 'capacitaciones',
      component: Capacitaciones,
      meta: { 
        title: 'Capacitaciones',
        requiresAuth: true 
      }
    },
    {
      path: '/capacitaciones/grupos/:id',
      name: 'grupos',
      component: Grupos,
      meta: { 
        title: 'Grupos',
        requiresAuth: true 
      }
    },
  ]
})
  
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('INIT').then(() => {
    }).finally(() => {
      if (store.getters.isLoggedIn) {
        if(to.name == "home" && from.name != "login") {
          store.dispatch(drawerActions.DRAWER, true)
          return
        }
        next()
        return
      }
      next('/login')
    })
  } else {
    next()
  }
})
const DEFAULT_TITLE = 'Course Tracker';
router.afterEach((to, from) => {
  Vue.nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE;
  });
});
export default router
