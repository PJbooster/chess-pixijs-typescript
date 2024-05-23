import { Bounds, Container, Text } from 'pixi.js';
import Field from './Field';
import Chessman from './Chessman';
import { buildChessboardData, ChessCoordinate, PlayerType, Position } from './utils';
import { BLACK_START_SETUP, WHITE_START_SETUP } from './startup';
import { app } from './main';

export class Singleton extends Container {
    static readonly SPRITES_TYPE = '3';

    private static instance: Singleton;
    private _fields: Field[] = [];
    private _chessmen: Chessman[] = [];

    private _whiteBeatPawns: Chessman[] = [];
    private _blackBeatPawns: Chessman[] = [];

    private _turn: PlayerType = 'none';

    protected constructor() {
        super();

        const appWidth = app.screen.width;
        const appHeight = app.screen.height;

        this.x = (appWidth - 50 * 8) / 2 + 20;
        this.y = (appHeight - 50 * 8) / 2 + 20;
    }

    public static getInstance() {
        if (!this.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public beat(current: PlayerType, chessman: Chessman) {
        if (current === 'white') {
            if (chessman.name === 'king') this.win('black');

            this._whiteBeatPawns.push(chessman);
        } else if (current === 'black') {
            if (chessman.name === 'king') this.win('white');

            this._blackBeatPawns.push(chessman);
        }
    }

    public changeTurn() {
        this._turn = this._turn === 'white' ? 'black' : 'white';

        this._chessmen.forEach((chessman) => {
            if (chessman.type === this._turn) {
                console.log('enable!!');
                chessman.enable();
            } else chessman.disable();
        });
    }

    public win(who: PlayerType) {
        const color = who === 'white' ? '#fff1f1' : '#1f1f1f';
        const won = new Text({
            text: `${who} win game!`,
            style: {
                fontFamily: 'short-stack',
                fontSize: '47px',
                fill: color,
            },
        });

        won.x = 225;
        won.y = 225;
        won.anchor = 0.5;

        app.stage.addChild(won);
    }

    public init() {
        const squares = buildChessboardData();
        const pawns = [...WHITE_START_SETUP, ...BLACK_START_SETUP];

        const fields = squares.map((square) => {
            return new Field(square);
        });

        const chessmen = pawns.map((pawn, index) => {
            const field = fields.find((f) => f.getCoord() === pawn.name);
            const newPawn = new pawn.pawn(index, pawn.type);

            if (field) field.setChessman(newPawn);
            return newPawn;
        });

        this._fields = fields;
        this._chessmen = chessmen;

        this._fields.forEach((field) => this.addChild(field));

        this.changeTurn();
    }

    public checkOpenCoordinates(coordinates: ChessCoordinate[], checkingPawnType: PlayerType): ChessCoordinate[] {
        let openCoords: ChessCoordinate[] = [];

        coordinates.forEach((coord) => {
            this._fields.forEach((field) => {
                const fieldCoord = field.getCoord();

                if (fieldCoord === coord) {
                    const fieldPawn = field.getChessman();

                    if (fieldPawn === null || (fieldPawn !== null && fieldPawn.type !== checkingPawnType)) {
                        openCoords.push(coord);
                    }
                }
            });
        });

        return openCoords;
    }

    public highlightOpenCoords(coordinates: ChessCoordinate[]) {
        this._fields.forEach((field) => {
            if (coordinates.includes(field.getCoord())) field.setHighlight('green');
        });
    }

    public highlightBeatCoords(coordinates: ChessCoordinate[]) {
        this._fields.forEach((field) => {
            if (coordinates.includes(field.getCoord())) field.setHighlight('orange');
        });
    }

    public getAllChessmen() {
        return this._fields
            .filter((field) => field.getChessman() !== null)
            .map((field) => {
                return field.getChessman();
            });
    }

    public getFields(withPawns: boolean = false) {
        return withPawns ? this._fields.filter((field) => field.getChessman() !== null) : this._fields;
    }

    public getFieldByCoord(coord: ChessCoordinate) {
        return this._fields.find((field) => field.getCoord() === coord);
    }

    public lowlightCoords() {
        this._fields.forEach((field) => field.setHighlight('none'));
    }

    public getWinner() {
        return false;
    }

    public getChessmanCoordinate(chessmanId: number) {
        return this._fields.find((field) => field.getChessman()?.getId() === chessmanId)?.getCoord();
    }

    public getAllEnemyCoordinates(enemy: PlayerType) {
        return this._fields
            .map((field) => {
                if (field.getChessman()?.type === enemy) {
                    return field.getCoord();
                }
                return '';
            })
            .filter((f) => f !== '');
    }

    public isFieldEmpty(coord: ChessCoordinate | null): boolean {
        return !!this._fields.find((field) => field.getCoord() === coord)?.getChessman();
    }

    public isOverlapping(center: Position): Field | undefined {
        const isInsideBounds = (fieldBounds: Bounds) => {
            return center.x < fieldBounds.x + fieldBounds.width && center.y < fieldBounds.y + fieldBounds.height;
        };

        return this._fields.find((field) => isInsideBounds(field.getBounds()));
    }

    public resetFieldByCoord(coord: ChessCoordinate) {
        this._fields = this._fields.map((field) => {
            if (field.getCoord() === coord) {
                field.setChessman(null);

                return field;
            }

            return field;
        });
    }
}
