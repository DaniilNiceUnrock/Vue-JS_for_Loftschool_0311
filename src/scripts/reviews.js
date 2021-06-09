import Vue from "vue";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    Swiper, SwiperSlide
  },
  data() {
    return {
      reviews: [],
      currentIndex: 0,
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
        }
      }
    }
  },
  methods: {
    requireImagesToArray(data) {
      return data.map(item => {
        const requireImage = require(`../images/content/${item.pic}`)
          .default;
        item.pic = requireImage;
        return item;
      });
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper;
      const nextBtn = this.$refs.nextBtn;
      const prevBtn = this.$refs.prevBtn;

      switch(direction) {
        case "next" :
          slider.slideNext();
          break;
        case "prev" :
          slider.slidePrev();
          break;
        }

      if (slider.isEnd) {
        nextBtn.classList.add('disabled');
      } else {
        nextBtn.classList.remove('disabled');
      }

      if (slider.isBeginning) {
        prevBtn.classList.add('disabled');
      } else {
        prevBtn.classList.remove('disabled');
      }

      },
    },

  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  }
});