<template>
  <Transition name="fade" mode="out-in" appear>
    <div class="modal-fullscreen" role="dialog" :aria-describedby="$t(LOCALIZATION_KEYS.MODAL_FULLSCREEN_DESCRIPTION)">
      <div class="container">

        <div ref="content" class="modal-content shadow rounded">
          <span class="orca-close-modal" @click="$emit('close')"></span>
          <slot name="content"></slot>
          <div v-if="showControls" class="modal-controls">
            <slot name="controls"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, useSlots } from "vue";
import LOCALIZATION_KEYS from "@/app/localization/localization-keys";

const emit = defineEmits(["close"]);

const content = ref(null);

onMounted(() => {
  document.addEventListener("keyup", handleKeyInput);
  document.addEventListener("mousedown", toggleFade);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyInput);
  document.removeEventListener("mousedown", toggleFade);
});

const handleKeyInput = (e) => {
  let keyCode = e.keyCode;

  if (keyCode === 27) {
    close();
  }
};

const toggleFade = (e) => {
  let el = content.value;
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
.modal-fullscreen {
  .container {
    position: relative;

    .orca-close-modal {
      cursor: pointer;
      z-index: 4;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);

      @include media-breakpoint-down(lg) {
        transform: translate(0, 0);
      }

      &::before {
        content: url(../../../img/times.png);

      }
    }
  }

  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  &::before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0.75;
    background-color: $color-orca-blue;
    content: "";
  }

  .modal-content {
    display: flex;
    flex: 0 1 auto;
    z-index: 3;
    opacity: 1;
    height: auto;
    width: auto;
    background-color: $color-white;
    border: none;
    border-radius: 0.25rem;
    min-height: 75vh;
    max-height: 75vh;

    .modal-controls {
      margin-top: 1rem;
    }
  }
}
</style>