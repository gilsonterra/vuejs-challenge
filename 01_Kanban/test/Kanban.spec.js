import { mount } from '@vue/test-utils'
import Kanban from '@/components/kanban/Kanban.vue'
import { createCard, createColumn } from '~/components/services'

describe('Kanban', () => {
  test('adicionando colunas', async () => {
    const wrapper = await mount(Kanban)

    const btnAddColumn = wrapper.find('.button-add-column')
    expect(wrapper.findAll('.column').length).toBe(0)

    await btnAddColumn.trigger('click')
    expect(wrapper.findAll('.column').length).toBe(1)

    await btnAddColumn.trigger('click')
    expect(wrapper.findAll('.column').length).toBe(2)
  })

  test('inicializando com 2 colunas', async () => {
    const wrapper = await mount(Kanban, {
      propsData: {
        value: [createColumn('test 1'), createColumn('test 2')],
      },
    })

    expect(wrapper.findAll('.column').length).toBe(2)
  })

  test('removendo coluna', async () => {
    const wrapper = await mount(Kanban, {
      propsData: {
        value: [createColumn('test 1'), createColumn('test 2')],
      },
    })

    const btnRemoveColumn = wrapper.find('.button-remove-column')

    await btnRemoveColumn.trigger('click')
    expect(wrapper.findAll('.column').length).toBe(1)
  })

  test('inicializando com 2 cards', async () => {
    const wrapper = await mount(Kanban, {
      propsData: {
        value: [
          createColumn('test 1', [
            createCard(1, 'card 1'),
            createCard(2, 'card 2'),
          ]),
        ],
      },
    })

    expect(wrapper.findAll('.card').length).toBe(2)
  })

  test('adicionando card', async () => {
    const wrapper = await mount(Kanban, {
      propsData: {
        value: [createColumn('test 1', [])],
      },
    })
    const btnAddCard = wrapper.find('.button-add-card')
    expect(wrapper.findAll('.card').length).toBe(0)

    await btnAddCard.trigger('click')
    expect(wrapper.findAll('.card').length).toBe(1)

    await btnAddCard.trigger('click')
    expect(wrapper.findAll('.card').length).toBe(2)
  })

  test('removendo card', async () => {
    const wrapper = await mount(Kanban, {
      propsData: {
        value: [
          createColumn('test 1', [
            createCard(1, 'card 1'),
            createCard(2, 'card 2'),
          ]),
        ],
      },
    })

    expect(wrapper.findAll('.card').length).toBe(2)

    await wrapper.find('.button-remove-card').trigger('click')
    expect(wrapper.findAll('.card').length).toBe(1)

    await wrapper.find('.button-remove-card').trigger('click')
    expect(wrapper.findAll('.card').length).toBe(0)
  })
})
