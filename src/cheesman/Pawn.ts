import { Sprite } from 'pixi.js';
import { ChessCoordinate, FieldType, Piece, PlayerType } from '../utils';
import Chessman from '../Chessman';
import { Singleton } from '../Singleton';

export default class Pawn extends Chessman {
    public type: PlayerType;

    constructor(index: number, type: PlayerType = 'black') {
        super(index, type, 'pawn');

        this.type = type;
        this._sprite = Sprite.from(
            `chessman/${Pawn.name.toLowerCase()}_${type === 'black' ? 'b' : 'w'}${Singleton.SPRITES_TYPE}`,
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
        super.onClick(this.pawnPossibleMoves);
    };

    // Chat GPT-4 code generated.
    /**
     *
     * @param currentCoordinate
     * @param pieces
     * @returns [possibleMoves, beatMoves]
     */
    private pawnPossibleMoves = (
        currentCoordinate: ChessCoordinate,
        pieces: Piece[],
        currentCoordinateType?: FieldType,
    ): [ChessCoordinate[], ChessCoordinate[]] => {
        const columns: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
        const rows: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7 };

        const possibleMoves: ChessCoordinate[] = [];
        const beatMoves: ChessCoordinate[] = [];

        const currentColumn = currentCoordinate[0];
        const currentRow = currentCoordinate[1];
        const currentColumnIndex = columns[currentColumn];
        const currentRowIndex = rows[currentRow];

        // Define the forward move and diagonal captures based on the color of the pawn
        const forwardMove = currentCoordinateType === 'white' ? [0, 1] : [0, -1];
        const doubleForwardMove = currentCoordinateType === 'white' ? [0, 2] : [0, -2];
        const captureMoves =
            currentCoordinateType === 'white'
                ? [
                      [-1, 1],
                      [1, 1],
                  ] // white moves up
                : [
                      [-1, -1],
                      [1, -1],
                  ]; // black moves down

        // Determine if the pawn is on its starting row
        const startingRow = currentCoordinateType === 'white' ? '2' : '7';

        // Forward move
        let newColumnIndex = currentColumnIndex + forwardMove[0];
        let newRowIndex = currentRowIndex + forwardMove[1];

        if (newColumnIndex >= 0 && newColumnIndex < 8 && newRowIndex >= 0 && newRowIndex < 8) {
            const newColumn = Object.keys(columns)[newColumnIndex];
            const newRow = Object.keys(rows)[newRowIndex];
            const newCoordinate: ChessCoordinate = `${newColumn}${newRow}` as ChessCoordinate;

            const pieceAtNewCoordinate = pieces.find((piece) => piece.coordinate === newCoordinate);

            if (!pieceAtNewCoordinate) {
                possibleMoves.push(newCoordinate);
            }
        }

        // Double forward move if on starting row
        if (currentRow === startingRow) {
            newColumnIndex = currentColumnIndex + doubleForwardMove[0];
            newRowIndex = currentRowIndex + doubleForwardMove[1];

            if (newColumnIndex >= 0 && newColumnIndex < 8 && newRowIndex >= 0 && newRowIndex < 8) {
                const newColumn = Object.keys(columns)[newColumnIndex];
                const newRow = Object.keys(rows)[newRowIndex];
                const newCoordinate: ChessCoordinate = `${newColumn}${newRow}` as ChessCoordinate;

                const pieceAtNewCoordinate = pieces.find((piece) => piece.coordinate === newCoordinate);
                const pieceAtIntermediateCoordinate = pieces.find(
                    (piece) =>
                        piece.coordinate ===
                        `${Object.keys(columns)[currentColumnIndex + forwardMove[0]]}${Object.keys(rows)[currentRowIndex + forwardMove[1]]}`,
                );

                if (!pieceAtNewCoordinate && !pieceAtIntermediateCoordinate) {
                    possibleMoves.push(newCoordinate);
                }
            }
        }

        // Capture moves
        for (const [columnChange, rowChange] of captureMoves) {
            newColumnIndex = currentColumnIndex + columnChange;
            newRowIndex = currentRowIndex + rowChange;

            if (newColumnIndex >= 0 && newColumnIndex < 8 && newRowIndex >= 0 && newRowIndex < 8) {
                const newColumn = Object.keys(columns)[newColumnIndex];
                const newRow = Object.keys(rows)[newRowIndex];
                const newCoordinate: ChessCoordinate = `${newColumn}${newRow}` as ChessCoordinate;

                const pieceAtNewCoordinate = pieces.find((piece) => piece.coordinate === newCoordinate);

                if (pieceAtNewCoordinate && pieceAtNewCoordinate.isEnemy) {
                    beatMoves.push(newCoordinate);
                }
            }
        }

        return [possibleMoves, beatMoves];
    };
}
