import Todo from '../li.mjs'

export default function TodosList({ html, state }) {
  const { store = {} } = state
  const { todos = [{ title: 'Edit this Todo.' }] } = store
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
