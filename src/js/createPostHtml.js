import { marked } from "marked";

export default async function createPostHtml(content, metadata = null) {

  return /*html*/ `
<article>
  <header> 
    ${metadata ? `<h1>${metadata.title}</h1>` : ""}
    ${
      metadata
        ? `<p>By <span class="author">${metadata.author}</p></span> on <time datetime="${metadata.date}">${metadata.date}</time></p>`
        : ""
    }
    ${
      metadata
        ? `<div class="tags">${metadata.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}</div>`
        : ""
    }
  </header>
  ${
    content
      ? `<div class="content">
    <p>${marked.parse(content)}</p>
    </div>`
      : ""
  }
</article>
  `;
}
