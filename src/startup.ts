import Bishop from './cheesman/Bishop';
import King from './cheesman/King';
import Knight from './cheesman/Knight';
import Pawn from './cheesman/Pawn';
import Queen from './cheesman/Queen';
import Rook from './cheesman/Rook';
import { PawnPosition } from './utils';

export const WHITE_START_SETUP: PawnPosition[] = [
    { name: 'A1', pawn: Rook, type: 'white' },
    { name: 'B1', pawn: Knight, type: 'white' },
    { name: 'C1', pawn: Bishop, type: 'white' },
    { name: 'D1', pawn: Queen, type: 'white' },
    { name: 'E1', pawn: King, type: 'white' },
    { name: 'F1', pawn: Bishop, type: 'white' },
    { name: 'G1', pawn: Knight, type: 'white' },
    { name: 'H1', pawn: Rook, type: 'white' },
    { name: 'A2', pawn: Pawn, type: 'white' },
    { name: 'B2', pawn: Pawn, type: 'white' },
    { name: 'C2', pawn: Pawn, type: 'white' },
    { name: 'D2', pawn: Pawn, type: 'white' },
    { name: 'E2', pawn: Pawn, type: 'white' },
    { name: 'F2', pawn: Pawn, type: 'white' },
    { name: 'G2', pawn: Pawn, type: 'white' },
    { name: 'H2', pawn: Pawn, type: 'white' },
];

export const BLACK_START_SETUP: PawnPosition[] = [
    { name: 'A8', pawn: Rook, type: 'black' },
    { name: 'B8', pawn: Knight, type: 'black' },
    { name: 'C8', pawn: Bishop, type: 'black' },
    { name: 'D8', pawn: Queen, type: 'black' },
    { name: 'E8', pawn: King, type: 'black' },
    { name: 'F8', pawn: Bishop, type: 'black' },
    { name: 'G8', pawn: Knight, type: 'black' },
    { name: 'H8', pawn: Rook, type: 'black' },
    { name: 'A7', pawn: Pawn, type: 'black' },
    { name: 'B7', pawn: Pawn, type: 'black' },
    { name: 'C7', pawn: Pawn, type: 'black' },
    { name: 'D7', pawn: Pawn, type: 'black' },
    { name: 'E7', pawn: Pawn, type: 'black' },
    { name: 'F7', pawn: Pawn, type: 'black' },
    { name: 'G7', pawn: Pawn, type: 'black' },
    { name: 'H7', pawn: Pawn, type: 'black' },
];
