<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Icons from '@/components/Icons.vue';

@Component({
  components: { Icons }
})
export default class CommonIcon extends Vue {
  @Prop() readonly type!: string;
  @Prop({ default: '' }) readonly color!: string;
  @Prop() readonly size!: number;

  get iconType() {
    if (!this.type) return '';
    return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon';
  }
  get iconName() {
    return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type;
  }
  get iconSize() {
    return this.size || (this.iconType === 'Icons' ? 12 : undefined);
  }
  get iconColor() {
    return this.color || '';
  }

  getCustomIconName(iconName: string) {
    return iconName.slice(1);
  }
}
</script>
