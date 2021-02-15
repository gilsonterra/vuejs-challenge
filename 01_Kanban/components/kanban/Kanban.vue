<template>
  <div class="kanban-container">
    <draggable class="columns-container">
      <div v-for="column in columns" :key="column._uui" class="column">
        <column-title
          :value="column.title"
          @input="(newTitle) => updateColumnTitle(column, newTitle)"
          @remove-column="removeColumn(column)"
          @add-card="addCard(column)"
          @sort-cards="(sort) => sortCards(column, sort)"
        />
        <draggable
          :list="column.cards"
          :animation="200"
          ghost-class="ghost-card"
          group="cards"
          class="cards-container"
        >
          <card
            v-for="card in column.cards"
            :key="card._uui"
            :value="card"
            class="mt-3 cursor-move"
            @input="(newCard) => updateCard(column, newCard)"
            @remove-card="removeCard(column, card)"
          ></card>
        </draggable>
      </div>
    </draggable>
    <div class="actions-container">
      <button class="button-add-column" @click="addColumn">
        Adicionar Coluna
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import draggable from 'vuedraggable'
import Card from '@/components/kanban/Card.vue'
import ColumnTitle from '@/components/kanban/ColumnTitle.vue'
import { iColumn, iCard } from '@/components/interfaces'
import { sortArrayObject } from '@/components/helpers'
import { createColumn, createCard } from '@/components/services'

export default defineComponent({
  name: 'Kanban',
  components: {
    draggable,
    Card,
    ColumnTitle,
  },
  props: {
    value: {
      type: Array as () => iColumn[],
      default: () => [],
    },
  },
  data() {
    return {
      columns: [] as iColumn[],
    }
  },
  watch: {
    value(newColumns) {
      this.columns = newColumns
    },
  },
  mounted() {
    this.columns = this.$props.value
  },
  methods: {
    findIndexColumnByUui(_uui: string): number {
      return this.columns.findIndex((item: iColumn) => item._uui === _uui)
    },

    updateColumnTitle(column: iColumn, newTitle: string) {
      this.$set(this.columns, this.findIndexColumnByUui(column._uui), {
        ...column,
        title: newTitle,
      })
    },

    addColumn() {
      const newColumn = createColumn('Clique aqui')
      this.$set(this.columns, this.columns.length, newColumn)
    },

    removeColumn(column: iColumn) {
      this.$delete(this.columns, this.findIndexColumnByUui(column._uui))
    },

    updateCard(column: iColumn, newCard: iCard) {
      const indexColumn = this.findIndexColumnByUui(column._uui)
      const newColumn = Object.assign({}, this.columns[indexColumn]) as iColumn
      const indexCard = newColumn.cards.findIndex(
        (item: iCard) => item._uui === newCard._uui
      )
      this.$set(newColumn.cards, indexCard, newCard)
    },

    removeCard(column: iColumn, card: iCard) {
      const indexColumn = this.findIndexColumnByUui(column._uui)
      const newColumn = Object.assign({}, this.columns[indexColumn]) as iColumn
      newColumn.cards = newColumn.cards.filter(
        (item: iCard) => item._uui !== card._uui
      )

      this.$set(this.columns, indexColumn, newColumn)
    },

    addCard(column: iColumn) {
      const index = this.findIndexColumnByUui(column._uui)
      const newColumn = Object.assign({}, this.columns[index]) as iColumn
      const newCard = createCard(newColumn.cards.length + 1)
      newColumn.cards.push(newCard)
      this.$set(this.columns, index, newColumn)
    },

    sortCards(column: iColumn, sort: string) {
      const index = this.findIndexColumnByUui(column._uui)
      const newColumn = Object.assign({}, this.columns[index]) as iColumn
      newColumn.cards = sortArrayObject<iCard>(newColumn.cards, sort, 'id')
      this.$set(this.columns, index, newColumn)
    },
  },
})
</script>

<style scoped>
.kanban-container {
  @apply flex h-full mx-2;
}

.columns-container {
  @apply flex items-start	h-screen;
}

.actions-container {
  @apply max-w-xs;
}

.column {
  @apply bg-gray-300 p-2 rounded mr-4;
  min-width: 270px;
  width: 270px;
}

.cards-container {
  @apply max-h-screen overflow-auto p-2;
}

.ghost-card {
  @apply border opacity-50 border-blue-500 bg-gray-200;
}

.button-add-column {
  @apply bg-blue-700 ml-5 h-20 rounded-xl text-white w-32;
  text-transform: uppercase;
}
</style>
