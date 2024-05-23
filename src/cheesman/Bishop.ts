import { Sprite } from 'pixi.js';
import { ChessCoordinate, Piece, PlayerType } from '../utils';
import Chessman from '../Chessman';
import { Singleton } from '../Singleton';

export default class Bishop extends Chessman {
    public type: PlayerType;

    constructor(index: number, type: PlayerType = 'black') {
        super(index, type, 'bishop');

        this.type = type;
        this._sprite = Sprite.from(
            `chessman/${Bishop.name.toLowerCase()}_${type === 'black' ? 'b' : 'w'}${Singleton.SPRITES_TYPE}`,
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
        super.onClick(this.bishopPossibleMoves);
    };

    // Chat GPT-4 code generated.
    /**
     *
     * @param currentCoordinate
     * @param pieces
     * @returns [possibleMoves, beatMoves]
     */
    private bishopPossibleMoves = (
        currentCoordinate: ChessCoordinate,
        pieces: Piece[],
    ): [ChessCoordinate[], ChessCoordinate[]] => {
        const [currentColumn, currentRow] = currentCoordinate;

        const columns: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
        const rows: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7 };
        const rowNumbers: Record<number, string> = { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8' };

        const possibleMoves: ChessCoordinate[] = [];
        const beatMoves: ChessCoordinate[] = [];

        const directions = [
            [1, 1], // up-right diagonal
            [-1, -1], // down-left diagonal
            [1, -1], // down-right diagonal
            [-1, 1], // up-left diagonal
        ];

        const piecePositions: Record<string, Piece> = {};
        for (const piece of pieces) {
            piecePositions[piece.coordinate] = piece;
        }

        for (const [columnChange, rowChange] of directions) {
            let newColumnIndex = columns[currentColumn];
            let newRowIndex = rows[currentRow];

            while (true) {
                newColumnIndex += columnChange;
                newRowIndex += rowChange;

                if (newColumnIndex >= 0 && newColumnIndex < 8 && newRowIndex >= 0 && newRowIndex < 8) {
                    const newColumn = Object.keys(columns)[newColumnIndex];
                    const newRow = rowNumbers[newRowIndex];
                    const newCoordinate = `${newColumn}${newRow}` as ChessCoordinate;

                    if (newCoordinate in piecePositions) {
                        const piece = piecePositions[newCoordinate];
                        if (piece.isEnemy) {
                            beatMoves.push(newCoordinate);
                        }
                        break;
                    } else {
                        possibleMoves.push(newCoordinate);
                    }
                } else {
                    break;
                }
            }
        }

        return [possibleMoves, beatMoves];
    };
}
