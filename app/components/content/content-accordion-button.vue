<template>
  <div class="accordion accordion-flush">
    <div
      class="accordion-item"
      :class="{ 'accordion-active': accordionActive }"
    >
      <h2 class="accordion-header">
        <slot name="header"></slot>
      </h2>
      <div
        class="accordion-collapse"
        :class="{ collapse: !accordionActive }"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  accordionActive: {
    type: Boolean,
    default: () => false,
  },
});

</script>

<style></style>
