import { mount } from '@vue/test-utils'

import RoundedButton from './RoundedButton'

describe('RoundedButton', () => {
  it('renders', () => {
    const wrapper = mount(RoundedButton)
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })
})
