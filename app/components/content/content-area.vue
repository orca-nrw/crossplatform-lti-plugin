<template>
  <div
    class="
      orca-lti-content-area
      d-flex
      flex-column
      align-self-stretch align-content-start
      flex-fill
      ps-2
      pe-4
    "
    tabindex="-1"
  >
    <contentitem
      v-for="item in content"
      :navItems="findAllSubCategoryRec(item.category, [])"
      :key="item.toolid"
      :item="item"
      @add="add"
      @update:navigation="navigationChange"
    ></contentitem>
    <template v-if="!hasResults && searchString">
      <div class="orca-no-content-found" tabindex="0">
        {{$t(LOCALIZATION_KEYS.SEARCH_NO_CONTENT_FOUND)}} "{{searchString}}".
      </div>
    </template>
    <template v-if="!hasResults && !searchString">
      <div class="orca-no-content-found" tabindex="0">
        {{$t(LOCALIZATION_KEYS.NO_SEARCH_NO_CONTENT_FOUND)}}
      </div>
    </template>
    
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import contentitem from "@/app/components/content/content-item.vue";

import LOCALIZATION_KEYS from "@/app/localization/localization-keys";

const initialItem = {
  name: null,
  url: null,
  description: null,
  category: null,
  toolid: null,
  resourcekey: null,
};

const emit = defineEmits(["update:item", "add","update:navigation"]);

const props = defineProps({
  content: Array,
  categories: Array,
  searchString: String,
});

const add = (item) => {
  emit("add", item);
};

const navigationChange = (item, navItems) => {
 emit("update:navigation", item, navItems);
}

const findAllSubCategoryRec = (catId, subCategories = []) => {
  let resCategories = [...subCategories];
  let foundCategory = props.categories.find((c) => c.id == catId);

  if (foundCategory?.parentCategory) {
    let subCategories = findAllSubCategoryRec(
      foundCategory.parentCategory,
      resCategories
    );
    resCategories.push(...subCategories);
  }
  resCategories.push(foundCategory);
  return resCategories;
};

const hasResults = computed(() => {
  return props.content && props.content.length > 0;
});
const noResults = computed(() => {
  if (props.searchString === "") {
    return "";
  } else {
      return props.searchString;
  }
});
</script>

<style lang="scss">
.orca-lti-content-area {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  .modal-side {
    border: 1px solid $color-orca-blue;
    border-radius: 0.25rem;
  }

  .orca-lti-content-item {
    + .orca-lti-content-item {
      margin-top: 15px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
  .orca-no-content-found {
    margin:0 2.5rem 0 1.8rem;
  }
}
</style>
