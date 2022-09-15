<template>
  <div
    :class="showClass"
    class="modal"
    tabindex="-1"
    role="dialog"
    v-show="show"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button
            @click.prevent="dismiss"
            type="button"
            class="btn btn-primary"
          >
            Save changes
          </button>
          <button
            @click.prevent="dismiss"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    show: Boolean,
  },
  setup(props, { emit }) {
    const showClass = computed(() => {
      return {
        show: props.show,
      };
    });

    const dismiss = async () => {
      emit("close");
    };

    return { showClass, dismiss };
  },
};
</script>

<style></style>
