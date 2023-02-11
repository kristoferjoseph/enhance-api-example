export default function EnhanceFlash({ html, state }) {
  const { store={} } = state
  const { problems={} } = store
  return html`
    <pre>
      <code>
        ${JSON.stringify(problems, null, 2)}
      </code>
    </pre>
  `
}
