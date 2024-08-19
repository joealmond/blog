const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");

const srcPath = "/src";
const postsPath = "/blog/posts";
const sourcePath = path.join(__dirname, srcPath);
const postsDirectory = path.join(__dirname, srcPath + postsPath);
const outputDirectory = path.join(__dirname, "dist");

const entries = fs.readdirSync(postsDirectory);

try {
  const directories = entries.filter((entry) => {
    const fullPath = path.join(postsDirectory, entry);
    const stats = fs.statSync(fullPath);
    return stats.isDirectory();
  });

  directories.forEach((entry) => {
    const directory = path.join(postsDirectory, entry);
    const filename = `${entry}.md`;
    const fileContent = fs.readFileSync(path.join(directory, filename), "utf8");
    const { data, content } = matter(fileContent);

    //TODO: this html boilerplate, has to com from a single source
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="/dist/"> 
        <title>${data.title}</title>
    </head>
    <body>
        ${data.header ? fs.readFileSync(path.join(sourcePath, "header.html"), "utf8") : ""}
  
        <h1>${data.title}</h1>
        <p>${data.date}</p>
  
        ${marked.parse(content)}
  
        ${data.footer ? fs.readFileSync(path.join(sourcePath, "footer.html"), "utf8") : ""}
    </body>
    </html>
  `;

    const outputPath = path.join(outputDirectory, postsPath, entry);
    fs.mkdirSync(outputPath, { recursive: true });

    fs.writeFileSync(
      path.join(outputPath, filename.replace(".md", ".html")),
      htmlContent
    );
  });
  console.log("All .md files converted to .html and copied successfully!");
} catch (err) {
  console.error("Error reading directory:", err);
}

try {
  function copyHtmlFilesRecursively(source, destination) {
    const entries = fs.readdirSync(source);

    entries.forEach((entry) => {
      const sourceFullPath = path.join(source, entry);
      const destinationFullPath = path.join(destination, entry);

      const stats = fs.statSync(sourceFullPath);

      if (stats.isDirectory()) {
        // If it's a directory, create it in the destination and recurse
        fs.mkdirSync(destinationFullPath, { recursive: true });
        copyHtmlFilesRecursively(sourceFullPath, destinationFullPath);
      } else if (path.extname(entry) === ".html") {
        // If it's an .html file, copy it
        fs.copyFileSync(sourceFullPath, destinationFullPath);
      }
    });
  }

  // Ensure the 'dist' directory exists
  fs.mkdirSync(outputDirectory, { recursive: true });

  // Start the recursive copy process
  copyHtmlFilesRecursively(sourcePath, outputDirectory);

  console.log("All .html files copied successfully!");
} catch (err) {
  console.error("Error reading directory:", err);
}

try {
  // Read files
  const indexContent = fs.readFileSync(
    path.join(sourcePath, "index.html"),
    "utf8"
  );
  const headerContent = fs.readFileSync(path.join(sourcePath, "header.html"), "utf8");
  const footerContent = fs.readFileSync(
    path.join(sourcePath, "footer.html"),
    "utf8"
  );

  // Replace content within tags using regular expressions
  const modifiedIndexContent = indexContent
    .replace(/<header>[\s\S]*?<\/header>/, `${headerContent}`) // Remove the extra <header> tags
    .replace(/<footer>[\s\S]*?<\/footer>/, `${footerContent}`); // Remove the extra <footer> tags

  // Write the modified HTML back to index.html
  fs.writeFileSync(
    path.join(outputDirectory, "index.html"),
    modifiedIndexContent
  );
  fs.unlinkSync(path.join(outputDirectory, 'header.html'));
  fs.unlinkSync(path.join(outputDirectory, 'footer.html'));
  console.log("index.html joined with header and footer!");
} catch (err) {
  console.error("Error reading directory:", err);
}

//TODO: separate code to multiple files
//TODO: better manage paths (may be config file)
//TODO: better system for partials
//TODO: automatically add header and footer (explicit false in front matter not to add)