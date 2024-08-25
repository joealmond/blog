import createBaseHtml from "../createBaseHtml.js";

export default async function addLayout(
  config,
  content,
  filename,
  layouts,
  metadata = null
) {
  return await createBaseHtml(config, content, filename, layouts, metadata);
}
