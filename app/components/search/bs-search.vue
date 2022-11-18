<template>
  <div class="input-group orca-content-search">
    <span :style="{backgroundImage: `url(${loadAssetByURL(require('@/img/magnifier.png'))})`}"></span>
    <input :placeholder="$t(LOCALIZATION_KEYS.INPUT_SEARCH_PLACEHOLDER)" type="text" autocomplete="off"
      class="form-control orca-search-input" :id="$t(LOCALIZATION_KEYS.INPUT_SEARCH_ID)"
      :aria-label="$t(LOCALIZATION_KEYS.INPUT_SEARCH_PLACEHOLDER)" v-model="searchString" @keypress.enter.prevent />
  </div>
</template>

<script setup>
import { computed } from "vue";
import LOCALIZATION_KEYS from "@/app/localization/localization-keys";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const searchString = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss">
.orca-content-search {
  position: relative;

  span {
    display: block;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }

  .orca-search-input {
    border: solid 1px #5c5c5c;
    border-radius: 100px !important;
    font-size: 1.245rem;
    line-height: 1.33;
    padding-left: 45px;
  }
}
</style>