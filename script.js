document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements selection
    const expenseForm = document.getElementById('expense-form');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.getElementById('category'); // Ensure this ID exists in HTML
    const expenseChartCanvas = document.getElementById('expense-chart');

    let selectedMonth;
    let selectedYear;
    let myChart;

    // 2. Initial Data Structure
    let expenses = {
        January: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        February: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        March: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        April: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        May: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        June: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        July: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        August: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        September: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        October: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        November: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        December: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 }
    };

    // 3. Helper Function to get selected values
    function getSelectedMonthYear() {
        selectedMonth = monthSelect.value;
        selectedYear = yearSelect.value;
    }

    // 4. Update Chart Function (Fixed all typos and logic)
    function updatechart() {
        getSelectedMonthYear();

        const ctx = expenseChartCanvas.getContext('2d');

        // Destroy previous chart to avoid overlay glitches
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(expenses[selectedMonth]),
                datasets: [{
                    data: Object.values(expenses[selectedMonth]),
                    backgroundColor: [
                        '#FF6384',
                        '#4CAF50',
                        '#FFCE56',
                        '#36A2EB',
                        '#FF9F40'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // 5. Add Expense Event Listener
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);

        if (!isNaN(amount) && amount > 0) {
            getSelectedMonthYear();
            
            // Adding amount to existing value
            expenses[selectedMonth][category] += amount;
            
            // Refresh chart
            updatechart();
            
            // Reset amount field
            amountInput.value = '';
        } else {
            alert("Please enter a valid amount");
        }
    });

    // 6. Dynamic Year Generation
    for (let year = 2020; year <= 2030; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Initialize chart on page load
    updatechart();
});