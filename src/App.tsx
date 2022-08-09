import logo from './logo.svg';
import './App.css';
import { Notes } from './features/notes/components/Notes/Notes';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Learning Redux</p>
            </header>
            <Notes></Notes>
        </div>
    );
}

export default App;
