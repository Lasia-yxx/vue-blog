import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path:"/",
    redirect:"index"
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName:"index" */"@/views/index.vue")
  },
  {
    path:"/notes",
    name:"notes",
    component: () => 
      import("@/views/notes.vue")
  },
  {
    path:"/photo",
    name:"photo",
    component: () => 
      import("@/views/photo.vue")
  },
  {
    path:"/about",
    name:"about",
    component: () => 
      import("@/views/about.vue")
  },
  {
    path:"/search",
    name:"search",
    component: () =>
      import("@/views/search.vue")
  },
  {
    path:"/hoster",
    name:"hoster",
    component: () =>
      import("@/views/hoster.vue")
  },
  {
    path:"/editor",
    name:"editor",
    component: () => 
      import("@/views/editor.vue")
  },
  {
    path:"/read",
    name:"read",
    component: () =>
      import("@/views/read.vue")
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/views/About.vue")
  // }
];


const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: any,from: any,next: any): void => {
  if(to.name === "hoster"){
    if(!Vue.prototype.$token || !Vue.prototype.$loginStatus){
      Vue.prototype.$token = ""
      Vue.prototype.$loginStatus = false
      Vue.$cookies.remove("token")
      alert("无效的登陆状态")
      next({name:"index"})
    }else{next()}
  }else{next()}
})


export default router;
