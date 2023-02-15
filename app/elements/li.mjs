export default function li(state) {
  const { completed=false, created='', key='', title='' } = state
  return `
<li
  id="${key}"
  class="flex"
>
  <todos-item
    class="
     flex
     flex-grow
     items-center
    "
    completed="${completed}"
    created="${created}"
    key="${key}"
    title="${title}"
  ></todos-item>
</li>
    `
}
