<template>
    <ul class="filters">
        <li>
            <router-link to="home">All</router-link>
        </li>
        <li>
            <router-link to="active">Active</router-link>
        </li>
        <li>
            <router-link to="completed">Completed</router-link>
        </li>
    </ul>
</template>

<script>
export default {

}
</script>
<style>
.filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
}

.filters li {
    display: inline;
}

.filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
}

.filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
}

.filters li {
    font-size: 14px;
}
</style>
