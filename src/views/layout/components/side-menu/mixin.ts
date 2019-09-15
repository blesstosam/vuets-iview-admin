import CommonIcon from '@/components/CommonIcon.vue';
import { showTitle } from '@/assets/script/util';
import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare a mixin as the same style as components.
@Component({
  components: {
    CommonIcon
  }
})
export default class Mixin extends Vue {
  showTitle(item: any) {
    return showTitle(item, this);
  }
  showChildren(item: any) {
    return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways));
  }
  getNameOrHref(item: any, hasChildren: boolean) {
    return item.href ? `isTurnByHref_${item.href}` : hasChildren ? item.children[0].name : item.name;
  }
}
