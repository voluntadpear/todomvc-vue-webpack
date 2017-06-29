<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <todo-input placeholder="Qué hay que hacer?" v-model="newTodo" @itemAdded="addTodo"></todo-input>
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main" v-if="todos.length > 0">
        <input class="toggle-all" type="checkbox" v-model="areAllCompleted">
        <label for="toggle-all">Mark all as complete</label>
        <router-view :todos="todos"></router-view>
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
import Vuex, {mapState, mapGetters, mapMutations} from "vuex"
import VueRouter from 'vue-router'
import { 
  ADD_TODO, 
  UPDATE_NEW_TODO, 
  SET_COMPLETION_STATE,
  REMOVE_TODO,
  UPDATE_TODO_TEXT,
  CLEAR_COMPLETED
} from './mutation-types'
import filters from './FilterFunctions'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import Filters from './Filters.vue'

const About = () => import('./About.vue')

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    newTodo: ""
  },
  getters: {
    remaining: state => state.todos.filter(t => !t.completed).length
  },
  mutations: {
    [ADD_TODO]: state => {
      const value = state.newTodo && state.newTodo.trim()
      if (!value) {
        return
      }
      state.todos.push({
        text: value,
        completed: false
      })
      state.newTodo = ""
    },
    [UPDATE_NEW_TODO]: (state, text) => state.newTodo = text,
    [SET_COMPLETION_STATE]: (state, {todo, isCompleted}) => todo.completed = isCompleted,
    [REMOVE_TODO]: (state, todo) => state.todos = state.todos.filter(x => x != todo),
    [UPDATE_TODO_TEXT]: (state, {todo, newText}) => todo.text = newText,
    [CLEAR_COMPLETED]: state => state.todos = filters['active'](state.todos)
    
  },
  strict: true
})

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
  store,
  computed: {
    areAllCompleted: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(todo => todo.completed = value)
      }
    },
    newTodo: {
      get: function() {
        return this.$store.state.newTodo
      },
      set: function(val) {
        this.$store.commit(UPDATE_NEW_TODO, val)
      }
    },
    ...mapState(['todos']),
    ...mapGetters(['remaining'])
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
    showAbout() {
      this.shouldShowAbout = true
    },
    ...mapMutations([ADD_TODO, UPDATE_NEW_TODO, CLEAR_COMPLETED])
  },
  router
}
</script>
