import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import IconButton from './IconButton.vue'

describe('IconButton component', () => {
  it('displays the text', async () => {
    const wrapper = mount(IconButton, {
      slots: {
        default: 'Action',
      },
    })

    expect(wrapper.text()).toBe('Action')
  })

  it('Click emits', async () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: false,
      },
      slots: {
        default: 'Action',
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toStrictEqual({ click: [[]] })
  })

  it("Click doesn't emit when disabled", async () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Action',
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toStrictEqual({})
  })
})
