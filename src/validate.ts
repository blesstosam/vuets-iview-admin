import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';

const messages = {
  'zh-CN': {
    cantBeEmpty: '不能为空',
    stringLen1To8: '长度为1-8位',
    illegalCharacter: '不能输入非法字符'
  },
  'en-US': {
    cantBeEmpty: `Can't be empty`,
    stringLen1To8: 'The length is 1-8',
    illegalCharacter: 'Illegal characters cannot be entered'
  },
  'zh-TW': {
    cantBeEmpty: '不能为空'
  }
};

function initI18n() {
  const i18n = new VueI18n({
    locale: (store as any).state.app.local, // 设置地区
    messages // 设置地区信息
  });
  return new Vue({ i18n });
}

/**
 * @description: 1-8个字符，由汉字、字母、数字组成
 */
export const validateLetterNumberChinese = (_: object, value: string, callback: Function) => {
  const vueInstance = initI18n();
  if (!value) {
    return callback(new Error(String(vueInstance.$t('cantBeEmpty'))));
  } else if (!/^[\u4e00-\u9fa50-9a-zA-Z]+$/.test(value)) {
    callback(vueInstance.$t('illegalCharacter'));
  } else if (!/^.{1,8}$/.test(value)) {
    callback(vueInstance.$t('stringLen1To8'));
  } else {
    callback();
  }
};
