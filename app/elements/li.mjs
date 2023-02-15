export default function Todo(state) {
  const { completed=false, created='', key='', title='' } = state
  return `
 <li
   id="${key}"
   class="flex"
>
  <todos-item
    class="flex flex-grow"
    completed="${completed}"
    created="${created}"
    key="${key}"
    title="${title}"
  ></todos-item>
</li>
    `
}
