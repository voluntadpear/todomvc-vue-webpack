<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <todo-input placeholder="Qué hay que hacer?" v-model="newTodo" @itemAdded="addCurrentTodo"></todo-input>
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main" v-if="todos.length > 0">
        <input class="toggle-all" type="checkbox" v-model="areAllCompleted">
        <label for="toggle-all">Mark all as complete</label>
        <router-view @completeToggled="toggleComplete" @removeClicked="removeTodo" @textChanged="textChanged" :todos="todos"></router-view>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer" v-if="todos.length > 0">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count">
          <strong>{{ remaining }}</strong> {{'item' | pluralize(remaining)}} left</span>
        <!-- Remove this if you don't implement routing -->
        <filters></filters>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="clearCompleted" v-show="todos.length > remaining">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <!-- Change this out with your name and url ↓ -->
      <p>Created by
        <a href="http://todomvc.com">Guillermo Peralta</a>
      </p>
      <p>
        <a href="#" @click.prevent="showAbout"> About </a>
      </p>
      <template v-if="shouldShowAbout">
        <About></About>
      </template>
      <p>Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import filters from './FilterFunctions'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import Filters from './Filters.vue'
const About = () => import('./About.vue')
Vue.use(VueRouter)

let data = {

}
const routes = [
  { path: "/home", component: TodoList, props: { filter: "all" } },
  { path: "/completed", component: TodoList, props: { filter: "completed" } },
  { path: "/active", component: TodoList, props: { filter: "active" } },
  { path: "*", redirect: "/home" }
]

const router = new VueRouter({ routes, linkActiveClass: "selected" })
export default {
  data() {
    return {
      msg: 'Que se yo',
      newTodo: "",
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      shouldShowAbout: false
    }
  },
  components: {
    TodoInput,
    TodoList,
    Filters,
    About
  },
  filters: {
    pluralize: function (value, prop) {
      if (prop < 2) {
        return value
      }
      return `${value}s`
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(t => !t.completed).length
    },
    areAllCompleted: {
      get: function () {
        return this.remaining == 0
      },
      set: function (value) {
        this.todos.forEach(todo => todo.completed = value)
      }
    }
  },
  watch: {
    todos: {
      handler(val) {
        localStorage.setItem("todos", JSON.stringify(val))
      },
      deep: true
    }
  },
  methods: {
    addCurrentTodo() {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        text: value,
        completed: false
      })
      this.newTodo = ""
    },
    toggleComplete(val, todo) {
      todo.completed = val
    },
    textChanged(newText, todo) {
      todo.text = newText
    },
    removeTodo(val) {
      this.todos = this.todos.filter(x => x != val)
    },
    clearCompleted() {
      this.todos = filters['active'](this.todos)
    },
    showAbout() {
      this.shouldShowAbout = true
    }
  },
  router
}
</script>
