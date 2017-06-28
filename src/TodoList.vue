<template>
    <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <todo-item v-for="todo of visibleTodos" :completed="todo.completed" :text="todo.text" :key="todo.text" @completeToggled="val => toggleComplete(val, todo)" @removeClicked="removeTodo(todo)" @textChanged="val => textChanged(val, todo)"></todo-item>
    </ul>
</template>

<script>
import TodoItem from './TodoItem.vue'
import filters from './FilterFunctions'

export default {
    props: ["todos", "filter"],
    methods: {
        toggleComplete(val, todo) {
            this.$emit("completeToggled", val, todo)
        },
        removeTodo(todo) {
            this.$emit("removeClicked", todo)
        },
        textChanged(text, todo) {
            this.$emit("textChanged", text, todo)
        }
    },
    computed: {
        visibleTodos() {
            return filters[this.filter](this.todos)
        }
    },
    components: {
        TodoItem
    }
}
</script>

<style>
.todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>
