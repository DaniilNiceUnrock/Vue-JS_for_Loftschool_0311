<!-- Копия кард для отзывов, чтобы тут расположить vue для вывода данных отзыва-->
<template lang="pug">
    card(simple)
        .reviews-wrapper
            .reviews-header
                .reviews-avatar
                    img.image(:src="cover")
                    image(:src="review.photo")
                .info
                    .author {{review.author}}
                    .occ {{review.occ}}
            .reviews-text
                p {{review.text}}
            .buttons
                icon(
                    symbol="pencil" 
                    title="Править" 
                    @click="edit()"
                )
                icon(
                    symbol="trash" 
                    title="Удалить" 
                    @click="$emit('remove', currentReview)"
                )
</template> 




<script>
import card from "../card";
import icon from "../icon";

export default {
    components: { 
        card, 
        icon
    },
    props: {
        review: Object,
    },
    data() {
        return {
            currentReview: {
                id: '',
                author: '',
                occ: '',
                text: '',
                preview: ''
            }
        }
    },
    methods: {
        edit() {
            this.setReview();
            this.$emit('edit', this.currentReview);
        },
        setReview() {
            this.currentReview = {
                id: this.review.id,
                author: this.review.author,
                occ: this.review.occ,
                text: this.review.text,
                preview: `https://webdev-api.loftschool.com/${this.review.photo}`
            }
        }
    },
    created() {
        this.setReview();
    },
    computed: {
        cover() {
            return `https://webdev-api.loftschool.com/${this.review.photo}`
        }
    }
};
</script>

<style scoped lang="postcss">
.reviews-wrapper {
    min-height: 385px;
    display: flex;
    flex-direction: column;
    padding: 28px;
}
.reviews-header {
    display: flex;
    padding: 5px 0 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.reviews-avatar {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 18px;
}
.author {
    font-weight: bold;
    margin-bottom: 3px;
}
.occ {
    font-size: 16px;
}
.reviews-text {
    max-width: 100%;
    padding-top: 30px;
}
.buttons {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
}
</style>