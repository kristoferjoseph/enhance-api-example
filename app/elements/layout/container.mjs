export default function LayoutContainer({ html }) {
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
    <section>
      <slot></slot>
    </section>
  `
}
