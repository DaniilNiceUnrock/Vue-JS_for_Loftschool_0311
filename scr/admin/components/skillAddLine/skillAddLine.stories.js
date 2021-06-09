import skillAddLine from "./skillAddLine.vue";

export default {
  title: "skillAddLine",
  component: skillAddLine,
};

export const defaultView = () => ({
  components: { skillAddLine },
  template: `
    <skillAddLine>
      
    </skillAddLine>
  `,
});