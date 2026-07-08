import "./index.css";
import WeatherCard from "../WeatherCard";
import { weatherData } from "../../data/weatherData";
import type { Weather } from "../../data/weatherData";
import { useState } from "react";

const WeatherList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<Weather[]>(weatherData);
  const [isCelsius, setIsCelsius] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const favoriteWeathers = weatherData.filter((weather)=>favoriteIds.includes(weather.id));

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value);
    const res = weatherData.filter((weather)=>weather.city.toLowerCase().includes(value.toLowerCase()));
    setSearchResult(res);
  };
  const handleClearSearch = () => {
    setSearchInput('');
    setSearchResult(weatherData);
  };
  const handleUnitChange = () => {setIsCelsius(!isCelsius)};
  const handleSwitchToFavorites = () => {};
  const handleAddToFavorites = (id: number) => {setFavoriteIds((prev)=>(prev.includes(id) ? [...prev] : [...prev, id]))};
  const handleRemoveFromFavorites = (id: number) => {setFavoriteIds((prev)=>(prev.filter((cityId)=>cityId !== id)))};

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">
        Search for Current Temperature in cities like: New York, London, Paris
        etc.
      </p>

      <div className="search-section">
        <div className="search-row">
          <input 
            type="text" 
            placeholder="Search City" 
            data-testid="search-input" 
            onChange={handleSearch}
            value={searchInput}
          />
          <button 
            className="btn-primary" 
            data-testid="clear-search-button"
            onClick={handleClearSearch}
          >
            Clear search
          </button>
        </div>

        <div className="temperature-section">
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Temperature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((weather)=>
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  unit={isCelsius ? "C" : "F"}
                  onAddFavorite={handleAddToFavorites}
                  onRemoveFavorite={handleRemoveFromFavorites}
                  isFavorite={false}
                />
              )}
            </tbody>
          </table>
          <button className="btn-primary" data-testid="unit-change-button" onClick={handleUnitChange}>
            Switch to { isCelsius ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
      </div>

      <div data-testid="search-results"></div>

      <div className="favorites-section" data-testid="favorites">
        <h2 className="section-title">Favorite Cities</h2>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favoriteWeathers.map((weather)=>
              <WeatherCard
                key={weather.id}
                weather={weather}
                unit={isCelsius ? "C" : "F"}
                onAddFavorite={handleAddToFavorites}
                onRemoveFavorite={handleRemoveFromFavorites}
                isFavorite={true}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
