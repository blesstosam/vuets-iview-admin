import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ItemMixin extends Vue {
  @Prop({ default: () => {} }) readonly parentItem!: { name: string; children: string; [key: string]: string };
  @Prop(Number) readonly iconSize!: number;

  get parentName() {
    return this.parentItem.name;
  }
  get children() {
    return this.parentItem.children;
  }
}
