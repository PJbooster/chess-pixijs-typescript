import { Container } from 'pixi.js';
import { app } from './main';

export default class Draggable extends Container {
    protected _draggingData: any | null = null;
    private _parent: any | null = null;

    constructor() {
        super();

        this.on('pointerdown', this.onDragStart);
        this.on('pointermove', this.onDragMove);
        this.on('pointerup', this.onDragEnd);
        this.on('pointerupoutside', this.onDragEnd);
    }

    protected onDragStart = (event: any) => {
        if (!this._parent) {
            this._parent = this.parent;
        }

        this._draggingData = event.data;
        this.alpha = 0.5;
        app.stage.addChild(this);

        const newPosition = this._draggingData.global;
        this.x = newPosition.x;
        this.y = newPosition.y;
    };

    protected onDragMove = () => {
        if (this._draggingData) {
            const newPosition = this._draggingData.global;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    };

    protected onDragEnd = () => {
        app.stage.removeChild(this);
        this.alpha = 1;
        this._draggingData = null;

        if (this._parent) {
            this._parent.addChild(this);
            this.x = 0;
            this.y = 0;
        }
        this._parent = null;
    };
}
