import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import md5 from "js-md5"
import VueCookies from "vue-cookies"
import marvonEditor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false;

Vue.prototype.$darkMode = false
Vue.prototype.$md5 = md5
Vue.prototype.$loginStatus = false
Vue.prototype.$token = ""
Vue.prototype.$isHoster = false

Vue.prototype.$writeWhat = ""


Vue.prototype.$err = function(err: any) :void{alert("Something Wrong");console.log(err);}
Vue.prototype.$tokenReset = function(res: any): void{
  Vue.prototype.$loginStatus = false
  Vue.prototype.$isHoster = false
  Vue.$cookies.remove("token")
  router.push({path:"/index"})
  alert("登录信息出错，请重新登录")
}

Vue.directive("disappear",{
  bind(el:any,binding){
    let status_cache:string
    function isDisappear() {
      let status = document.defaultView.getComputedStyle(el).display
      if(status === "none" && status !== status_cache){
        binding.value(true)
      }else if(status === "block" && status !== status_cache){
        binding.value(false)
      }
      status_cache = status
    }
    el.__vueSetInterval__ = setInterval(isDisappear,300)
  },
  unbind(el:any){
    clearInterval(el.__vueSetInterval__)
  }
})


Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.use(marvonEditor)

if(Vue.$cookies.get("token")){
  Vue.prototype.$token = Vue.$cookies.get("token")
  Vue.prototype.$loginStatus = true
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
