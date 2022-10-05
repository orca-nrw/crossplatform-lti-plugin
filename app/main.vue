<template>
  <div class="orcalti orca-ci">
    {{ selectedItem.name }}
    <button v-show="!error" @click.prevent="toggleModal" class="btn btn-primary" type="button" :tabindex="showModal ? -1 : 0">
      {{ $t(LOCALIZATION_KEYS.BUTTON_SELECT) }}
    </button>
    <div v-show="error">
      {{ $t(LOCALIZATION_KEYS.ERROR) }} ( {{ error }} )
    </div>
    <modal-fullscreen @close="toggleModal" v-if="showModal && !error">
      <template v-slot:content>
        <div class="d-flex flex-fill  mh-100">
          <div class="row flex-fill mh-100">
            <div class="col-xl-3 col-lg-4 col-2 d-flex flex-column flex-fill mh-100">
              <div class="orca-nav-bar d-flex flex-column flex-fill mh-100" :class="{ 'flyout-active': showFlyout }">
                <a class="d-lg-none orca-nav-bar-menu mt-4" @click.prevent="showFlyout = !showFlyout">
                  <div class="d-flex flex-column align-items-center p-2">
                    <img class="img-fluid w-50" src="@/img/navigation-menu-horizontal.png" />
                    {{ $t(LOCALIZATION_KEYS.OPEN_CATEGORY_MENU) }}
                  </div>
                </a>
                <div class="orca-nav-bar-flyout flex-column flex-fill mh-100">
                  <div class="d-flex flex-column ps-3 pe-3 pb-2 pt-4 orca-logo-container">
                    <div class="pe-5 position-relative">
                      <a :href="$t(LOCALIZATION_KEYS.WEBSITE_URL_ORCA)" target="_blank"
                        :title="$t(LOCALIZATION_KEYS.ORCA_LINK_TITLE)" class="orca-logo w-50">
                        <img class="img-fluid" :alt="$t(LOCALIZATION_KEYS.ORCA_LOGO_ALT)" src="@/img/orca_logo.png" />
                      </a>
                      <a v-if="showFlyout" @click.prevent="showFlyout = !showFlyout" type="button"
                        class="orca-close-categories d-lg-none">
                        <img src="@/img/close_btn.png" />
                      </a>
                    </div>
                  </div>
                  <div class="d-flex ps-3 py-3">
                    <h3>{{ $t(LOCALIZATION_KEYS.CATEGORIES) }}</h3>
                  </div>
                  <nav class="d-flex flex-column flex-fill orca-overflow-accordion mn-3" tabindex="-1">
                    <accordion-navigation :navItems="preparedOrcaCategories" :selected="selected" :level="0"
                      @update:select="select"></accordion-navigation>
                  </nav>
                  <div class="d-flex flex-column ps-3 py-4">
                    <div class="orca-contact">
                      {{ $t(LOCALIZATION_KEYS.CONTACT) }}:
                      <a :href="`mailto: ${$t(
                        LOCALIZATION_KEYS.EMAIL_ADDRESS_ORCA
                      )}`" :title="$t(LOCALIZATION_KEYS.SEND_SUPPORT_REQUEST)">{{
    $t(LOCALIZATION_KEYS.EMAIL_ADDRESS_ORCA)
}}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-9 col-lg-8 col-10 d-flex flex-column flex-fill mh-100 pt-4">
              <div class="pe-5 pe-lg-4 ps-2">
                <form role="search">
                  <div class="d-flex pe-2 pe-md-0">
                    <bs-search :modelValue="searchString" @update:modelValue="changeInput"></bs-search>
                  </div>
                </form>
              </div>
              <div class="pe-4 ps-2">
                <div class="d-flex mt-2">
                  <breadcrumb class="orca-search-breadcrumbs" :navItems="selected" @update:select="select"></breadcrumb>
                </div>
              </div>
              <div class="d-flex flex-column align-items-center flex-fill overflow-hidden">
                <content-area :searchString="searchString" :content="contentToShow" :categories="orcaCategories"
                  @add="changeItem" @update:navigation="navigationChange"></content-area>
              </div>
              <div class="d-flex flex-wrap justify-content-center pe-4 ps-2">
                <bs-pagination v-if="showPagination" :page="page" :pages="pages"
                  :maximumPagesToShow="maximumPagesToShow" @update:change="updatePagination"></bs-pagination>
              </div>
            </div>
          </div>
        </div>
      </template>
    </modal-fullscreen>
  </div>
</template>

<script setup>
import { ref, reactive, inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import modalFullscreen from "@/app/components/modal/modal-fullscreen";
import bsPagination from "@/app/components/pagination/bs-pagination.vue";
import bsSearch from "@/app/components/search/bs-search.vue";
import contentArea from "@/app/components/content/content-area.vue";
import accordionNavigation from "@/app/components/navigation/accordion-navigation.vue";
import breadcrumb from "@/app/components/navigation/breadcrumb.vue";

import LOCALIZATION_KEYS from "@/app/localization/localization-keys";
import updateLMSFormValues from "@/app/utils/update-lms-form-values";

const props = defineProps({
  orcaCategories: {
    type: Array,
    default: () => [],
  },
  preparedOrcaCategories: {
    type: Array,
    default: () => [],
  },
  orcaContent: {
    type: Array,
    default: () => [],
  },
  orcaOptions: {
    type: Object,
    default: () => { },
  },
  itemsPerPage: {
    type: Number,
    default: () => 5,
  },
  maximumPagesToShow: {
    type: Number,
    default: () => 5,
  },
  error: {
    type: String,
    default: () => "",
  }
});

const initialSelectedItem = {
  name: null,
  url: null,
  description: null,
  category: null,
  toolid: null,
};
const initialCategory = {
  id: null,
  name: null,
  description: null,
  parentCategory: null,
};

const page = ref(1);
const showModal = ref(false);
const searchString = ref("");
const selectedCategory = reactive({ ...initialCategory });
const selectedItem = reactive({ ...initialSelectedItem });
const { t } = useI18n();
const selected = ref([]);
const showFlyout = ref(false);

const select = (item, level) => {
  if (selected?.value?.[level]?.id === item.id && !selected.value[level + 1]) {
    selected.value.splice(level);
    if (selected.value[level - 1]) {
      changeCategory(selected.value[level - 1]);
    } else {
      changeCategory({ ...initialCategory });
    }
  } else {
    selected.value[level] = item;
    selected.value.splice(level + 1);
    changeCategory(item);
  }
};

const navigationChange = (item, navItems) => {
  selected.value.splice(0, selected.value.length);
  selected.value.push(...navItems);
  changeCategory(item);
};

const updatePagination = (val) => {
  page.value = val;
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const changeInput = (str) => {
  searchString.value = str;
  page.value = 1;
};

const changeCategory = (category) => {
  Object.assign(selectedCategory, { ...category });
  page.value = 1;
};
const changeItem = (item) => {
  Object.assign(selectedItem, { ...item });
  updateLMSFormValues(
    props.orcaOptions.selected_tool_id_field_name,
    props.orcaOptions.selected_tool_url_field_name,
    props.orcaOptions.selected_tool_toolname_field_name,
    selectedItem
  );
  toggleModal();
};

const getAllChildCategories = (category, categoryIds) => {
  let neededCategoryIds = [...categoryIds];

  if (category?.id) {
    neededCategoryIds.push(category.id);
    if (category?.children?.length > 0) {
      category.children.forEach((element) => {
        neededCategoryIds.push(
          ...getAllChildCategories(element, neededCategoryIds)
        );
      });
    }
  }
  return neededCategoryIds;
};

const categoryContent = computed(() => {
  return selectedCategory.id && selectedCategory.id !== null
    ? props.orcaContent.filter((x) => {
      let allChildCategories = getAllChildCategories(selectedCategory, []);
      return allChildCategories.includes(x.category);
    })
    : props.orcaContent;
});

const contentToShow = computed(() => {
  if (props.itemsPerPage && page.value) {
    let sliceStart = props.itemsPerPage * (page.value - 1);
    let tempFilteredContent = filteredContent.value;
    return tempFilteredContent.slice(
      sliceStart,
      sliceStart + props.itemsPerPage
    );
  } else {
    return [];
  }
});

const filteredContent = computed(() => {
  let content = categoryContent.value;

  return searchString.value !== ""
    ? content.filter((x) =>
      x.name.toLowerCase().includes(searchString.value.toLowerCase())
    )
    : content;
});

const showPagination = computed(() => {
  return page && pages.value && page != pages.value;
});

const pages = computed(() => {
  return props.orcaContent && props.itemsPerPage
    ? Math.ceil(filteredContent.value.length / props.itemsPerPage)
    : 0;
});

const count = computed(() => {
  return filteredContent.value.length;
});
</script>

<style lang="scss">
@import "@/scss/main.scss";

[class^="col-"] {
  position: inherit;
}

.orca-nav-bar {
  border-right: solid 1px $color-orca-border;
  box-shadow: 3px 0 3px -2px $color-orca-border;

  .orca-nav-bar-menu {
    font-size: 0.875rem;
    border: none;
    background-color: $color-orca-grey;
    text-decoration: none;
    cursor: pointer;
  }

  @include media-breakpoint-down(lg) {
    background-color: $color-orca-grey;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  h3 {
    font-weight: bold;
    font-stretch: normal;
    font-size: 1.25rem;
    line-height: 1.35;
  }

  .orca-contact {
    font-weight: bold;
    font-stretch: normal;
    line-height: 1.31;

    a {
      color: $color-orca-red;

      &:focus-visible {
        box-shadow: 0 1px 3px 2px $color-orca-red;
        text-decoration: none;
        border-radius: 1px;
      }

      &:hover {
        background-color: $color-orca-red;
        color: white;
        text-decoration: none;
      }
    }
  }

  .orca-nav-bar-flyout {
    display: flex;

    @include media-breakpoint-down(lg) {
      display: none;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    @include media-breakpoint-down(sm) {
      border-radius: 0.25rem;
    }

  }

  &.flyout-active {
    .orca-nav-bar-flyout {
      @include media-breakpoint-down(lg) {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        max-width: 60%;
        border-right: 1px solid rgba(0, 0, 0, .15);
        box-shadow: 3px 0 3px -2px rgba(0, 0, 0, .15);
        height: 100%;
        z-index: 5;
      }

      @include media-breakpoint-down(sm) {
        max-width: 100%;
      }


      @include media-breakpoint-up(lg) {
        >button {
          display: none;
        }
      }
    }
  }

  &:not(.flyout-active) {
    .orca-nav-bar-flyout {
      >button {
        display: none;
      }
    }
  }
}

.orca-overflow-accordion {
  overflow-x: hidden;
  overflow-y: auto;
}

.orca-logo-container {
  position: relative;

  .orca-logo {
    min-width: 120px;
  }

  .orca-close-categories {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translate(50%, -50%);
  }

  a {
    border: 1px solid rgba(255, 255, 255, 0);
    display: inline-flex;
  }

  a:focus-visible {
    border: 1px solid $color-orca-red;
  }

  margin-bottom: 2.5rem;
  position: relative;
}

.orca-search-breadcrumbs {
  font-size: 0.875rem;
  margin: 0 0 1.75rem 0;
}

.orca-logo-box {
  display: inline-flex;
}

.orca-ci {
  color: $color-orca-blue;

}

* {
  a:focus-visible {
    outline: 0;
  }
}
</style>
