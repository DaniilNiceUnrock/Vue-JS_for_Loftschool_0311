export default {
    namespaced: true,
    state: {
       user: {}
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        DELETE_USER(state) {
            state.user = {};
        }
    },
    actions: {
        async getUser(context) {
            try {
                const user = await this.$axios.get('/user');
                context.commit('SET_USER', user.data.user);
            } catch (error) {
                console.log(error);
            }
            
        },
        userOut(state) {
            state.commit('DELETE_USER');
            localStorage.removeItem('token');
            this.$axios.defaults.headers['Authorization'] = '';
        }
    },
    getters: {
        userIsLogged: ({ user }) => {
            return (Object.keys(user).length === 0 && user.constructor === Object) === false;
        }
    }
}