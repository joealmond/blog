export default function createHeaderHtml(config) {
  const { outputPath } = config.build;
  return /*html*/ `
    <header>
        <nav>
            <ul>
            ${config.menu
              .map(
                (item) =>
                  `<li><a href="${outputPath}${item.url}">${item.name}</a></li>`
              )
              .join("")}
            </ul>
        </nav>
    </header>
  `;
}
