export function createRadarChart(scores) {
  const canvas = document.getElementById('radarChart');
  if (!canvas) {
    console.error('Radar chart canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  
  // Destroy previous chart instance if it exists
  if (window.radarChartInstance) {
    window.radarChartInstance.destroy();
  }
  
  window.radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: scores.map(f => `${f.id}. ${f.label}`),
      datasets: [{
        label: 'Your Score',
        data: scores.map(f => f.score),
        backgroundColor: 'rgba(246, 130, 31, 0.2)',
        borderColor: 'rgb(246, 130, 31)',
        pointBackgroundColor: 'rgb(246, 130, 31)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(246, 130, 31)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            font: {
              size: 12
            }
          },
          pointLabels: {
            font: {
              size: 11
            },
            callback: function(label) {
              // Truncate long labels for better display
              return label.length > 20 ? label.substring(0, 20) + '...' : label;
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          angleLines: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      interaction: {
        intersect: false
      },
      elements: {
        point: {
          radius: 6,
          hoverRadius: 8
        }
      }
    }
  });
}

export function renderCategoryBreakdown(categories) {
  const container = document.getElementById('scoreBreakdown');
  if (!container) {
    console.error('Score breakdown container not found');
    return;
  }

  const breakdownHtml = categories.map(category => {
    const scoreColorClass = category.score < 50 ? 'text-red-500' :
                           category.score < 75 ? 'text-yellow-600' :
                           'text-[#f6821f]';

    return `
      <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-[#f6821f] transition-colors">
        <div class="flex justify-between items-center mb-3">
          <span class="font-bold text-lg">${category.name}</span>
          <span class="font-bold text-lg ${scoreColorClass}">${category.score}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4 mb-3">
          <div class="${category.colorClass} h-4 rounded-full transition-all duration-1000" style="width: ${category.score}%"></div>
        </div>
        <div class="text-xs text-gray-500 mt-1">Includes: ${category.factorsList}</div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = breakdownHtml;
}
