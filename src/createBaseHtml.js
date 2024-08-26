import { marked } from "marked";

export default async function createBaseHtml(
  config,
  content,
  filename,
  layouts,
  metadata = null
) {

  const { outputPath, globalStylesPath } = config.build;
  const { title,description } = config.site;
  const { header, isMdFile, footer } = getLayouts(layouts, filename);

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
        ${metadata ? `<h1>${metadata.title}</h1>` : ""}
        ${metadata ? `<p>${metadata.author}</p>` : ""}
        ${metadata ? `<p>${metadata.date}</p>` : ""}
        ${
          metadata
            ? `<div>${metadata.tags
                .map((tag) => `<p>${tag}</p>`)
                .join("")}</div>`
            : ""
        }
        ${isMdFile ? marked.parse(content) : content}
        ${footer ?? ""}
    </body>
    </html>
  `;
}

function getLayouts(layouts, filename) {
  let header, footer = null;

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

  const fileExtension = filename.split(".").pop();
  const isMdFile = fileExtension === "md";
  return { header, isMdFile, footer };
}

