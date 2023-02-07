export default function TodosCreateForm({ html, state }) {
  const borderClasses = `
border1
border-solid
border-current
radius0
overflow-hidden
`
  return html`
<style>
  :host {
    display: block;
    margin: 0 auto;
    min-width: 15rem;
    max-width: 50rem;
  }

  .btn-primary {
    background-color: var(--primary-500);
  }
  .btn-primary:hover {
    background-color: var(--primary-400);
  }
  .btn-primary:active {
    background-color: var(--primary-600);
  }
  .btn-primary,
  .clr-light {
    color: var(--light);
  }
</style>
<fieldset
  class="
   grid
   gap0
   pt1
   pr1
   pb2
   pl1
   ${borderClasses}
 "
>
  <legend class="text2">
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
        autofocus
        required
      >
    </div>

      <!--
    <div
      class="
        flex
        flex-col
      "
    >
      <label
        for="content"
        class="
          mb-4
        "
      >
        Content
      </label>
      <textarea
        class="
          flex-grow
          p-4
          text2
          ${borderClasses}
        "
        name="content"
        rows="3"
      ></textarea>
    </div>
      -->


    <footer class="text-right">
      <button
       class="
        inline-flex
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

  <hr class="${borderClasses}">

  <todos-list></todos-list>
</fieldset>
  `
}
