import { render, waitFor } from '../../reducer/test-utils';
import { RestRepository } from '../../../../app/repositories/rest.repository';
/// import { useDispatch } from 'react-redux';
import { Notes } from './Notes';
import { Note } from '../../models/Note';
import { store } from '../../../../app/store';

const mockDispatch = jest.fn();
jest.mock('../../../../app/repositories/rest.repository');
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

describe('Given the component Notes', () => {
    // beforeAll(() => {
    //     mockDispatch = jest.fn();
    // })
    describe('When...', () => {
        let preloadedState: Array<Note>;
        let initialNote: Note;
        //let store: RootState;

        beforeEach(() => {
            initialNote = { id: '1', title: 'Nota test', content: '' };
            preloadedState = [initialNote];
            //store = store
        });
        test('should first', async () => {
            RestRepository.prototype.getAll = jest.fn().mockResolvedValue([]);
            render(<Notes></Notes>, { preloadedState, store });
            await waitFor(() => {
                expect(mockDispatch).toHaveBeenCalled();
            });
        });

        // test('boton', async () => {
        //     RestRepository.prototype.add = jest
        //         .fn()
        //         .mockResolvedValue(initialNote);
        //     render(<Notes></Notes>, { preloadedState, store });

        //     await waitFor(() => {
        //         expect(mockDispatch).toHaveBeenCalled();
        //     });
        // });
    });
});
