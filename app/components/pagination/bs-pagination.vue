<template>
  <nav class="navigation" :aria-label="$t(LOCALIZATION_KEYS.PAGINATION_LABEL)">
    <ul class="pagination m-0">
      <li class="page-item page-items-controls" v-if="showPrev">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(page - 1)"
          :aria-label="$t(LOCALIZATION_KEYS.PAGINATION_PREV)"
        >
          <span aria-hidden="true"
            >&lt;&lt;
            <span class="d-none d-md-inline">{{
              $t(LOCALIZATION_KEYS.PAGINATION_PREV)
            }}</span></span
          >
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: index === page, disabled: index === null }"
        v-for="index in shownPagination"
        @click.prevent="index === null ? null : changePage(index)"
        :key="index"
      >
        <div class="page-link disabled" v-if="index === null">…</div>
        <a v-else href="#" class="page-link"> {{ index }}</a>
      </li>
      <li class="page-item page-items-controls" v-if="showNext">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(page + 1)"
          :aria-label="$t(LOCALIZATION_KEYS.PAGINATION_NEXT)"
        >
          <span aria-hidden="true">
            <span class="d-none d-md-inline"
              >{{ $t(LOCALIZATION_KEYS.PAGINATION_NEXT) }}
            </span>
            &gt;&gt;</span
          >
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import LOCALIZATION_KEYS from "@/app/localization/localization-keys";

const emit = defineEmits(["update:change"]);

const props = defineProps({
  page: {
    type: Number,
    default: () => 1,
  },
  pages: {
    type: Number,
    default: () => 1,
  },
  maximumPagesToShow: {
    type: Number,
    default: () => 4,
  },
});

const changePage = (val) => {
  emit("update:change", val);
  const elements = document.getElementsByClassName("orca-lti-content-item");
  var eltewt;
  if (elements && elements != null && elements != undefined) {
    eltewt = elements[0];
  }
  if (eltewt) {
    eltewt.scrollIntoView();
  }
};

const getPageItemClass = (index) => {
  return `active:${index === page}; disabled:${index === null}`;
};

const showPrev = computed(() => {
  return props.page > 1;
});

const showNext = computed(() => {
  return props.page < props.pages;
});

const shownPagination = computed(() => {
  let paginationArray = [];
  let tempMaxPosPages = maximumPossiblePages.value;

  if (tempMaxPosPages === 1) {
    paginationArray = [];
  } else if (tempMaxPosPages === 2) {
    paginationArray = [1];
    paginationArray.push(props.pages);
  } else {
    paginationArray = [1, props.pages];
    let remainingPositions = tempMaxPosPages - 2;

    if (!paginationArray.includes(props.page)) {
      paginationArray.push(props.page);
      remainingPositions--;
    }

    let tempIndex = 1;
    let subIndex = true;

    while (remainingPositions > 0) {
      if (subIndex) {
        let newPageIndex = props.page - tempIndex;
        if (newPageIndex > 1) {
          paginationArray.push(newPageIndex);
          remainingPositions--;
        }
        subIndex = false;
      } else {
        let newPageIndex = props.page + tempIndex;
        if (newPageIndex < props.pages) {
          paginationArray.push(newPageIndex);
          remainingPositions--;
        }
        tempIndex++;
        subIndex = true;
      }

      if (props.page - tempIndex < 1 && props.page + tempIndex > props.pages) {
        remainingPositions = 0;
      }
    }
  }
  let sortedPagination = paginationArray.sort(function (a, b) {
    return a - b;
  });

  if (
    sortedPagination.length > 4 &&
    sortedPagination[4] - sortedPagination[3] > 1
  ) {
    sortedPagination.splice(4, 0, null);
  }
  return sortedPagination;
});

const maximumPossiblePages = computed(() => {
  return props.maximumPagesToShow < props.pages
    ? props.maximumPagesToShow
    : props.pages;
});
</script>

<style lang="scss">
@media only screen and (max-height: 300px) and (max-width: 400px) {
  .navigation {
    font-size: 6px;
  }
  .orca-search-breadcrumbs {
    margin: 0px !important;
    font-size: 6px !important;
  }
  form {
    margin-bottom: 0px !important;
  }
  .orca-lti-content-item h4 {
    font-size: 8px !important;
  }
  .breadcrumb-nav .breadcrumb .breadcrumb-item a {
    font-size: 6px;
  }
  .orca-nav-bar h3{
    font-size: 8px;
  }
  #incremental_search_courses {
    font-size: 6px;
  }
  .line-clamp.my-2.text-break {
    font-size: 6px;
  }
  .orca-toggle-details {
    font-size: 6px;
  }
  .orca-select-button .btn {
    font-size: 6px !important;
    width: 100%;
    height: inherit !important;
  }
  .breadcrumb-item + .breadcrumb-item:before {
    font-size: 6px;
  }
}
.pagination {
  @include media-breakpoint-down(md) {
    flex-wrap: wrap;
    justify-content: space-around;
  }

  padding: 0.7rem 0;

  .page-item {
    .page-link {
      border-radius: 100px;
      padding: 1px 7px;
      margin: 0 0.5rem 0 0;
      border-color: $color-white;
      color: $color-orca-red;

      &.disabled {
        border-color: $color-white;
      }

      &:focus-visible {
        box-shadow: none;
        background-color: $color-orca-tomato-red;
        border-color: $color-orca-red;
        color: $color-white;
      }
    }

    &.active {
      .page-link {
        font-weight: bold;
        background-color: $color-orca-red;
        border-color: $color-orca-red;
        color: $color-white;
        box-shadow: none;

        &:focus-visible {
          background-color: $color-orca-tomato-red;
        }
      }
    }

    &:first-child,
    &:last-child {
      .page-link {
        border-radius: 100px;
        box-shadow: none;
      }
    }
  }
}
</style>
