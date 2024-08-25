import configLoader from "./src/js/configLoader.js";
import createPages from "./src/js/createPages.js";
import createPosts from "./src/js/createPosts.js";

const config = configLoader();

createPosts(config);
createPages(config);

// //TODO: better manage paths
// //TODO: automatically add header and footer (explicit false in front matter not to add)
// //TODO: add a way to add custom css and js, meta tag, title, etc.
// //TODO: system for tagging and categories, and search, linking between posts, pagination
