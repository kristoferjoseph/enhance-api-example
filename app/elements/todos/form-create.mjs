export default function TodosCreateForm({ html }) {
  const borderClasses = `
border1
border-solid
border-current
radius0
overflow-hidden
`

  return html`
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
        style="color:white"
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
        placeholder="Add a title ⏎"
        autofocus
        required
      >
    </div>

      <!--
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

      -->
  </form>

</fieldset>
  `
}
