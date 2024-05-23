export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROWS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export type ChessCoordinate =
    `${'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'}${'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'}`;

export type ChessmanType = 'rook' | 'knight' | 'king' | 'queen' | 'pawn' | 'bishop' | 'none';

export type FieldType = 'white' | 'black' | 'none';
export type PlayerType = FieldType;

export type Position = {
    x: number;
    y: number;
};

export type ChessField = {
    name: ChessCoordinate;
    x: number;
    y: number;
    type: FieldType;
};

export interface Piece {
    coordinate: ChessCoordinate;
    isEnemy: boolean;
}

export function buildChessboardData(): ChessField[] {
    const squares: ChessField[] = [];
    let typeFlag: FieldType = 'black';

    const changeFlag = (typeFlag: FieldType): FieldType => (typeFlag === 'black' ? 'white' : 'black');

    for (let column = 0; column < COLUMNS.length; column++) {
        for (let row = 0; row < ROWS.length; row++) {
            squares.push({
                name: `${COLUMNS[column]}${ROWS[row]}` as ChessCoordinate,
                x: column * 50,
                y: row * 50,
                type: typeFlag,
            });
            typeFlag = changeFlag(typeFlag);
        }
        typeFlag = changeFlag(typeFlag);
    }

    return squares;
}

export type PawnPosition = {
    name: string;
    pawn: any;
    type: FieldType;
};
