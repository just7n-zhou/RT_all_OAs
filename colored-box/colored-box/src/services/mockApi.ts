// Mock API function to simulate fetching boxes data
const colors = ["red", "blue", "green", "purple"];

// Random number generator function
const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fetchBoxes = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate 30-40 random boxes
  const boxCount = randomBetween(10, 20);
  const boxes = [];

  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      size: randomBetween(40, 100),
      color: colors[randomBetween(0, colors.length - 1)],
      x: randomBetween(0, 500),
      y: randomBetween(0, 500),
    });
  }

  return boxes;
};
