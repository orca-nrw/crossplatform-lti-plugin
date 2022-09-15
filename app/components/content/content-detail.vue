<template>
  <modal-side @close="close">
    <template v-slot:content>
      <div class="orcalti-content-detail">
        <div class="d-flex justify-content-between align-items-start mb-4">
          <h3>{{ item.name }}</h3>
          <input
            type="button"
            @click.prevent="close"
            class="btn btn-outline-primary ms-2"
            value="Schließen"
          />
        </div>
        <div>
          <h4>Beschreibung</h4>
          <div>
            {{ item.description }}
          </div>
        </div>
      </div>
    </template>
  </modal-side>
</template>

<script setup>
import modalSide from "@/app/components/modal/modal-side";
import LOCALIZATION_KEYS from "@/app/localization/localization-keys";

const emit = defineEmits(["close"]);

const props = defineProps({
  item: Object,
});

const close = () => {
  emit("close");
};
</script>

<style lang="scss">
</style>
