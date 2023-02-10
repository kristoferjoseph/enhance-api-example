/* global window, Worker */
import Store from '@enhance/store'
const store = Store({ todos: [] })

const CREATE  = 'create'
const UPDATE  = 'update'
const DESTROY = 'destroy'
const LIST    = 'list'

let worker
export default function API() {
  if (!worker) {
    worker = new Worker('./_public/pages/worker.mjs')
    worker.onmessage = mutate
  }

  if (window.__INITIAL_STATE__) {
    const initialState = window.__INITIAL_STATE__
    store.initialize(initialState)
  }

  return {
    create,
    update,
    destroy,
    list,
    store,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe
  }
}

function mutate(e) {
  const { data } = e
  const { result, type } = data
  switch (type) {
  case CREATE:
    createMutation(result)
    break
  case UPDATE:
    updateMutation(result)
    break
  case DESTROY:
    destroyMutation(result)
    break
  case LIST:
    listMutation(result)
    break
  }
}

function createMutation({ todo={}, problems={} }) {
  const copy = store.todos.slice()
  copy.push(todo)
  store.todos = copy
  store.problems = problems
}

function updateMutation({ todo={}, problems={} }) {
  const copy = store.todos.slice()
  copy.splice(copy.findIndex(i => i.key === todo.key), 1, todo)
  store.todos = copy
  store.problems = problems
}

function destroyMutation({ todo={}, problems={} }) {
  let copy = store.todos.slice()
  copy.splice(copy.findIndex(i => i.key === todo.key), 1)
  store.todos = copy
  store.problems = problems
}

function listMutation({ todos=[], problems={} }) {
  store.initialize({ todos, problems })
}

function processForm(form) {
  return JSON.stringify(
    Object.fromEntries(
      new FormData(form)
    )
  )
}

function create(form) {
  const todo = processForm(form)
  worker.postMessage({
    type: CREATE,
    data: todo
  })
}

function destroy (form) {
  const todo = processForm(form)
  worker.postMessage({
    type: DESTROY,
    data: todo
  })
}

function list () {
  worker.postMessage({
    type: LIST
  })
}

function update (form) {
  const todo = processForm(form)
  worker.postMessage({
    type: UPDATE,
    data: todo
  })
}

