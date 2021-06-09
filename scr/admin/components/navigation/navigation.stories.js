import navigation from "./navigation.vue";

export default {
  title: "navigation",
  component: navigation,
};

export const defaultView = () => ({
  components: { navigation },
  template: `
    <navigation>
      
    </navigation>
  `,
});