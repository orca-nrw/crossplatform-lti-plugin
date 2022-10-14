<template>
  <div class="orca-lti-content-item ">
    <div class="row flex-row">
      <div class=" flex-column col-12">
        <h4 tabindex="0">{{ item.name }}</h4>
        <breadcrumb :disableBreadcrumbText="true" :fullLinked="true" :lastLinked="true" :navItems="navItems"
          @update:navigation="navigationChange"></breadcrumb>
        <div class="slide-up-container d-flex">
          <Transition name="slide-up">
            <div>
              <div class="line-clamp my-2" v-show="!detailsActive" :aria-hidden="detailsActive" ref="el" tabindex="0">
                {{ item.description }}
              </div>
              <div v-show="detailsActive" :aria-hidden="!detailsActive" tabindex="0">
                {{ item.description }}
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="col-12">
        <div class="d-sm-flex row flex-row justify-content-between align-items-center">
          <div class="col-12 col-sm-8">
            <a v-if="detailsEnabled" @click.prevent="showDetails" href="#" class="orca-toggle-details" role="button"
              tabindex="-1">
              {{
                  detailsActive
                    ? $t(LOCALIZATION_KEYS.COLLAPSE_DESCRIPTION)
                    : $t(LOCALIZATION_KEYS.EXPAND_DESCRIPTION)
              }}
              <div v-html="getSVG" class="orca-details-arrow"></div>
            </a>
          </div>
          <div class="col-12 col-sm-4 d-flex justify-content-end orca-select-button">
            <button @click.prevent="add()" class="btn btn-secondary" role="button" tabindex="0" :aria-label="item.name + ' einfügen. Schließt Modal.'"> <!-- todo -->
              {{ $t(LOCALIZATION_KEYS.BUTTON_SELECT) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, ref } from "vue";

import breadcrumb from "@/app/components/navigation/breadcrumb.vue";
import LOCALIZATION_KEYS from "@/app/localization/localization-keys";
import up from "@/img/up.svg";
import down from "@/img/down.svg";

const emit = defineEmits(["add", "update:select"]);

const props = defineProps({
  item: Object,
  navItems: Array,
});

const initialItem = {
  name: null,
  url: null,
  description: null,
  category: null,
  toolid: null,
  resourcekey: null,
};

const el = ref();
const textClamp = ref(false);
const selectedItem = reactive({ ...initialItem });

onMounted(() => {
  textClamp.value = checkForTextClamp();
});

const showDetails = () => {
  if (props.item?.toolid === selectedItem?.toolid) {
    Object.assign(selectedItem, { ...initialItem });
  } else {
    Object.assign(selectedItem, { ...props.item });
  }
};

const checkForTextClamp = () => {
  return el?.value && el.value.scrollHeight > el.value.clientHeight;
};
const add = () => {
  emit("add", props.item);
};
const navigationChange = (item, navItems) => {
  emit("update:navigation", item, navItems);
};

const getSVG = computed(() => {
  return detailsActive.value ? up : down;
});

const detailsActive = computed(() => {
  return props.item?.toolid === selectedItem?.toolid;
});

const detailsEnabled = computed(() => {
  let res = props.item?.description?.trim();
  textClamp.value = checkForTextClamp();

  return res && textClamp.value;
});
</script>

<style lang="scss">
.orca-lti-content-item {
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, .15);


  //margin: 0 2.5rem 0 1.8rem;


  h4 {
    font-weight: bold;
    font-stretch: normal;
    line-height: 1.35;
  }
}

.content-item-actions {
  /* unused(?) */

  .btn {
    +.btn {
      margin-left: 15px;
    }
  }
}

.slide-up-container {
  overflow: hidden;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-in;
}

.slide-up-enter-from {
  transform: translateY(-100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.31;
}

.orca-toggle-details {
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: left;
  text-decoration: underline;
  color: $color-orca-red;
  display: inline-block;
  margin: 0.8rem 0;
  padding: 0.2rem 0;
  border: 1px solid rgba(255, 255, 255, 0);

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

  .orca-details-arrow {
    display: inline-block;
  }
}

.orca-select-button {
  padding: 1rem 0;

  .btn {
    &:focus-visible {
      background-color: $color-orca-tomato-red;
      border: 1px solid $color-orca-red;
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.4);
    }
    &:hover {
      background-color: $color-orca-tomato-red;
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.4);
    }
    &:active {
      box-shadow: none!important;
    }
  }
}
</style>
