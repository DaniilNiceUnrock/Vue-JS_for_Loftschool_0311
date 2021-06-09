<template>
  <nav class="navigation-content">
    <div class="container">
      <ul class="list">
        <li 
          v-for="link in links" 
          :class="['item', {active: link.active}]"
          :key="link.id"> 
          <!--<router-link :to="`/${link.alias}`" class="link">{{link.title}}</router-link> -->
          <link1 @click="changePage(link.alias, link.id)" class="link"> {{link.title}}  </link1>
        </li>
      </ul>
    </div> 
  </nav>
</template>

<script>

const links = [
    {id: 0, title: "Обо мне", alias: "", active: true },
    {id: 1, title: "Работы", alias: "works", active: false, },
    {id: 2, title: "Отзывы", alias: "reviews", active: false}
  ];

export default {
  data() {
    return {
      links
    };
  },
  methods: {
    changePage(way, id){
      this.setActiveTab(id);
      this.$router.push(`/${way}`);
    },
    setActiveTab(id) {
      this.links = this.links.map(item=>{
        if (item.id === id) {
          item.active = true;
        }
        else {
          item.active = false;
        }
        return item;
      });
    },
  },
};

</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>