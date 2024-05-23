import { Application } from 'pixi.js';
import { initAssets } from './assets';
import { Singleton } from './Singleton';

export const app = new Application();

async function init() {
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0x333333,
    });

    await initAssets();
    Singleton.getInstance().init();

    app.stage.addChild(Singleton.getInstance());
    document.body.appendChild(app.canvas);
}

init();
