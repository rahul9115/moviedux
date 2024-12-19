// import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
// import './styles.css'
import Header from './components/Header';
import MoviesGrid from './components/MoviesGrid';

function App() {
  return (
    <div className="App">
      <header className="container">
        <Header></Header>
        
      </header>
      <MoviesGrid></MoviesGrid>
      <Footer></Footer>
    </div>
  );
}

export default App;
