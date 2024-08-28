import getPostMetadata from "../../js/getPostsMetadata.js";

export default function posts(config) {
  const posts = getPostMetadata(config);

  const { outputPath, outputPostsPath } = config.build;

  return `
    <h3>Posts</h3>
    <ul>
        ${posts
          .map(
            (post) => `
            <li><a href="${outputPath}${outputPostsPath}/${post.id}/${post.id}.html">${post.title}</a> - ${post.description}</li>
        `
          )
          .join("")}
    </ul>
  `;
}
