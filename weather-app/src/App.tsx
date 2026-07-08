import "./App.css";
import WeatherList from "./components/WeatherList";

function App() {
  return (
    <div className="App">
      <header data-testid="navbar">Weather Dashboard</header>
      <WeatherList />
    </div>
  );
}

export default App;
