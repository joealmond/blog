import { readFileSync } from 'node:fs';

export default function configLoader() {
    try {
        const configData = readFileSync("config.json", 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        console.error("Error reading config file:", error);
        return null;
    }
}

