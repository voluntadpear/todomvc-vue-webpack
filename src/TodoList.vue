<template>
    <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <todo-item v-for="todo of visibleTodos" :todo="todo" :key="todo.text"></todo-item>
    </ul>
</template>

<script>
import TodoItem from './TodoItem.vue'
import filters from './FilterFunctions'

export default {
    props: ["todos", "filter"],
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
