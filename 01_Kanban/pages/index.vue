<template>
  <div class="app">
    <navbar />
    <kanban v-model="kanban" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Navbar from '@/components/Navbar.vue'
import Kanban from '@/components/kanban/Kanban.vue'
import { createCard, createColumn } from '@/components/services'
import { iColumn } from '@/components/interfaces'

export default defineComponent({
  components: { Navbar, Kanban },
  data() {
    return {
      kanban: [] as iColumn[],
    }
  },
  mounted() {
    this.kanban = [
      createColumn('To Do', [
        createCard(1, 'Chamar para a entrevista'),
        createCard(2, 'Fazer uma proposta'),
      ]),
      createColumn('In Progress', [createCard(4, 'Analisar teste técnico')]),
      createColumn('Done', [
        createCard(3, 'Entrar em contato com Gilson Terra pelo Linkedin'),
      ]),
    ]
  },
})
</script>

<style scoped>
.app {
  @apply min-w-full;
}
</style>
