<template>
    <div class="tags-adder-component">
        <app-input title="Добавление тега" v-model="currentTags"  />
        <ul class="tags">
            <li class="tag" v-for="(tag,  index) in tagsArray" :key="`${tag}${index}`"  :v-if="tag.trim()">
                <tag @click="removeTag(tag)" interractive :title="tag"/>
            </li>
        </ul>
    </div>
</template>


<script>
import appInput from "../input";
import tag from "../tag";

export default {
    components: {
        appInput,
        tag,
    },
    data() {
        return {
            currentTags: "One, Two, three"
        }
    },
    computed: { 
        tagsArray() {
            return this.currentTags.trim().split(',');  
        }
    },
    methods: {
        removeTag(tag) {
            const tags = [...this.tagsArray];
            const tagNdx = tags.indexOf(tag);

            if(tagNdx < 0 ) return;
            tags.splice(tagNdx, 1);
            this.cirrentTags  = tags.join(", ");
        } 
    }
};
</script>


<style scoped  lang="postcss" src="./tagsAdder.pcss"></style>