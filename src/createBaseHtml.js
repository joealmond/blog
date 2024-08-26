export default async function createBaseHtml(
  config,
  content,
  filename,
  layouts
) {
  const { outputPath, globalStylesPath } = config.build;
  const { title, description } = config.site;
  const { header, footer } = getLayouts(layouts, filename);

  return /*html*/ `
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <base href="${outputPath}">
      <title>${title}</title>
      <description>${description}</description>
      <link rel="stylesheet" href="${outputPath}${globalStylesPath}">
  </head>
  <body>
    ${header ?? ""}
      <main>
        ${content ?? ""}
      </main>
    ${footer ?? ""}
  </body>
</html>
  `;
}

function getLayouts(layouts, filename) {
  let header,
    footer = null;

  for (const layoutObj of layouts) {
    if (layoutObj.filename.includes("header")) {
      header = layoutObj.layout;
      break;
    }
  }

  for (const layoutObj of layouts) {
    if (layoutObj.filename.includes("footer")) {
      footer = layoutObj.layout;
      break;
    }
  }

  return { header, footer };
}
