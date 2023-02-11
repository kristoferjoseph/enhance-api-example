export default function TodosItem({ html, state }) {
  const { attrs } = state
  const { completed='', created='', key='', title='' } = attrs
  const checked = completed === 'true' ? 'checked' : ''

  return html`
    <form
     id="update-form-${key}"
     action="/todos/${key}"
     class="flex flex-grow"
     method="POST"
    >
      <input
        class="mr1"
        name="completed"
        type="checkbox"
        ${checked}
      >
      <input type="text" name="title" value="${title}">
      <input type="hidden" name="created" value="${created}">
      <input type="hidden" name="key" value="${key}">
    </form>

    <form
      id="delete-form-${key}"
      action="/todos/${key}/delete"
      method="POST"
    >
      <input type="hidden" name="key" value="${key}">
      <button>❌</button>
    </form>
  `
}
