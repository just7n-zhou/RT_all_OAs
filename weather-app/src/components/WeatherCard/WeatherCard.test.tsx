import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import WeatherCard from './index'
import type { Weather } from '../../data/weatherData'

describe('WeatherCard Component', () => {
  const mockWeather: Weather = {
    id: 1,
    city: 'New York',
    temperature: 18,
    description: 'Sunny'
  }

  const mockOnAddFavorite = vi.fn()
  const mockOnRemoveFavorite = vi.fn()

  it('renders city name, temperature, and description', () => {
    render(
      <WeatherCard
        weather={mockWeather}
        unit="C"
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    )

    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('18 °C')).toBeInTheDocument()
    expect(screen.getByText('Sunny')).toBeInTheDocument()
  })

  it('displays temperature in Fahrenheit when unit is "F"', () => {
    render(
      <WeatherCard
        weather={mockWeather}
        unit="F"
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    )

    expect(screen.getByText('64.4 °F')).toBeInTheDocument()
  })

  it('displays "Add to favorites" button when city is not a favorite', () => {
    render(
      <WeatherCard
        weather={mockWeather}
        unit="C"
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    )

    expect(screen.getByText('Add to favorites')).toBeInTheDocument()
  })

  it('displays "Remove from favorites" button when city is a favorite', () => {
    render(
      <WeatherCard
        weather={mockWeather}
        unit="C"
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={true}
      />
    )

    expect(screen.getByText('Remove from favorites')).toBeInTheDocument()
  })

  it('calls onAddFavorite with cityId when "Add to favorites" button is clicked', () => {
    render(
      <WeatherCard
        weather={mockWeather}
        unit="C"
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    )

    const button = screen.getByText('Add to favorites')
    fireEvent.click(button)

    expect(mockOnAddFavorite).toHaveBeenCalledWith(1)
  })

  it('calls onRemoveFavorite with cityId when "Remove from favorites" button is clicked', () => {
    render(
      <WeatherCard
        weather={mockWeather}
        unit="C"
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={true}
      />
    )

    const button = screen.getByText('Remove from favorites')
    fireEvent.click(button)

    expect(mockOnRemoveFavorite).toHaveBeenCalledWith(1)
  })
})
