// store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: false,
        isGoogleSignIn: false,
    },
    mutations: {
        setAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setGoogleSignIn(state, payload) {
            state.isGoogleSignIn = payload;
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        isGoogleSignIn: state => state.isGoogleSignIn,
    },
    actions: {
        login({ commit }, isGoogle) {
            commit('setAuthenticated', true);
            commit('setGoogleSignIn', isGoogle);
        },
        logout({ commit }) {
            commit('setAuthenticated', false);
            commit('setGoogleSignIn', false);
        }
    }
});

export default store;
