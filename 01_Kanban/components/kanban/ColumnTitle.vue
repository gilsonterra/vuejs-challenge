<template>
  <div class="flex justify-between">
    <label class="column-title">
      <input :value="value" class="title" type="text" @change="updateTitle" />
    </label>
    <div>
      <button
        class="button-add-card"
        title="Adicionar Card"
        @click="$emit('add-card')"
      >
        <icon-add />
      </button>
      <button
        class="button-sort-cards"
        title="Ordenar Cards"
        @click="sortCards"
      >
        <icon-down v-if="isSortDesc" />
        <icon-up v-else />
      </button>
      <button
        class="button-remove-column"
        title="Remover Coluna"
        @click="$emit('remove-column')"
      >
        <icon-trash />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconUp from '@/components/icons/IconUp.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { SORT } from '@/components/constants'

export default defineComponent({
  components: {
    IconAdd,
    IconDown,
    IconUp,
    IconTrash,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sort: SORT.DESC,
    }
  },
  computed: {
    isSortDesc(): boolean {
      return this.sort === SORT.DESC
    },
  },
  methods: {
    updateTitle(event: Event) {
      const value = (event.target as HTMLInputElement).value
      this.$emit('input', value)
    },

    sortCards() {
      this.sort = this.sort === SORT.DESC ? SORT.UP : SORT.DESC
      this.$emit('sort-cards', this.sort)
    },
  },
})
</script>

<style scoped>
.column-title {
  @apply text-gray-700 font-semibold font-sans tracking-wide text-sm w-1/2;
}

.title {
  @apply block text-sm bg-transparent w-full font-medium;
}
</style>
