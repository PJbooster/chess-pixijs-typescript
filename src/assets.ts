import { Assets } from 'pixi.js';
import manifest from './manifest.json';

export async function initAssets() {
    await Assets.init({ manifest });
    await Assets.loadBundle(['default']);
}
