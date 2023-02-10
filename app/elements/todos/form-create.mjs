export default function TodosCreateForm({ html, state }) {
  const { store } = state
  const { problems={} } = store
  const borderClasses = `
border1
border-solid
border-current
radius0
overflow-hidden
`

  return html`
<pre><code>
${JSON.stringify(problems, null, 2)}
</code></pre>
<fieldset
  class="
   grid
   gap0
   border-none
 "
>
  <legend class="text2 mb1">
    Todos
  </legend>
  <form
    action="/todos"
    class="
     grid
     gap-1
    "
    method="POST"
  >
    <div
      class="
        flex
        flex-col
      "
    >
      <label
        class="mb-4"
        for="title"
      >
        Title
      </label>
      <input
        class="
         flex-grow
         p-4
         text1
         ${borderClasses}
        "
        name="title"
        type="text"
        placeholder="Add a title"
        autofocus
        required
      >
    </div>

    <footer class="text-right">
      <button
       class="
        pt-1
        pr2
        pb-1
        pl2
        font-bold
        btn-primary
        ${borderClasses}
       "
      >
        Save
      </button>
    </footer>

  </form>

</fieldset>
  `
}
