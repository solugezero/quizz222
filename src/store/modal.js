export const useModalStore = defineStore("modal", {
  state: () => ({
    active: false,
    component: undefined,
    props: undefined,
  }),
  actions: {
    open(component, props) {
      this.component = component;
      this.props = props;
      this.active = true;
    },
    close() {
      this.active = false;
      this.component = undefined;
      this.props = undefined;
    },
  },
  getters: {},
});
