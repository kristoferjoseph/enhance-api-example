/* global HTMLElement, DOMParser, document, customElements */
import TodosFormCreate from '../elements/todos/form-create.mjs'
import TodosList from '../elements/todos/list.mjs'
import TodosItem from '../elements/todos/item.mjs'
import li from '../elements/li.mjs'
import API from './api.mjs'
const api = API()

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
  }

  render(args) {
    return TodosFormCreate(args)
  }

  connectedCallback() {
    this.submit = this.submit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.addEventListener('submit', this.submit)
    this.form = this.querySelector('form')
    this.textInput = this.querySelector('input[type="text"]')
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
  }

  connectedCallback() {
    this.list = this.querySelector('ul')
  }

  storeChangedCallback(store={}) {
    const { todos=[] } = store
    /*
      // Surgical updates to maintain focus etc.
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
        const parser = new DOMParser()
        const doc = parser.parseFromString(li(t), "text/html")
        this.list.append(doc.body.firstElementChild)
      }
    })
    */
    const todoItems = todos
      .map(t => li(t))
      .join('\n')

    this.list.innerHTML = todoItems
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
    this.shouldUpdate = this.shouldUpdate.bind(this)
    if (!this.children.length) {
      this.replaceChildren(this.template.content.cloneNode(true))
    }
  }

  connectedCallback() {
    const key = this.getAttribute('key')
    this.updateForm = this.querySelector(`form[action='/todos/${key}']`)
    this.deleteForm = this.querySelector(`form[action='/todos/${key}/delete']`)
    this.updateForm.addEventListener('submit', this.update)
    this.deleteForm.addEventListener('submit', this.destroy)
    this.checkboxInput = this.querySelector('input[type="checkbox"]')
    this.checkboxInput.addEventListener('click', this.updateChecked)
    this.textInput = this.querySelector('input[type="text"]')
    this.textInput.addEventListener('focusout', this.shouldUpdate)
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
        if (this.textInput)
          this.textInput.value = newValue
        break
      case 'completed':
        if (this.checkboxInput)
          this.checkboxInput.checked = newValue
        break
      }
    }
  }

  shouldUpdate(e) {
    const title = this.getAttribute('title')
    const value = e.target.value
    if (title !== value) {
      this.update()
    }
  }

  update(e) {
    e && e.preventDefault()
    this.api.update(this.updateForm)
  }

  updateChecked(e) {
    e && e.preventDefault()
    this.update()
  }

  destroy(e) {
    e.preventDefault()
    this.api.destroy(this.deleteForm)
  }
}

customElements.define('todos-item', TodoItem)
