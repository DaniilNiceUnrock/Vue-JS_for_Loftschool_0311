import Vue from "vue";

const thumbs = {
    props: ["works", "currentWork"],
    template : "#preview-thumbs",
};

const btns = {
    template : "#preview-btns",
};

const display = {
    props : ["currentWork", "works" , "currentSlideData"],
    template : "#preview-display",
    components : {thumbs, btns},
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.slice(0, 3).reverse();
        }
    }
};

const tags = {
    props: ["tags"],
    template : "#preview-tags",
};

const info = {
    props : ["currentWork"],
    template : "#preview-info",
    components : {tags},
    computed : {
        tagsArray() {
            return this.currentWork.skills.split(",");
        }
    },
};


new Vue({
    el: "#preview-component",
    template : "#preview-container",
    components : {display, info},
    data() {
        return{
            works: [],
            currentIndex: 0,
        };
    },
    computed: {
        currentWork() {
            return this.works[this.currentIndex];
        },
        currentSlideData() {
            return  this.works[this.currentIndex];

        },
    },
    //watch: {
    //    currentIndex(value) {
    //        this.makeInfiniteLoopForNdx(value);
    //    },
    //},
    methods: {
        makeInfiniteLoopForNdx(index) {
            const worksNumber = this.works.lenght - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        },
        requireImagesToArra(data){
            return data.map(item=> {
                const requiredImage = require(`../images/content/${item.photo}`).default;
                item.photo = requiredImage;
                return item
            });
        },
        slide(direction){
            const lastslide = this.works.length - 1;
            const lastsItem = this.works[this.works.length - 1];
            const firstslide = 0;
            
            switch(direction){
                case "next" : 
                    //this.currentIndex++
                    this.works.push(this.works[0]);
                    this.works.shift();
                    break;
                case "prev" : 
                    //this.currentIndex--
                    this.works.unshift(lastsItem);
                    this.works.pop();    
                    break;
            }
            if (this.currentIndex  > lastslide) {
                this.currentIndex = firstslide             
            }  
            if (this.currentIndex  < firstslide) {
                this.currentIndex = lastslide             
            }  
        },
    },
    created(){
        const data = require("../data/works.json");
        this.works = this.requireImagesToArra(data);
        //this.currentWork = this.works[this.currentIndex];
    },
});