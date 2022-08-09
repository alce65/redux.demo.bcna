import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RestRepository } from '../../../../app/repositories/rest.repository';
import { RootState } from '../../../../app/store';
import { Note } from '../../models/Note';
import * as act from '../../reducer/action.creators';

// const initialNotes = [{ id: '1', title: 'Nota 1', content: 'Bla, bla , bla' }];
const newNote = {
    title: 'Nota Nueva',
    content: 'Bla, bla , bla, bla',
};
const newNoteModify = {
    id: '1',
    title: 'Nota Nueva Modificada',
};

export function Notes() {
    // const [perritosState, setStatePerritos] = useState()
    // En no - redux usaríamos:
    // const [gatitosState, dispatch] = useContext('Gatitos')

    const notes = useSelector((state: RootState) => state.notes);
    // const couunter = useSelector((state: RootState) => state.counter);

    const dispatch = useDispatch();
    const url = 'http://localhost:3456/notes/';
    const repoNotes = useMemo(
        () => new RestRepository<Note, Response>(url),
        []
    );

    useEffect(() => {
        repoNotes
            .getAll()
            .then((notes) => dispatch(act.loadNotesAction(notes)));
    }, [dispatch, repoNotes]);

    const handleAdd = async () => {
        const data = await repoNotes.add(newNote);
        dispatch(act.createNoteAction(data));
    };
    const handleModify = () => {
        repoNotes
            .update(newNoteModify)
            .then((data) => dispatch(act.updateNoteAction(data)));
    };

    const handleDelete = () => {
        const deleteID = '4';
        repoNotes.delete(deleteID).then((response) => {
            console.log({ response });
            if (response.ok) {
                dispatch(act.deleteNoteAction(deleteID));
            }
        });
    };

    return (
        <>
            <ul>
                {notes.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <div>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleModify}>Modify</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </>
    );
}
