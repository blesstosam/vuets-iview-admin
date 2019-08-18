// 组件库需要按需引入
import Vue from 'vue';
import {
  Button,
  Table,
  Message,
  Row,
  Col,
  Input,
  Modal,
  Form,
  FormItem,
  Select,
  Option,
  Page,
  DatePicker,
  Tree,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem,
  Icon,
  Header,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Avatar,
  Sider,
  Menu,
  MenuItem,
  Layout
  // MenuSub
} from 'iview';
export default () => {
  Vue.component('Button', Button);
  Vue.component('Table', Table);
  Vue.component('Row', Row);
  Vue.component('Col', Col);
  Vue.component('Input', Input);
  Vue.component('Modal', Modal);
  Vue.component('Form', Form);
  Vue.component('FormItem', FormItem);
  Vue.component('Select', Select);
  Vue.component('Option', Option);
  Vue.component('Page', Page);
  Vue.component('DatePicker', DatePicker);
  Vue.component('Tree', Tree);
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  Vue.component('Carousel', Carousel);
  Vue.component('CarouselItem', CarouselItem);
  Vue.component('Icon', Icon);
  Vue.component('Header', Header);
  Vue.component('Tooltip', Tooltip);
  Vue.component('Dropdown', Dropdown);
  Vue.component('DropdownMenu', DropdownMenu);
  Vue.component('DropdownItem', DropdownItem);
  Vue.component('Badge', Badge);
  Vue.component('Avatar', Avatar);
  Vue.component('Sider', Sider);
  Vue.component('Menu', Menu);
  Vue.component('MenuItem', MenuItem);
  Vue.component('Layout', Layout);
  // Vue.component('SubMenu', MenuSub)
  Vue.prototype.$Message = Message;
};
