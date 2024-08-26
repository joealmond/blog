import configLoader from "./src/js/configLoader.js";
import createPages from "./src/js/createPages.js";
import createPosts from "./src/js/createPosts.js";
import createLayouts from "./src/js/createLayouts.js";
import copyAllFiles from "./src/js/copyAllFiles.js";

//TODO: add custom css and js, meta tag, title, etc.
//TODO: syntax highlighting
//TODO: system for tagging and categories, and search, linking between posts, pagination
//TODO: interaction with posts, comments, likes, etc.
//TODO: can mark drafts
//TODO: better global styles handling (duplicate config entries, no multiple files)

generateSite();

async function generateSite() {
  console.log("\nGenerating site...\n");

  const config = configLoader();
  if (!config) {
    console.error("Error loading configuration. Aborting site generation.");
    return;
  }

  config.build.rootPath = import.meta.dirname;

  if (!copyAllFiles(config)) {
    console.error("Error copying files. Aborting site generation.");
    return;
  }

  const layouts = await createLayouts(config);
  if (!layouts) {
    console.error("Error creating layouts. Aborting site generation.");
    return;
  }

  if (!(await createPosts(config, layouts))) {
    console.error("Error creating posts. Aborting site generation.");
    return;
  }

  if (!(await createPages(config, layouts))) {
    console.error("Error creating pages. Aborting site generation.");
    return;
  }

  console.log("\nSite generated successfully!\n");
}
