
// eslint-disable-next-line no-unused-vars
import { mount, shallowMount } from '@vue/test-utils'
import test01 from '@/views/jest/test01.vue'

describe('test01.vue', () => {
  it('renders props.msg when passed', async () => {
    const msg = '测试苏苏'
    const wrapper = shallowMount(test01, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg);
    await wrapper.get('.addCount').trigger('click')
    console.log(wrapper.get('.number').text())
    expect(wrapper.get('.number').text()).toBe('11')
    console.log(wrapper.html())
  })
})

// npm run test:unit -- --watch