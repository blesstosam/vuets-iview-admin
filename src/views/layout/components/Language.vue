<template>
  <div class="lang-switch-wrap">
    <Dropdown trigger="hover" @on-click="changeLang">
      <Icon custom="iconfont icon-language" size="19" style="position: relative; top: -2px;"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(value, key) in localList" :name="key" :key="`lang-${key}`" :selected="key === lang">
          {{ value }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

interface LangConfig {
  'zh-CN': string;
  // 'zh-TW': string;
  'en-US': string;
  [key: string]: string;
}

@Component({})
export default class Language extends Vue {
  @Prop(String) readonly lang!: string;

  langList: LangConfig = {
    'zh-CN': '语言',
    // 'zh-TW': '語言',
    'en-US': 'Lang'
  };
  localList: LangConfig = {
    'zh-CN': '中文简体',
    // 'zh-TW': '中文繁体',
    'en-US': 'English'
  };

  get title() {
    return this.langList[this.lang];
  }

  @Watch('lang')
  langChanged(lang: string) {
    this.$i18n.locale = lang;
  }

  // on-lang-change 不能写成驼峰法
  @Emit('on-lang-change')
  changeLang(name: string) {
    return name;
  }
}
</script>
