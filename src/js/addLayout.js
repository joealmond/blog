import createBaseHtml from '../createBaseHtml.js';
import configLoader from './configLoader.js';

const config = configLoader();

export default async function addLayout(config, content, filename, metadata = null) {
    return await createBaseHtml(config, content, filename, metadata);
}