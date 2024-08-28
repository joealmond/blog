export default function createFooterHtml(config) {
  return `
    <footer>
        <p>© ${new Date().getFullYear()} ${config.site.title}</p>
    </footer>
  `;
}
