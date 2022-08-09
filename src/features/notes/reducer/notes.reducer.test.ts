import { Note } from '../models/Note';
import { notesReducer } from './notes.reducer';

describe('Given the reducer ...', () => {
    test('tesat', () => {
        // arrange
        const previousState: Array<Note> = [];
        const action = { type: '' };
        // act
        const result = notesReducer(previousState, action);
        // assert
        expect(result).toStrictEqual(previousState);
    });
});
