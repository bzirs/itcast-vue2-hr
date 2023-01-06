
import PageTools from '@/components/PageTools'

import UploadImg from '@/components/UploadImg'
import store from '@/store'
import lang from '@/components/Lang'
import ScreenFull from './ScreenFull'

const allow = {
  inserted(el, binding) {
    console.log(el, binding, '999999')
    const flag = store.getters.points.includes(binding.value)
    console.log(flag)
    console.log(el.parentNode)
    flag || el.parentNode.removeChild(el)
  }
}

export default {
  install(Vue) {
    Vue.directive('allow', allow)
    Vue.component('PageTools', PageTools)
    Vue.component('UploadImg', UploadImg)
    Vue.component('lang', lang)
    Vue.component('ScreenFull', ScreenFull)
  }
}
