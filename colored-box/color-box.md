# Coding Challenge: Render and Manipulate Boxes

## Objective
Develop a React application that consumes data from a provided API and renders interactive boxes on the screen. Users must be able to select boxes and modify their properties using a persistent menu/toolbar.

## API Details
**Endpoint:** 
use the mockApi.ts file

The API returns a JSON array of objects. Each object represents a box with the following randomized properties:

- **size**: The dimensions of the box (width and height in pixels).
- **color**: The initial color string of the box (red, blue, green, or purple).
- **x**: The X-coordinate for horizontal placement on the screen (0−500).
- **y**: The Y-coordinate for vertical placement on the screen (0−500).

## Functional Requirements

### 1. Render Boxes
- Fetch data from the API endpoint.
- Render the boxes on the screen matching the exact position (x, y), size, and color provided in the data.

### 2. Box Selection
- **Single Selection**: Users should be able to click on a single box to select it.
- **Multi-Selection**: Users must be able to select multiple boxes simultaneously by holding the Shift key while clicking.

### 3. Change Box Color
- Display a fixed menu or toolbar with options for Red, Blue, Green, and Purple.
- When a user selects a new color from the menu, the change should apply to all currently selected boxes.

### 4. Real-time Interaction
- Any color changes must be applied in real-time, reflecting immediately on the UI without requiring a page refresh.

## Technical Restrictions
- The application must be built using React.
- The use of external libraries for basic functionality (like selection logic) is discouraged to demonstrate core React proficiency.