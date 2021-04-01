import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthHelper from '@/helpers/auth-helper'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		status: '',
		token: localStorage.getItem('token') || ''
	},
	mutations: {
		auth_request(state) {
			state.status = 'pending'
		},
		auth_success(state, { token }) {
			state.status = 'success'
			state.token = token
		},
		auth_error(state) {
			state.status = 'error'
		},
		logout(state) {
			state.status = ''
			state.token = ''
		}
	},
	actions: {
		logout({ commit }) {
			commit('logout')
			localStorage.removeItem('token')
		},
		async login({commit}, { user }) {
			commit('auth_request')
			let result = await AuthHelper.login({user})
			if (result.data.token) {
				let token = result.data.token
				localStorage.setItem('token', token)
				commit('auth_success', { token })
				return result
			} else {
				commit('auth_error')
				return result
			}
		},
		async register({ commit }, { user }) {
			commit('auth_request')
			let result = await AuthHelper.register({user})
			if (result.data.token) {
				let token = result.data.token
				localStorage.setItem('token', token)
				commit('auth_success', { token })
				return result
			} else {
				commit('auth_error')
				return result
			}
		},
	},
	getters: {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
	}
})