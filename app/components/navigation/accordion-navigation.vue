<template>
  <ul class="orcalti-list-group">
    <template v-for="item of navItems" :key="item.id">
      <template v-if="hasChilds(item)">

        <li tabindex="0" @click.prevent="select(item, level)" @keyup.enter="select(item, level)" :class="{ collapsed: !isSelected(item), active : isActive(item)  }"
          :style="navItemLevelStyle" class="nav-item" :id="`accordion-header-${item.id}`" role="button"
          :aria-expanded="isSelected(item) ? true : false" :aria-controls="`accordion-body-${item.id}`">
          <div class="pe-5 position-relative" aria-label="Oberkategorie">
            {{ item.name }}
            <div v-if="hasChilds(item)" v-html="getSVG(item)" class="up-down-arrow"></div>
          </div>
        </li>
        <li class="ps-0" v-show="isSelected(item)" :class="{ show: isSelected(item) }"
          :aria-labelledby="`accordion-header-${item.id}`" :id="`accordion-body-${item.id}`">
          <template v-if="isSelected(item)">
            <accordion-navigation v-if="item.children" :navItems="item.children" :selected="selected" :level="level + 1"
              @update:select="select" />
          </template>
        </li>
      </template>
      <template v-else>
        <li role="button" tabindex="0" @click.prevent="select(item, level)" @keyup.enter="select(item, level)" class="nav-item"
          :class="{ active: isSelected(item) }" :style="navItemLevelStyle">
          {{ item.name }}
        </li>
      </template>
    </template>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import accordionNavigation from "@/app/components/navigation/accordion-navigation.vue";
import up from "@/img/up.svg";
import down from "@/img/down.svg";

const emit = defineEmits(["update:select"]);

const props = defineProps({
  navItems: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Array,
    required: false,
    default: () => [],
  },
  level: {
    type: Number,
    default: () => 0,
  },
});

const select = (route, level) => {
  emit("update:select", route, level);
};
const isSelected = (item) => {
  if (
    !props.selected ||
    !props.selected.length ||
    !props.selected.some((char) => char.id === item.id)
  ) {
    return false;
  }
  return props.selected[props.level]?.id === item.id;
};

const isActive = (item) => {
   if (
    !props.selected ||
    !props.selected.length ||
    !props.selected.some((char) => char.id === item.id)
  ) {
    return false;
  }

  return props.selected?.[props?.selected?.length -1]?.id === item.id;
}

const hasChilds = (item) => {
  return item?.children?.length > 0;
};

const getSVG = (item) => {
  return isSelected(item) ? up : down;
};

const navItemLevelStyle = computed((item) => {
  return `padding-left: ${props.level * 2 + 1}rem`;
});
</script>

<style lang="scss">
.fa-caret-down {
  float: right;
  padding-right: 8px;
}

.up-down-arrow {
  text-align: right;
  position: absolute;
  top: 0;
  right: 1.5rem;
  transform: translateX(50%);

}

.orcalti-list-group {
  padding-left: 0rem;

  .nav-item {
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0);

    &[role="button"] {
      &:focus {
        box-shadow: none;
      }
    }

    &:focus-visible {
      border: 1px solid $color-orca-red;
      outline: 0;
    }

    &:hover {
      background: $color-orca-background-focus;
      color: $color-white;
    }

    &.active {
      background: $color-orca-background-focus;
      color: $color-white;
      font-weight: bold;
    }
  }
}
</style>
