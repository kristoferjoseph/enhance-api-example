/* global HTMLElement, DOMParser, document, customElements */
import TodosFormCreate from '../elements/todos/form-create.mjs'
import TodosList from '../elements/todos/list.mjs'
import TodosItem from '../elements/todos/item.mjs'
import li from '../elements/li.mjs'
import API from './api.mjs'
const api = API()

function nodeFromString(str) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, "text/html")
  return doc.body.firstElementChild
}

class EnhanceElement extends HTMLElement {
  constructor() {
    super()
    this.storeChangedCallback = this.storeChangedCallback.bind(this)
    const templateName = `${this.tagName.toLowerCase()}-template`
    const template = document.getElementById(templateName)
    if (template) {
      this.template = template
    }
    else {
      this.template = document.createElement('template')
      this.template.innerHTML = this.render({
        html: this.html,
        state: this.state
      })
      this.template.setAttribute('id', templateName)
    }
  }

  html(strings, ...values) {
    const collect = []
    for (let i = 0; i < strings.length - 1; i++) {
      collect.push(strings[i], values[i])
    }
    collect.push(strings[strings.length - 1])
    return collect.join('')
  }

  get state() {
    const attrs = this.attributes.length
      ? this.attrsToObject(this.attributes)
      : {}
    const store = this.api?.store || {}

    return {
      attrs,
      store
    }
  }

  attrsToObject(attrs = []) {
    const attrsObj = {}
    for (let d = attrs.length - 1; d >= 0; d--) {
      let attr = attrs[d]
      attrsObj[attr.nodeName] = attr.nodeValue
    }
    return attrsObj
  }

  storeChangedCallback() {}
  render() {}
}

class TodoForm extends EnhanceElement {
  constructor() {
    super()
    this.api = api
    this.submit = this.submit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.addEventListener('submit', this.submit)
    this.form = this.querySelector('form')
    this.textInput = this.querySelector('input[type="text"]')
  }

  render(args) {
    return TodosFormCreate(args)
  }

  connectedCallback() {
    this.textInput.focus()
  }

  resetForm() {
    this.textInput.value = ''
    this.textInput.focus()
  }

  submit(e) {
    e.preventDefault()
    this.api.create(this.form)
    this.resetForm()
  }
}

customElements.define('todos-form-create', TodoForm)

class TodoList extends EnhanceElement {
  keys = ['todos']
  constructor() {
    super()
    this.api = api
    this.api.subscribe(this.storeChangedCallback, this.keys)
    this.list = this.querySelector('ul')
  }

  storeChangedCallback(store={}) {
    const { todos=[] } = store
    // Surgical updates to maintain focus etc.
    // Update existing items
    todos.forEach(t=> {
      const existingItem = this.querySelector(`todos-item[key="${t.key}"]`)
      if (existingItem) {
        const itemTitle = existingItem.getAttribute('title')
        const itemCompleted = existingItem.getAttribute('completed')
        if (itemTitle != t.title) {
          existingItem.setAttribute('title', t.title)
        }
        if (itemCompleted != t.completed) {
          existingItem.setAttribute('completed', t.completed)
        }
      }
      else {
        // Add new items last
        this.list.append(nodeFromString(li(t)))
      }
    })

    // Remove deleted items
    const items = this.querySelectorAll('li')
    const deletions = []
    items.forEach(item=> {
      const itemKey = item.getAttribute('id')
      const found = todos.find(t => t.key === itemKey)
      if (!found) {
        deletions.push(item)
      }
    })

    deletions.forEach(item => this.list.removeChild(item))
    deletions.length = 0
  }

  render(args) {
    return TodosList(args)
  }
}

customElements.define('todos-list', TodoList)


class TodoItem extends EnhanceElement {
  constructor() {
    super()
    this.api = api
    this.update = this.update.bind(this)
    this.updateChecked = this.updateChecked.bind(this)
    this.destroy = this.destroy.bind(this)
    this.shouldCallAPI = this.shouldCallAPI.bind(this)
    // Do not replace children if already present from SSR
    if (!this.children.length) {
      this.replaceChildren(this.template.content.cloneNode(true))
    }
    const key = this.getAttribute('key')
    this.updateForm = this.querySelector(`form[action='/todos/${key}']`)
    this.deleteForm = this.querySelector(`form[action='/todos/${key}/delete']`)
    this.updateForm.addEventListener('submit', this.update)
    this.deleteForm.addEventListener('submit', this.destroy)
    this.checkboxInput = this.querySelector('input[type="checkbox"]')
    this.checkboxInput.addEventListener('click', this.updateChecked)
    this.textInput = this.querySelector('input[type="text"]')
    this.textInput.addEventListener('focusout', this.shouldCallAPI)
  }

  render(args) {
    return TodosItem(args)
  }

  static get observedAttributes() {
    return [
      'title',
      'completed'
    ]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch(name) {
      case 'title':
        this.textInput.value = newValue
        break
      case 'completed':
        if (newValue === 'true') {
          this.checkboxInput.checked = true
        }
        else {
          this.checkboxInput.checked = false
        }
        break
      }
    }
  }

  shouldCallAPI(e) {
    // Cuts down on unnecessary API calls
    const title = this.getAttribute('title')
    const value = e.target.value
    if (title !== value) {
      this.update()
    }
  }

  update(e) {
    // Check for the existance of the event so we can call this method from other handlers
    e && e.preventDefault()
    this.api.update(this.updateForm)
  }

  updateChecked(e) {
    e && e.preventDefault()
    // Would be nice to be able to set the checked state _before_ making the api call.
    this.update()
  }

  destroy(e) {
    e.preventDefault()
    this.api.destroy(this.deleteForm)
  }
}

customElements.define('todos-item', TodoItem)
