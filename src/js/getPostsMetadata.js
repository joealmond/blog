import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { getDirectories } from './utility.js';

export default function getPostsMetadata(config) {
    const posts = [];
    const postsDirectory = path.join(import.meta.dirname, '..', '..', config.build.postsPath);

    getDirectories(postsDirectory).forEach((directory) => {
        const directoryPath = path.join(postsDirectory, directory);
        const fileNames = fs.readdirSync(directoryPath);

        fileNames.forEach((fileName) => {
            const filePath = path.join(directoryPath, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);
            data.id = fileName.replace('.md', '');

            posts.push(data);
        });
    });
  
    return posts;
  };