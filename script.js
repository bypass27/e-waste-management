document.addEventListener('DOMContentLoaded', function() {
  const collectionForm = document.getElementById('collection-form');
  const recycledItems = document.getElementById('recycled-items');
  const co2Saved = document.getElementById('co2-saved');
  const impactResult = document.getElementById('impact-result');

  let totalRecycled = 0;
  let totalCO2Saved = 0;
  let recyclingData = {
    phone: 0,
    laptop: 0,
    tablet: 0,
    desktop: 0,
    printer: 0
  };

  const co2Values = {
    phone: 30,
    laptop: 100,
    tablet: 50,
    desktop: 150,
    printer: 80
  };

  collectionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const itemType = document.getElementById('item-type').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const location = document.getElementById('location').value;

    if (itemType && quantity && location) {
      totalRecycled += quantity;
      const co2SavedForItem = quantity * co2Values[itemType];
      totalCO2Saved += co2SavedForItem;

      recycledItems.textContent = totalRecycled;
      co2Saved.textContent = totalCO2Saved.toFixed(2);

      recyclingData[itemType] += quantity;
      updateChart();

      impactResult.innerHTML = `
        <h3>Environmental Impact</h3>
        <p>By recycling ${quantity} ${itemType}(s), you've saved approximately ${co2SavedForItem.toFixed(2)} kg of CO2!</p>
      `;

      alert(`Collection request submitted for ${quantity} ${itemType}(s) from ${location}.`);
      collectionForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Initialize and update the chart
  const ctx = document.getElementById('recycling-chart').getContext('2d');
  let recyclingChart;

  function updateChart() {
    if (recyclingChart) {
      recyclingChart.destroy();
    }

    recyclingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(recyclingData),
        datasets: [{
          label: 'Items Recycled',
          data: Object.values(recyclingData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  updateChart();
});