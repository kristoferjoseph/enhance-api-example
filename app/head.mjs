import { getStyleTag } from '@enhance/arc-plugin-styles/get-styles'

export default function Head(state={}) {
  const title = `Enhance todos`
  const { store={} } = state
  const { todos=[] } = store
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      ${getStyleTag()}
      <style>
        :root {
          --theme-color: var(--secondary-600);
        }
        :focus {
          outline: none;
          box-shadow: 0 0 2px 2px var(--primary-300);
          border-radius: 2px;
        }
        .color {
          color: var(--theme-color);
        }
      </style>
      <link rel="icon" href="/_public/favicon.svg">
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify({ todos })}
      </script>
    </head>
    <body class="font-sans color">
  `
}
