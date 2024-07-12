import { createStore } from 'vuex';
export default createStore({
    sate: {
        isAuthenticated: false,
    },
    mutations: {
        setAutentication(sate,satus){
            sate.isAuthenticated = satus;
        }
    },
    actions: {
        login({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    commit('setAutentication', true);
                    resolve();
                }, 1000);
            });
        },
        logout({ commit }) {
            commit('setAutentication', false);
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated
    }
});