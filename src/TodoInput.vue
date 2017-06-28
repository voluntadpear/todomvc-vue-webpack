<template>
    <input class="new-todo" :placeholder="placeholder" autofocus :value="value" @input="valueChanged($event.target.value)" @keyup.enter="itemAdded()">
</template>
<script>
export default {
    props: ["placeholder", "value"],
    methods: {
        valueChanged(value) {
            this.$emit("input", value)
        },
        itemAdded() {
            this.$emit("itemAdded")
        }
    }
}
</script>

<style>
input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
}

input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
}

input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
}
</style>
