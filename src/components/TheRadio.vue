<template>
  <span>
    <label>
      <input
        type="radio"
        :checked="shouldBeChecked"
        :value="value"
        @change="updateInput"
      />
      <span v-if="!hideLabel">{{ label }}</span>
    </label>
    <div class="subs" v-if="showSlot">
      <slot name="subcomponent"></slot>
    </div>
  </span>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: "",
    },
    label: {
      type: String,
    },
    subcomponent: {
      type: Object,
    },
    labelOut: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value;
    },
    showSlot() {
      return !!this.$slots.subcomponent && this.shouldBeChecked;
    },
    hideLabel() {
      return this.labelOut && this.shouldBeChecked;
    },
  },
  methods: {
    updateInput() {
      this.$emit("change", this.value);
    },
  },
};
</script>

<style scoped>
label {
  cursor: pointer;
}
.subs {
  margin-left: 1.5em;
}
input[type="radio"],
label {
  padding: 2px 5px;
}
</style>
