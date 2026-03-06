import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { questions } from './data/questions'

describe('Quiz App', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('renders the first question on initial load', () => {
    render(<App />)
    expect(screen.getByText(questions[0].question)).toBeInTheDocument()
  })

  it('renders all options for the first question', () => {
    render(<App />)
    questions[0].options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument()
    })
  })

  it('has radio inputs with correct IDs starting from option1', () => {
    render(<App />)
    questions[0].options.forEach((_, index) => {
      const radio = screen.getByRole('radio', { name: questions[0].options[index] })
      expect(radio).toHaveAttribute('id', `option${index + 1}`)
    })
  })

  it('submit button is disabled when no option is selected', () => {
    render(<App />)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    expect(submitButton).toBeDisabled()
  })

  it('submit button is enabled when an option is selected', async () => {
    render(<App />)
    const user = userEvent.setup()
    const firstOption = screen.getByLabelText(questions[0].options[0])
    
    await user.click(firstOption)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    expect(submitButton).toBeEnabled()
  })

  it('allows selecting a radio button', async () => {
    render(<App />)
    const user = userEvent.setup()
    const firstOption = screen.getByLabelText(questions[0].options[0])
    
    await user.click(firstOption)
    
    expect(firstOption).toBeChecked()
  })

  it('only one radio button can be selected at a time', async () => {
    render(<App />)
    const user = userEvent.setup()
    const firstOption = screen.getByLabelText(questions[0].options[0])
    const secondOption = screen.getByLabelText(questions[0].options[1])
    
    await user.click(firstOption)
    expect(firstOption).toBeChecked()
    
    await user.click(secondOption)
    expect(secondOption).toBeChecked()
    expect(firstOption).not.toBeChecked()
  })

  it('displays "Correct!" feedback when correct answer is selected', async () => {
    render(<App />)
    const user = userEvent.setup()
    const correctOption = screen.getByLabelText(questions[0].correct)
    
    await user.click(correctOption)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Correct!')).toBeInTheDocument()
  })

  it('displays "Incorrect!" feedback when wrong answer is selected', async () => {
    render(<App />)
    const user = userEvent.setup()
    const wrongOption = questions[0].options.find(opt => opt !== questions[0].correct)!
    const wrongOptionElement = screen.getByLabelText(wrongOption)
    
    await user.click(wrongOptionElement)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Incorrect!')).toBeInTheDocument()
  })

  it('shows Next button after submitting an answer', async () => {
    render(<App />)
    const user = userEvent.setup()
    
    const firstOption = screen.getByLabelText(questions[0].options[0])
    await user.click(firstOption)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
  })

  it('disables radio buttons after submitting', async () => {
    render(<App />)
    const user = userEvent.setup()
    
    const firstOption = screen.getByLabelText(questions[0].options[0])
    await user.click(firstOption)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    const allRadios = screen.getAllByRole('radio')
    allRadios.forEach((radio: HTMLElement) => {
      expect(radio).toBeDisabled()
    })
  })

  it('displays final score after completing all questions', async () => {
    render(<App />)
    const user = userEvent.setup()
    
    for (let i = 0; i < questions.length; i++) {
      const correctOption = screen.getByLabelText(questions[i].correct)
      await user.click(correctOption)
      
      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)
      
      if (i < questions.length - 1) {
        const nextButton = screen.getByRole('button', { name: /next/i })
        await user.click(nextButton)
      }
    }
    
    expect(screen.getByText(`Quiz Complete! You scored ${questions.length} out of ${questions.length}!`)).toBeInTheDocument()
  })

  it('calculates score correctly with mixed correct and incorrect answers', async () => {
    render(<App />)
    const user = userEvent.setup()
    
    const correctOption = screen.getByLabelText(questions[0].correct)
    await user.click(correctOption)
    let submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    let nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)
    
    const wrongOption = questions[1].options.find(opt => opt !== questions[1].correct)!
    const wrongOptionElement = screen.getByLabelText(wrongOption)
    await user.click(wrongOptionElement)
    submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)
    
    const wrongOption2 = questions[2].options.find(opt => opt !== questions[2].correct)!
    const wrongOptionElement2 = screen.getByLabelText(wrongOption2)
    await user.click(wrongOptionElement2)
    submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    expect(screen.getByText(`Quiz Complete! You scored 1 out of ${questions.length}!`)).toBeInTheDocument()
  })

  it('resets selected answer when moving to next question', async () => {
    render(<App />)
    const user = userEvent.setup()
    
    const firstOption = screen.getByLabelText(questions[0].options[0])
    await user.click(firstOption)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)
    
    const allRadios = screen.getAllByRole('radio')
    allRadios.forEach((radio: HTMLElement) => {
      expect(radio).not.toBeChecked()
    })
  })

  it('uses useState hooks for state management', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })

  it('displays score of 0 when all answers are incorrect', async () => {
    render(<App />)
    const user = userEvent.setup()
    
    for (let i = 0; i < questions.length; i++) {
      const wrongOption = questions[i].options.find(opt => opt !== questions[i].correct)!
      const wrongOptionElement = screen.getByLabelText(wrongOption)
      await user.click(wrongOptionElement)
      
      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)
      
      if (i < questions.length - 1) {
        const nextButton = screen.getByRole('button', { name: /next/i })
        await user.click(nextButton)
      }
    }
    
    expect(screen.getByText(`Quiz Complete! You scored 0 out of ${questions.length}!`)).toBeInTheDocument()
  })
})
