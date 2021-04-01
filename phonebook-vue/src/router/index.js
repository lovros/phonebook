import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import LogIn from '@/components/authentication/LogIn'
import Register from '@/components/authentication/Register'

import ContactsIndex from '@/components/contacts/ContactsIndex'
import ContactNew from '@/components/contacts/ContactNew'
import ContactDetails from '@/components/contacts/ContactDetails'
import ContactEdit from '@/components/contacts/ContactEdit'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register 
    },
    {
      path: '/contacts',
      name: 'ContactsIndex',
      component: ContactsIndex,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/contacts/new',
      name: 'ContactNew',
      component: ContactNew,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/contacts/:id',
      name: 'ContactDetails',
      component: ContactDetails,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/contacts/edit/:id',
      name: 'ContactEdit',
      component: ContactEdit,
      meta: {
        requiresAuth: true
      } 
    },
    
  ]
})
// Handle authorized routes
router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)){
		if (store.getters.isLoggedIn) {
			next()
			return
		}
		next('/')
	} else {
		next()
	}
})

export default router