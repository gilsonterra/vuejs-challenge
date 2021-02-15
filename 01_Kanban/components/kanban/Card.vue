<template>
  <div class="card">
    <div class="flex justify-between">
      <div class="font-bold text-gray-700 flex justify-between">
        <span class="w-full">#{{ value.id }} </span>
        <small class="uui-text">{{ value._uui }}</small>
      </div>
      <button class="button-remove-card" @click="$emit('remove-card', value)">
        <icon-trash />
      </button>
    </div>
    <textarea :value="value.text" class="w-full" @change="inputText" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { iCard } from '@/components/interfaces'
import IconTrash from '@/components/icons/IconTrash.vue'

export default defineComponent({
  components: { IconTrash },
  props: {
    value: {
      type: Object as () => iCard,
      default: {},
    },
  },
  methods: {
    inputText(event: Event) {
      const text = (event.target as HTMLTextAreaElement).value
      const newCard = { ...this.$props.value, text }
      this.$emit('input', newCard)
    },
  },
})
</script>

<style scoped>
.card {
  @apply bg-white shadow rounded p-3 border border-white;
}

.card-text {
  @apply text-gray-700 w-full font-semibold font-sans tracking-wide text-sm;
}

.uui-text {
  @apply text-gray-400 text-xs p-1 ml-1;
}
</style>
