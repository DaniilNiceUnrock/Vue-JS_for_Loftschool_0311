<template> 
    <div class="reviews-container">   
        <div class="reviews-container">   
            <div class="content">
                <div class="pageHeader"> 
                    <span class="h1">Блок 'Отзывы'</span>
                </div>

                <form @submit.prevent="handleSubmit">
                    <card title="Новый отзыв" v-if="show">
                        <div class="content__newReviews" slot="content">
                            <div class="content__photo">
                                <avatar size="15" src="/src/images/content/avatar.png" class="review__avatar"/>
                                <btn title="Загрузить фото" :plain="true"> </btn>
                            </div>
                            <div class="content__user_info">
                                <div class="content__user_name">
                                    <span class="user__title" :v-model="newReview.author">Имя автора</span>
                                    <input placeholder="Ковальчук Дмитрий" class="author_text"> 
                                </div>
                                <div class="content__user_name">
                                    <span class="user__title" :v-model="newReview.occ">Титул автора</span>
                                    <input placeholder="Основатель LoftSchool" class="author_text"> 
                                </div>
                                <div class="content__user_text">
                                    <span class="user__title_text" :v-model="newReview.text">Отзыв</span>
                                    <input placeholder="Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!" class="text"> 
                                </div>
                            </div>
                            <div class="content__user_add">
                                <btn title="Отмена"  :plain="true" @click="close_add"> </btn>
                                <btn title="Добавить" @click="add"> </btn>
                            </div>
                        </div>
                    </card>  
                </form>
                

                
                <div class="reviews__list">
                    <div class="reviews__add">
                        <btn type="square" title="Добавть отзыв" @click="addNewReview"></btn>
                    </div>


                    <div class="reviews__item" v-for="review in reviews" :key="review.id">
                        <card>
                            <template slot="title"> 
                                <div class="review__head">
                                    <avatar size="2.7" :src="review.photo" class="review__avatar"/>
                                    <div class="review__head_info">
                                        <div class="review__name">{{review.name}}</div>
                                        <div class="review__occ">{{review.occ}}</div>
                                    </div>
                                </div>
                            </template>
                            <template slot="content"> 
                                <div class="rewiew__content">
                                    <div class="review__text"> {{review.text}}</div>
                                </div>
                                <div class="rewiew__actions">
                                    <icon title="Править"  symbol="pencil" class="review__edit" @edit="edit" />
                                    <icon title="Удалить"  symbol="cross" class="review__cross"  @remove="remove(review.id)" />
                                </div>
                            </template>
                        </card> 
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {
    components: {
       btn:()=> import('../../components/button'),
       card:()=> import('../../components/card'),
       avatar:()=> import('../../components/avatar'),
       icon:()=> import('../../components/icon'),
    },
    data() {
        return {
           // reviews: [],
            author: "",
            occ: "",
            text: "",
            photo: {},
            preview: "",
            show: false,
        };
    },
    created (){ 
       // let data = require('../../data/reviews.json');
        //this.reviews  = this.changeImagePath(data);
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
        addNewReview() {
            if (this.show === false) {
                 this.show = true
            }
           else this.show = false
        },
        close_add() {
            this.show = false;
        },
        add() {
            //сбор данных в объект и отправка на сервер
            this.show = false;
        },
        changeImagePath(reviews) {
            return reviews.map(item=> {
                item.photo = require(`../../images/content/${item.pic}`).default;
                return item;
            });
        },
    },
    mounted() {
        this.getReviews();
    }
}
</script>

<style lang="pcss" scoped>
    .reviews__list{
        display: flex;
        flex-wrap: wrap;
    }
    .reviews__add {
        width: calc((100% - 56px) / 3);
        margin-right: 28px;
        margin-bottom: 30px;
    }
    .reviews__item {
        width: calc((100% - 56px) / 3);
        margin-right: 28px;
        margin-bottom: 30px;
        min-height: 350px;
        background: #fff;
            &:nth-child(3n) {
                margin-right: 0;
            }
    }
    .review__head {
        display: flex;
    }
    .review__avatar {
        margin-right: 20px;

    }
    .review__occ {
        font-weight: 600;
        font-style: 16px;
        line-height: 22px;
        color: rgba(65,  76, 99, 0.5);
    }
    .h1 {
        font-weight: bold;
        font-size: 21px;
        line-height: 29px;
        display: flex;
        align-items: center;
    }
    .pageHeader {
        margin-bottom: 30px;
    }
    .review__text {
        font-weight: 600;
        font-size: 16px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: rgba(65, 76, 99, 0.7);
    }
    .rewiew__content {
        height: 100%;
        margin-bottom: 30px;
    }
    .rewiew__actions {
        display: flex;
        justify-content: space-between;
    }
    .content__newReviews {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    .content__user_name {
        width: 45%;
        margin-right: 5%;
    }
    .content__user_info {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
    }
    .user__title {
        color: rgba(55, 62, 66, 0.6);
        font-size: 16px;
    }
    input {
        margin-top: 0px;
        width: 100%;
        min-height: 50%;
    }
    input :active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }
    .content__user_text {
        width: 100%;
    }
    .text {
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding-top: 0;
        padding-left: 10px;
        padding-right: 10px;
        min-height: 62%;
        max-height: 62%;
        font-size: 16px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: #414C63;
    }
    .author_text {
        border-left: none;
        border-right: none;
        border-top: none;
        font-size: 16px;
        line-height: 22px;
        min-height: 35%;
        display: flex;
        align-items: center;
        color: #414C63;
    }
    .content__photo {
        margin-right: 15px;
    }
    .card-component {
        margin-bottom: 2%;
    }
    .reviews-container {
        padding-left: 1%;
        padding-right: 1%;
    }
</style>