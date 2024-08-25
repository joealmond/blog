export default function contact(config) {
  return /*html*/ `
    <h1>${config.site.title}</h1>
    <h3>Contact Me</h3>
    <p>${config.site.author}</p>
    <p>Email: ${config.social.email}</p>
  `;
}
