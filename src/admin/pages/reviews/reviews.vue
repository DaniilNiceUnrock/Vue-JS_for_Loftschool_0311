<template>
    <div class="reviews-page-component">
        <div class="page-content">
            <div class="container">
                <div class="header">
                    <div class="title">Блок "{{this.$route.meta.title}}"</div>
                </div>
                <ul class="cards">
                    <li class="li-form" v-if="emptyCardIsShown">
                        <form-reviews :currentReview="currentReview" @close="closeHandler" />
                    </li>
                    <li class="item empty-work" v-else>
                        <square-btn v-if="emptyCardIsShown == false" type="square" title="Добавить отзыв" @click="emptyCardIsShown = true"/>
                    </li>
                    <li class="item" v-for="review in reviews" :key="review.id">
                        <review-card :review="review" @edit="edit" @remove="remove(review.id)" />
                    </li>  
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import formReviews from "../../components/formAddReviews";
import reviewCard from "../../components/reviewCard";
import squareBtn from "../../components/button/button";
import { mapState, mapActions } from "vuex";

export default {
    components: { 
        formReviews, 
        reviewCard,
        squareBtn
    },
    data() {
        return {
            emptyCardIsShown:false,
            currentReview: null
        }
    },
    computed: {
        ...mapState("reviews", {
        reviews: (state) => state.reviews,
        }),
    },
    methods: {
        ...mapActions({
            getReviews: "reviews/get",
            removeReview: "reviews/remove",
            editReview: "reviews/edit",
            showTooltip: "tooltips/show"
        }),
        remove(currentReviewId) {
            try {
                this.removeReview(currentReviewId);
                this.showTooltip({
                    text: "Отзыв успешно удален",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        edit(currentReview) {
            this.currentReview = { ...currentReview };
             this.emptyCardIsShown = true;
        },
        closeHandler(){
            this.emptyCardIsShown = false;
        }
    },
     watch: {
        emptyCardIsShown(){
            if(!this.emptyCardIsShown){
                this.currentReview = null
            }
        }
    },
    mounted() {
        this.getReviews();
    }
}
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>