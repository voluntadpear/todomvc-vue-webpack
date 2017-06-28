export default {
  all: todos => todos,
  active: todos => todos.filter(t => !t.completed),
  completed: todos => todos.filter(t => t.completed)
}
