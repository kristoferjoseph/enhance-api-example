export default function TodosList({ html, state }) {
  const { store = {} } = state
  const { todos = [] } = store
  const todoItems = todos.map((t, i) => {
    const { completed = false, title = '' } = t

    console.log('todo: ', t)
    return `
    <li
     id="todo-item-${i}"
     class="
       flex
     "
    >
  <input
    class="mr1"
    type="checkbox"
    ${completed ? 'checked' : ''}
  >
  <h5>${title}</h3>
</li>
    `
  }).join('\n')

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
