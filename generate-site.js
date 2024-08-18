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

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${data.title}</title>
    </head>
    <body>
        ${data.header ? fs.readFileSync("header.html", "utf8") : ""}
  
        <h1>${data.title}</h1>
        <p>${data.date}</p>
  
        ${marked.parse(content)}
  
        ${data.footer ? fs.readFileSync("footer.html", "utf8") : ""}
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
