import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import Right from '@/components/a.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Right, {
      propsData: { msg }
    });

    // expect(wrapper.text()).to.include(msg);
    expect(1).to.eq(2);
  });
});
