import { Sprite } from 'pixi.js';
import { ChessCoordinate, Piece, PlayerType } from '../utils';
import Chessman from '../Chessman';
import { Singleton } from '../Singleton';

export default class King extends Chessman {
    public type: PlayerType;

    constructor(index: number, type: PlayerType = 'black') {
        super(index, type, 'king');

        this.type = type;
        this._sprite = Sprite.from(
            `chessman/${King.name.toLowerCase()}_${type === 'black' ? 'b' : 'w'}${Singleton.SPRITES_TYPE}`,
        );
        this._sprite.anchor.set(0.5);
        this._sprite.width = 40;
        this._sprite.height = 40;
        this.addChild(this._sprite);

        this.on('pointerdown', this.onClick);
        this.on('pointerup', this.onDragEnd);
        this.on('pointermove', this.onDragMove);
        this.on('pointerupoutside', this.onDragEnd);
    }

    public onClick = () => {
        super.onClick(this.kingPossibleMoves);
    };

    // Chat GPT-4 code generated.
    /**
     *
     * @param currentCoordinate
     * @param pieces
     * @returns [possibleMoves, beatMoves]
     */
    private kingPossibleMoves = (
        currentCoordinate: ChessCoordinate,
        pieces: Piece[],
    ): [ChessCoordinate[], ChessCoordinate[]] => {
        const [currentColumn, currentRow] = currentCoordinate;

        const columns: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
        const rows: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7 };

        const possibleMoves: ChessCoordinate[] = [];
        const beatMoves: ChessCoordinate[] = [];

        const columnChanges = [-1, 0, 1];
        const rowChanges = [-1, 0, 1];

        for (const columnChange of columnChanges) {
            for (const rowChange of rowChanges) {
                const newColumnIndex = columns[currentColumn] + columnChange;
                const newRowindex = rows[currentRow] + rowChange;

                if (newColumnIndex >= 0 && newColumnIndex < 8 && newRowindex >= 0 && newRowindex < 8) {
                    if (columnChange === 0 && rowChange === 0) {
                        continue;
                    }

                    const newColumn = Object.keys(columns)[newColumnIndex];
                    const newRow = Object.keys(rows)[newRowindex];
                    const newCoordinate: ChessCoordinate = `${newColumn}${newRow}` as ChessCoordinate;

                    const pieceAtNewCoordinate = pieces.find((piece) => piece.coordinate === newCoordinate);

                    if (pieceAtNewCoordinate) {
                        if (pieceAtNewCoordinate.isEnemy) {
                            beatMoves.push(newCoordinate);
                        }
                    } else {
                        possibleMoves.push(newCoordinate);
                    }
                }
            }
        }

        return [possibleMoves, beatMoves];
    };
}
