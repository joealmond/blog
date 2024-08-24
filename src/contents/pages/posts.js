import getPostMetadata from '../../js/getPostsMetadata.js';

export default function posts(config) {
    const posts = getPostMetadata(config);
    return /*html*/ `
    <h3>Posts</h3>
    <ul>
        ${posts.map(post => `
            <li><a href="${config.build.outputPath}${config.build.outputPostsPath}/${post.id}/${post.id}.html">${post.title}</a> - ${post.description}</li>
        `).join('')}
    </ul>
  `;
}