import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { Modal } from 'view-design';
import { CreateElement } from 'vue';

@Component
export default class MyModal extends Vue {
  // 父组件传递的值 用于初始化 isShow
  @Prop({ default: false }) isModalShow!: boolean;

  // 用于绑定v-model
  get isShow() {
    return this.isModalShow;
  }
  set isShow(val) {
    this.handleEmit(val);
  }
  @Emit('update:isModalShow')
  handleEmit(val: boolean) {
    return val;
  }

  @Watch('isShow')
  handleShowModal(val: boolean) {
    if (!val) return;
    // 当显示modal组件的时候 do something
  }

  render(h: CreateElement) {
    return h(Modal, {
      props: {
        ...this.$props,
        value: this.isShow,
        title: this.$props.title || 'title'
      },
      attrs: { ...this.$attrs },
      on: {
        ...this.$listeners,
        'on-visible-change': (val: boolean) => {
          if (!val) {
            this.isShow = false;
          }
        }
      },
      scopedSlots: this.$scopedSlots
    });
  }
}
