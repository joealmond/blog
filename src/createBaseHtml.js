import { marked } from "marked";
import createLayouts from "./js/createLayouts.js";

export default async function createBaseHtml(
  config,
  content,
  filename,
  metadata = null
) {
  
  const layouts = await createLayouts(config);

  const { header, isMdFile, footer } = getLayouts(layouts, filename);

  return /*html*/ `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="${config.build.outputPath}">
        <title>${config.site.title}</title>
        <description>${config.site.description}</description>
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

