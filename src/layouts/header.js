export default function createHeaderHtml(config) {
    return /*html*/ `
    <header>
        <nav>
            <ul>
            ${config.menu.map((menuItem) => `<li><a href="${config.build.outputPath + menuItem.url}">${menuItem.name}</a></li>`).join('')}
            </ul>
        </nav>
    </header>
  `;
}