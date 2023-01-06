// 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)。
import Vue from 'vue'
import VueI18n from 'vue-i18n'
//
import en from './en'
import zh from './zh'

import locale from 'element-ui/lib/locale'
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
  locale: 'zh',
  en: {
    ...en,

    ...elementEN
  },
  zh: {
    ...zh,
    ...elementZH
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages // 设置地区信息
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n

// 现在应用程序已经准备好了！
