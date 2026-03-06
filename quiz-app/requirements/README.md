# Quiz App

Build a simple quiz application that displays multiple-choice questions and tracks the user's score.

## Requirements

### Functionality
1. Display one question at a time with multiple-choice options
2. Allow the user to select one answer using radio buttons
3. Provide a Submit button that is disabled until an option is selected
4. Show feedback ("Correct!" or "Incorrect!") after submission
5. Automatically move to the next question after 1 second
6. Display the final score when all questions are completed
7. Use React's `useState` hooks for state management

### Technical Requirements
- Radio inputs must have unique IDs starting from `option1`, `option2`, etc.
- The Submit button should be disabled when no option is selected
- Questions should be stored in a separate data file
- Use TypeScript for type safety

### Styling
- Clean, minimal design with a bordered container
- Blue submit button that turns gray when disabled
- Clear visual feedback for user interactions

## Getting Started

```bash
npm install
npm run dev
```

## Running Tests

```bash
npm test
```
