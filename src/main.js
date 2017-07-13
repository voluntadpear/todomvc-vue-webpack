import Vue from "vue"
import VueRouter from "vue-router"
import Firebase from "firebase"
import VueFire from "vuefire"
import App from "./App.vue"
import todoMvcBaseCss from "./base.css"
import todoMvcCss from "./todomvc.css"
import TodoList from "./TodoList.vue"

new Vue({
  el: "#app",
  render: h => h(App)
})
