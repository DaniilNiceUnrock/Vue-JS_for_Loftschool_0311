export default {
    namespaced: true,
    state: {
       reviews: []
    },
    mutations: {
        SET_REVIEWS(state, reviews) {
            state.reviews = reviews
        },
        ADD_REVIEW(state, newReview) {
            state.reviews.unshift(newReview);
        },
        REMOVE_REVIEW(state, id) {
            state.reviews = state.reviews.filter(review => review.id !== id);
        },
        EDIT_REVIEW(state, reviewEdited) {
            state.reviews = state.reviews.map(review => {
                if(review.id === reviewEdited.review.id) {
                    review = reviewEdited.review;
                }
                return review;
            });
        }
    },
    actions: {
        async get(store) {
            try {
                const userId = 3; 
                const response = await this.$axios.get(`/reviews/${userId}`);
                store.commit("SET_REVIEWS", response.data);
            } catch (error) {
                throw new Error('Ошибка получения отзывов');
            }
        },
        async add({ commit }, newReview) {
            const formData = new FormData();  
            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            }) 
            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                throw new Error('Ошибка добавления отзыва');
            }
        },
        async remove(store, id) {
            try {
                const response = await this.$axios.delete(`/reviews/${id}`);
                store.commit('REMOVE_REVIEW', id);
            } catch (error) {
                throw new Error('Ошибка удаления отзыва');
            }
        },
        async edit({ commit }, review) {
            const formData = new FormData();
                
            Object.keys(review).forEach(item => {
                formData.append(item, review[item]);
            })
            
            try {
                const { data } = await this.$axios.post(`/reviews/${review.id}`, formData);
                commit("EDIT_REVIEW", data);
            } catch (error) {
                throw new Error('Ошибка редактирования работы');
            }
        }
    }
}