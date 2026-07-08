# Weather Dashboard - Project Instructions

## Overview
Design a weather dashboard app that allows users to search for weather information by city name and to manage a list of favorite cities. The app should be built using TypeScript and React.

## Components

The application has two components: **WeatherList** and **WeatherCard**, where their respective functionalities should be implemented.

### WeatherCard Component

The WeatherCard component should:
- display city name, temperature, and weather description.
- provide the ability to add or remove a city from the favorites list.
- The button should:
  - have the text value "Add to favorites".
  - add a city to the favorites list.
- The button should:
  - have the text value "Remove from favorites".
  - remove a city from the favorites list.

### WeatherList Component

The WeatherList component should:
- display a search input field to search for a city's weather information.
- display search results with city name, temperature, and a weather description.
- allow users to switch between Celsius and Fahrenheit temperatures. The default temperature unit is Celsius.
- enable users to add a city to their favorites list.
- enable users to remove a city from their favorites list using the "Remove from favorites" button available in both search results and the favorites table.
- update the temperature values in both search results and the favorites list when switching between Celsius and Fahrenheit, rounding the values to 1 decimal place.

## Data

### weatherData.ts type file

- Use weatherData from the src/data/weatherData.ts file to display the weather information for all the cities.
- The temperature data in weatherData is in Celsius.
- Use this formula to convert Celsius to Fahrenheit: Fahrenheit = (Celsius * 9/5) + 32

## Testing Requirements

The following data-testid attributes are required in the components for the tests to pass:

| Attribute | Component |
|-----------|-----------|
| search-input | Search input field |
| clear-search-button | Clear search button |
| unit-change-button | Unit change button |
| favorites | Favorites container |
| search-results | Search results container |

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. The app will be available at http://localhost:5173

## Project Structure

```
src/
├── components/
│   ├── WeatherCard/
│   │   └── index.tsx
│   └── WeatherList/
│       └── index.tsx
├── data/
│   └── weatherData.ts
├── App.tsx
├── App.css
└── main.tsx
```

## Notes

- Certain core React functionalities are already implemented.
- Focus on implementing the component logic and state management.
- Make sure all data-testid attributes are correctly applied for testing purposes.
