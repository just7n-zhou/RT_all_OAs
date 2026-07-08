import type { Weather } from "../../data/weatherData";
import "./index.css";

interface WeatherCardProps {
  weather: Weather;
  unit: "C" | "F";
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  const handleFavoriteClick = () => {
    if(!isFavorite){
      onAddFavorite(weather.id);
    } else {
      onRemoveFavorite(weather.id);
    }
  };
  
  const convertCtoF = (temp:number) => {
    return ((temp * 9) / 5 + 32).toFixed(1);
  }

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      <td>{unit === "C" ? `${weather.temperature} °C` : `${convertCtoF(weather.temperature)} °F`}</td>
      <td>{weather.description}</td>
      <td>
        <button
          onClick={handleFavoriteClick}
          data-testid={`weather-card-action-${weather.id}`}
        >
          {isFavorite ? ("Remove from favorites") : ("Add to favorites")}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;
