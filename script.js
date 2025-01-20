function generatePieChart(id, sectors) {
    const chart = document.getElementById(id);
    sectors.forEach(sector => {
      const div = document.createElement('div');
      div.classList.add('sector');
      div.style.setProperty('--s', `${sector.angle}deg`);
      div.style.backgroundColor = sector.color;
      chart.appendChild(div);
    });
  }
  
  function generateSectors(color1, color2) {
    const sectors = [];
    for (let i = 0; i < 20; i++) {
      sectors.push({
        angle: -9.5 + (i * 18),
        color: i % 2 === 0 ? color1 : color2
      });
    }
    return sectors;
  }
  
  generatePieChart('triple', generateSectors('rgb(160, 0, 0)', 'rgb(0, 99, 0)'));
  generatePieChart('single1', generateSectors('rgb(0, 0, 0)', 'rgb(255, 255, 255)'));
  generatePieChart('double', generateSectors('rgb(160, 0, 0)', 'rgb(0, 99, 0)'));
  generatePieChart('single2', generateSectors('rgb(0, 0, 0)', 'rgb(255, 255, 255)'));