import { ChessCoordinate, Piece, PlayerType } from '../utils';

import { Sprite } from 'pixi.js';
import Chessman from '../Chessman';
import { Singleton } from '../Singleton';

export default class Queen extends Chessman {
    public type: PlayerType;

    constructor(index: number, type: PlayerType = 'black') {
        super(index, type, 'queen');

        this.type = type;
        this._sprite = Sprite.from(
            `chessman/${Queen.name.toLowerCase()}_${type === 'black' ? 'b' : 'w'}${Singleton.SPRITES_TYPE}`,
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

    onClick = () => {
        super.onClick(this.queenPossibleMoves);
    };

    // Chat GPT-4 code generated.
    /**
     *
     * @param currentCoordinate
     * @param pieces
     * @returns [possibleMoves, beatMoves]
     */
    private queenPossibleMoves = (
        currentCoordinate: ChessCoordinate,
        pieces: Piece[],
    ): [ChessCoordinate[], ChessCoordinate[]] => {
        const columns: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
        const rows: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7 };

        const possibleMoves: ChessCoordinate[] = [];
        const beatMoves: ChessCoordinate[] = [];

        const currentColumn = currentCoordinate[0];
        const currentRow = currentCoordinate[1];
        const currentColumnIndex = columns[currentColumn];
        const currentRowIndex = rows[currentRow];

        const directions = [
            [1, 0], // right
            [-1, 0], // left
            [0, 1], // up
            [0, -1], // down
            [1, 1], // up-right diagonal
            [-1, -1], // down-left diagonal
            [1, -1], // down-right diagonal
            [-1, 1], // up-left diagonal
        ];

        for (const [columnChange, rowChange] of directions) {
            let newColumnIndex = currentColumnIndex;
            let newRowIndex = currentRowIndex;

            while (true) {
                newColumnIndex += columnChange;
                newRowIndex += rowChange;

                if (newColumnIndex >= 0 && newColumnIndex < 8 && newRowIndex >= 0 && newRowIndex < 8) {
                    const newColumn = Object.keys(columns)[newColumnIndex];
                    const newRow = Object.keys(rows)[newRowIndex];
                    const newCoordinate: ChessCoordinate = `${newColumn}${newRow}` as ChessCoordinate;

                    const pieceAtNewCoordinate = pieces.find((piece) => piece.coordinate === newCoordinate);

                    if (pieceAtNewCoordinate) {
                        if (pieceAtNewCoordinate.isEnemy) {
                            beatMoves.push(newCoordinate);
                        }
                        break; // Stop moving in this direction after encountering a piece
                    } else {
                        possibleMoves.push(newCoordinate);
                    }
                } else {
                    break; // Stop if the new coordinate is out of bounds
                }
            }
        }

        return [possibleMoves, beatMoves];
    };
}
