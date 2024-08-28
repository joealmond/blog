export default function home(config) {
  return `
    <h1>${config.site.title}</h1>
    <h3>${config.site.description}</h3>
  `;
}
