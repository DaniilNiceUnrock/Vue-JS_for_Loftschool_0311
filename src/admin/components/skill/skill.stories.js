import skill from "./skill.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onApprove: action("onApprove"),
  onRemove: action("onRemove")
}

export default {
  title: "skill",
  component: skill,
};

export const defaultView = () => ({
  components: { skill },
  data() {
    return {
      skill: {
        id: 0,
        title: "Test",
        percent: 80
      }
     
    }
  },
  template: `
    <skill @approve="onApprove" @remove="onRemove" :skill="skill"/>

  `,
  methods
});