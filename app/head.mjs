import { getStyleTag } from '@enhance/arc-plugin-styles/get-styles'

export default function Head() {
  const title = `Enhance todos`
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
          --theme-color: var(--primary-500);
        }
        :focus {
          outline: 0.15rem solid var(--primary-300);
        }
        .color {
          color: var(--theme-color);
        }
      </style>
      <link rel="icon" href="/_public/favicon.svg">
    </head>
    <body class="font-sans">
  `
}
