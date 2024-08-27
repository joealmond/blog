export default function home(config) {
  return html`
    <h1>${config.site.title}</h1>
    <h3>${config.site.description}</h3>
  `;
}
