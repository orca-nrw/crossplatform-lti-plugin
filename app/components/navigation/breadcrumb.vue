<template>
  <nav class="d-flex align-items-center breadcrumb-nav" aria-label="breadcrumb">
    <div v-if="!disableBreadcrumbText" class="align-items-center me-2 breadcrumb-text" tabindex="0">
      {{ $t(breadcrumbText) }}
    </div>
    <ol class="breadcrumb m-0">
      <li v-for="(item, index) in navItems" :key="item?.id" class="breadcrumb-item align-items-center"
        :aria-current="!linkedItem(index) ? 'page' : false">
        <template v-if="linkedItem(index)">
          <a v-if="item && !fullLinked" @click.prevent="selected(item, index)" role="button" tabindex="0">
            {{ item.name }}
          </a>
          <a v-if="item && fullLinked" @click.prevent="navigationChange(item)" role="button" tabindex="0">
            {{ item.name }}
          </a>
        </template>
        <template v-else>
          <span tabindex="0">{{ item.name }}</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import LOCALIZATION_KEYS from "@/app/localization/localization-keys";
const emit = defineEmits(["update:select", "update:navigation"]);
const props = defineProps({
  navItems: {
    type: Array,
    default: () => [],
  },
  disableBreadcrumbText: {
    type: Boolean,
    default: () => false
  },
  lastLinked: {
    type: Boolean,
    default: () => false
  },
  fullLinked: {
    type: Boolean,
    default: () => false,
  }
});

const linkedItem = (index) => {
  if (props.lastLinked) {
    return true;
  }
  return !(index === props.navItems.length - 1);
};

const selected = (item, index) => {
  emit("update:select", item, index);
};

const navigationChange = (item) => {

  let spliceIndex = props.navItems.findIndex((n) => n.id == item.id)
  let splicedNav = [...props.navItems]
  splicedNav.splice(spliceIndex + 1, splicedNav.length)
  emit("update:navigation", item, splicedNav);
};

const checkNavItemlength = computed(() => {
  return (props.navItems?.length);
});

const breadcrumbText = computed(() => {
  if (props.navItems?.length) {
    return LOCALIZATION_KEYS.SEARCHING_IN_CATEGORY;
  } else {
    return LOCALIZATION_KEYS.SEARCHING_IN_ALL_CATEGORIES;
  }
});
</script>

<style lang="scss">
.breadcrumb-nav {
  line-height: 1.31;

  @include media-breakpoint-down(sm) {
    flex-wrap: wrap;

    .breadcrumb-text {
      width: 100%;
    }
  }

  .breadcrumb {
    @include media-breakpoint-down(md) {
      border: none;
    }

    .breadcrumb-item {
      a {
        text-decoration: underline;
        border: 1px solid rgba(255,255,255,0);

        &:focus-within {
          background-color: $color-orca-lavender-blue;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>