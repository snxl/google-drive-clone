import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../logger.js';
import FileHelper from '../fileHelper.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDownloadsFolder = resolve(__dirname, '../', '../', 'downloads');

export default class Routes {
    // io
    constructor(downloadsFolder = defaultDownloadsFolder) {
        this.downloadsFolder = downloadsFolder;
        this.fileHelper = FileHelper;
    }

    setSocketInstance(io) {
        this.io = io;
    }

    async defaultRoute(req, res) {
        res.end('hello world');
    }

    async post(req, res) {
        logger.info('post');
        res.end('hello world');
    }

    async get(req, res) {
        const files = await this.fileHelper.getFilesStatus(this.downloadsFolder);

        res.writeHead(200);
        res.end(JSON.stringify(files));
    }

    async options(req, res) {
        res.writeHead(204);
        res.end('hello world');
    }

    async handler(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const chosen = this[req.method.toLowerCase()] || this.defaultRoute;

        return chosen.apply(this, [req, res]);
    }
}
