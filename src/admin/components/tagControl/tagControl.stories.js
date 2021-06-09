import tagControl from "./tagControl.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onClick: action("onClick"),
  onRemove: action("onRemove")
}

export default {
  title: "tag-control",
  components: {tagControl}
}

export const controlView = () => ({
  components: { tagControl },
  template: `
    <tagControl 
      title="tagControl" 
      @click="onRemove"
    />
  `,
  methods
});

controlView.story = {
  name: "С контролом",
  parameters: {
    backgrounds: [
      { name: 'grey', value: '#8395a7', default: true },
    ],
  },
};

export const defaultView = () => ({
  components: { tagControl },
  template: `
    <tagControl 
      title="tagControl" 
    />
  `,
  methods
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [
      { name: 'grey', value: '#8395a7', default: true },
    ],
  },
};