import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WeatherList from './index'

describe('WeatherList Component', () => {
  it('filters cities based on search input', async () => {
    const user = userEvent.setup()
    render(<WeatherList />)
    const searchInput = screen.getByTestId('search-input')
    
    await user.type(searchInput, 'London')
    
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.queryByText('New York')).not.toBeInTheDocument()
  })

  it('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<WeatherList />)
    const searchInput = screen.getByTestId('search-input')
    const clearButton = screen.getByTestId('clear-search-button')
    
    await user.type(searchInput, 'London')
    fireEvent.click(clearButton)
    
    expect(searchInput).toHaveValue('')
    expect(screen.getByText('New York')).toBeInTheDocument()
  })

  it('switches temperature unit when unit button is clicked', () => {
    render(<WeatherList />)
    const unitButton = screen.getByTestId('unit-change-button')
    
    expect(unitButton).toHaveTextContent('Switch to Fahrenheit')
    
    fireEvent.click(unitButton)
    
    expect(unitButton).toHaveTextContent('Switch to Celsius')
    expect(screen.getByText('64.4 °F')).toBeInTheDocument()
  })

  it('adds city to favorites when "Add to favorites" is clicked', () => {
    render(<WeatherList />)
    
    const addButton = screen.getAllByText('Add to favorites')[0]
    fireEvent.click(addButton)
    
    const favoritesSection = screen.getByTestId('favorites')
    expect(favoritesSection).toHaveTextContent('New York')
  })

  it('removes city from favorites when "Remove from favorites" is clicked', () => {
    render(<WeatherList />)
    
    const addButton = screen.getAllByText('Add to favorites')[0]
    fireEvent.click(addButton)
    
    const removeButton = screen.getByText('Remove from favorites')
    fireEvent.click(removeButton)
    
    const favoritesSection = screen.getByTestId('favorites')
    const favoriteRows = favoritesSection.querySelectorAll('tbody tr')
    expect(favoriteRows.length).toBe(0)
  })

  it('displays all cities initially', () => {
    render(<WeatherList />)
    
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Tokyo')).toBeInTheDocument()
    expect(screen.getByText('Sydney')).toBeInTheDocument()
    expect(screen.getByText('Moscow')).toBeInTheDocument()
  })
})
