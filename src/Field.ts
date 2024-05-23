import { Container, Graphics, Sprite } from 'pixi.js';
import { ChessCoordinate, ChessField } from './utils';
import Chessman from './Chessman';

type FieldHighlight = 'red' | 'green' | 'deep-green' | 'orange' | 'none';

export default class Field extends Container {
    private _coord: ChessCoordinate;
    private _sprite: Sprite;
    private _chessman: Chessman | null = null;

    private _redSquare: Graphics;
    private _greenSquare: Graphics;
    private _orangeSquare: Graphics;
    private _deepGreenSquare: Graphics;

    constructor(data: ChessField) {
        super();

        this._coord = data.name;
        this._sprite = Sprite.from(`field/${data.type.toLowerCase()}`);
        this._sprite.anchor.set(0.5);
        this._sprite.width = 50;
        this._sprite.height = 50;
        this.x = data.x;
        this.y = data.y;

        this._redSquare = new Graphics().rect(-20, -20, 40, 40).fill(0xff0000);
        this._redSquare.alpha = 0.2;

        this._greenSquare = new Graphics().rect(-20, -20, 40, 40).fill(0x00ff00);
        this._greenSquare.alpha = 0.2;

        this._deepGreenSquare = new Graphics().rect(-20, -20, 40, 40).fill(0x32cd32);
        this._deepGreenSquare.alpha = 0.2;

        this._orangeSquare = new Graphics().rect(-20, -20, 40, 40).fill(0xff9900);
        this._orangeSquare.alpha = 0.2;

        this.addChild(this._sprite);
    }

    public setHighlight(highlight: FieldHighlight) {
        switch (highlight) {
            case 'green':
                this.addChild(this._greenSquare);
                break;
            case 'red':
                this.addChild(this._redSquare);
                break;
            case 'orange':
                this.addChild(this._orangeSquare);
                break;

            default:
                this.removeChild(this._redSquare);
                this.removeChild(this._greenSquare);
                this.removeChild(this._orangeSquare);
                this.removeChild(this._deepGreenSquare);
        }
    }

    public getCoord() {
        return this._coord;
    }

    public setHover(flag: boolean) {
        this._greenSquare.alpha = flag ? 0.5 : 0.2;
    }

    public removeCurrentChessman() {
        this.removeChild(this._chessman!);
    }

    public setChessman(pawn: Chessman | null) {
        this._chessman = pawn;

        if (this._chessman) this.addChild(this._chessman);
    }

    public getChessman() {
        return this._chessman;
    }
}
