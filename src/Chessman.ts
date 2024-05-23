import { ChessCoordinate, ChessmanType, FieldType, Piece, PlayerType } from './utils';
import Field from './Field';
import Draggable from './Draggable';
import { Sprite } from 'pixi.js';
import { Singleton } from './Singleton';

export default class Chessman extends Draggable {
    public name: ChessmanType = 'none';
    protected _sprite?: Sprite;
    protected _enable: boolean = false;
    protected _id: number = -1;
    protected _overlapField: Field | null = null;

    protected _possibleMoves: ChessCoordinate[] = [];
    protected _beatMoves: ChessCoordinate[] = [];

    public type: PlayerType;

    constructor(index: number, type: PlayerType, name: ChessmanType) {
        super();
        this.name = name;
        this.type = type;
        this._id = index;
    }

    public getId() {
        return this._id;
    }

    onDragMove = () => {
        const singleton = Singleton.getInstance();

        const overlap = singleton.isOverlapping({ x: this.x, y: this.y }) ?? null;
        if (overlap && this._draggingData) {
            overlap.setHover(true);
        }

        singleton
            .getFields(false)
            .filter((field) => field !== overlap)
            .forEach((field) => field.setHover(false));

        this._overlapField = overlap;
    };

    protected onDragEnd = () => {
        const singleton = Singleton.getInstance();

        this.checkPossibleMove();

        singleton.lowlightCoords();
        this._possibleMoves = [];
        this._beatMoves = [];

        singleton.getChessmanCoordinate(1);
    };

    protected move(target: Field) {
        const singleton = Singleton.getInstance();

        const currentCoord = singleton.getChessmanCoordinate(this._id);
        const previous = singleton.getFieldByCoord(currentCoord!);

        previous?.setChessman(null);
        target.setChessman(this);
        singleton.changeTurn();
    }

    protected beat(target: Field) {
        const singleton = Singleton.getInstance();

        const currentCoord = singleton.getChessmanCoordinate(this._id);
        const previous = singleton.getFieldByCoord(currentCoord!);

        previous?.setChessman(null);
        singleton.beat(this.type === 'black' ? 'white' : 'black', target.getChessman()!);

        target.removeCurrentChessman();
        target.setChessman(this);
        singleton.changeTurn();
    }

    protected checkPossibleMove() {
        const overlapField = this._overlapField;

        if (!overlapField) return;

        const beatMoves = this._beatMoves;
        const possibleMoves = this._possibleMoves;
        const overlapCoord = overlapField?.getCoord();
        const fieldChessman = overlapField.getChessman();

        if (beatMoves.includes(overlapCoord)) {
            if (fieldChessman?.type === this.type) return;

            if (fieldChessman) {
                this.beat(overlapField);
            }
        } else if (possibleMoves.includes(overlapCoord)) {
            if (fieldChessman) return;
            else this.move(overlapField);
        }
    }

    public enable() {
        this._enable = true;

        this.interactive = true;
        this.eventMode = 'static';
        this.cursor = 'pointer';
    }

    public disable() {
        this._enable = false;
        this.eventMode = 'none';
        this.cursor = 'none';
    }

    protected onClick(
        callback: (
            currentCoordinate: ChessCoordinate,
            pieces: Piece[],
            currentCoordinateType?: FieldType,
        ) => [any, any],
    ) {
        const currentType = this.type;
        const singleton = Singleton.getInstance();

        const currentPosition = singleton.getChessmanCoordinate(this._id);
        const fieldsWithPawns = singleton.getFields(true);

        const pieces = fieldsWithPawns.map((field): Piece => {
            const isEnemy = field.getChessman()?.type !== currentType;

            return {
                coordinate: field.getCoord(),
                isEnemy: isEnemy,
            };
        });

        if (currentPosition) {
            const [possibleMoves, beatMoves] = callback(currentPosition, pieces, currentType);
            let openMoves = singleton.checkOpenCoordinates(possibleMoves, this.type);

            this._possibleMoves = possibleMoves;
            this._beatMoves = beatMoves;

            singleton.highlightOpenCoords(openMoves);
            singleton.highlightBeatCoords(beatMoves);
        }
    }
}
