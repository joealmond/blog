export default function about(config) {
  return `
    <h1>${config.site.title}</h1>
    <h3>Created by ${config.site.author}</h3>
  `;
}
