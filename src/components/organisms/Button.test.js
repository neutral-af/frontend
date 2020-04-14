import { mount } from '@vue/test-utils'

import Button from './Button'

describe('Button', () => {
  it('renders', () => {
    const wrapper = mount(Button)
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })
})
