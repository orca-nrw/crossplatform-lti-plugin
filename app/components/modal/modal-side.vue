<template>
  <Transition name="slide-in-right" mode="out-in" appear>
    <div class="modal-side" ref="$root">
      <div class="modal-side-content">
        <slot name="content"></slot>
      </div>
      <div v-if="showControls" class="modal-controls">
        <slot name="controls"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed, useSlots } from "vue";

const emit = defineEmits(["close"]);

const $root = ref(null);

onMounted(() => {
  document.addEventListener("keyup", handleKeyInput);
  document.addEventListener("mousedown", toggleSlideout);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyInput);
  document.removeEventListener("mousedown", toggleSlideout);
});

const handleKeyInput = (e) => {
  let keyCode = e.keyCode;

  if (keyCode === 27) {
    close();
  }
};
const toggleSlideout = (e) => {
  let el = $root.value;
  let target = e.target;
  el !== target && !el.contains(target) ? close() : null;
};

const close = () => {
  emit("close");
};

const showControls = computed(() => {
  const slots = useSlots();

  return !!slots["controls"];
});
</script>

<style lang="scss">
.modal-side {
  height: 100%;
  max-height: 100%;
  width: 75%;
  max-width: 75%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 99;
  background-color: $color-orca-grey;
  color: $color-orca-blue;

  .modal-side-content {
    flex: 1 1 auto;
    border-radius: 0;
    background-color: transparent;
    padding: 15px;
  }

  .modal-controls {
    padding: 15px;
  }
}

.slide-in-right-leave-active,
.slide-in-right-enter-active {
  transition: 0.75s ease;
}

.slide-in-right-enter {
  transform: translate(100%, 0);
}

.slide-in-right-leave-to {
  transform: translate(100%, 0);
}

.slide-in-bottom-leave-active,
.slide-in-bottom-enter-active {
  transition: 0.5s ease;
}

.slide-in-bottom-enter {
  transform: translate(0, 100%);
}

.slide-in-bottom-leave-to {
  transform: translate(0, 100%);
}
</style>
