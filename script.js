// Helper function to calculate position based on angle and radius
function calculatePosition(centerX, centerY, radius, angle) {
  const radians = (angle - 90) * (Math.PI / 180); // Offset by -90 degrees to start at the top
  const x = centerX + radius * Math.cos(radians);
  const y = centerY + radius * Math.sin(radians);
  return { x, y };
}

// Function to generate pie chart sectors
function generatePieChart(id, sectors) {
  const chart = document.getElementById(id);
  if (!chart) return; // Guard clause if element is not found

  sectors.forEach(sector => {
    const div = document.createElement('div');
    div.classList.add('sector');
    div.style.setProperty('--s', `${sector.angle}deg`);
    div.style.backgroundColor = sector.color;
    chart.appendChild(div);
  });
}

// Function to create sectors with alternating colors
function generateSectors(color1, color2) {
  const sectors = [];
  for (let i = 0; i < 20; i++) {
    sectors.push({
      angle: -9.5 + (i * 18), // Adjusted angle for 20 sectors
      color: i % 2 === 0 ? color1 : color2
    });
  }
  return sectors;
}

// General function to generate numbers (single, double, triple)
function generateNumbers(overlayId, numbers, radius, className, multiplier = 1) {
  const overlayContent = document.getElementById(overlayId);
  if (!overlayContent) return; // Guard clause if element is not found

  const totalNumbers = numbers.length;
  const angleIncrement = 360 / totalNumbers;

  numbers.forEach((number, index) => {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add(className);
    numberDiv.textContent = number * multiplier;

    const angle = angleIncrement * index;
    const { x, y } = calculatePosition(300, 50, radius, angle); // Dartboard center and radius

    numberDiv.style.position = 'absolute';
    numberDiv.style.left = `${x}px`;
    numberDiv.style.top = `${y}px`;
    numberDiv.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`; // Rotate upright
    overlayContent.appendChild(numberDiv);
  });
}

// Main setup function to generate dartboard
function setupDartboard() {
  // Generate sectors for different rings
  generatePieChart('triple', generateSectors('rgb(160, 0, 0)', 'rgb(0, 99, 0)'));
  generatePieChart('single1', generateSectors('rgb(0, 0, 0)', 'rgb(255, 255, 255)'));
  generatePieChart('double', generateSectors('rgb(160, 0, 0)', 'rgb(0, 99, 0)'));
  generatePieChart('single2', generateSectors('rgb(0, 0, 0)', 'rgb(255, 255, 255)'));

  // Generate numbers for single, double, and triple rings
  const dartNumbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
  generateNumbers('overlay-content', dartNumbers, 20, 'dart-number'); // Single numbers
  generateNumbers('overlay-content', dartNumbers, -25, 'dart-numberD', 2); // Double numbers
  generateNumbers('overlay-content', dartNumbers, -125, 'dart-numberT', 3); // Triple numbers
}

// Initialize the dartboard
setupDartboard();

