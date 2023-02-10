import Todo from '../../tags/todo.mjs'

export default function TodosList({ html, state }) {
  const { store = {} } = state
  const { todos = [] } = store
  const todoItems = todos
    .map(t => Todo(t))
    .join('\n')

  return html`
<ul
  class="
    grid
    gap-1
    p0
    list-none
  "
>
  ${todoItems}
</ul>
  `
}
