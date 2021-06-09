<template>
  <div class="user-component">
    <avatar size="2.7" :src="userPic" />
    <div class="username">Daniil_Ponomarev</div>
  </div>
</template>
<script>


import avatar from "../avatar";

export default {
  components: {
    avatar
  },
  computed: {
    userPic() {
      return require("../../../images/content/avatar.png").default;
    }
  }
  
}
</script>
<style lang="postcss" scoped src="./user.pcss"></style>