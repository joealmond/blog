export default function createFooterHtml(config) {
  return /*html*/ `
    <footer>
        <p>© ${new Date().getFullYear()} ${config.site.title}</p>
    </footer>
  `;
}
