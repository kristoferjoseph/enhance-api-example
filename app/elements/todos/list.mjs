import li from '../li.mjs'

export default function TodosList({ html, state }) {
  const { store = {} } = state
  const { todos = [{ title: 'Edit this Todo.' }] } = store
  const todoItems = todos
    .map(t => li(t))
    .join('\n')

  return html`
    <style>
      :host input:checked + input[type="text"] {
        text-decoration: line-through;
      }
      :host input[type="checkbox"] {
        width: 1rem;
      }
    </style>
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
