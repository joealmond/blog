import configLoader from "./src/js/configLoader.js";
import createPages from "./src/js/createPages.js";
import createPosts from "./src/js/createPosts.js";
import createLayouts from "./src/js/createLayouts.js";
import copyAllFiles from "./src/js/copyAllFiles.js";

console.log("\nGenerating site...\n");

const config = configLoader();
config.build.rootPath = import.meta.dirname;

copyAllFiles(config);

const layouts = await createLayouts(config);

await createPosts(config, layouts);
await createPages(config, layouts);

console.log("\nSite generated successfully!\n");



//TODO: add custom css and js, meta tag, title, etc.
//TODO: syntax highlighting
//TODO: system for tagging and categories, and search, linking between posts, pagination
//TODO: interaction with posts, comments, likes, etc.
//TODO: drafts
