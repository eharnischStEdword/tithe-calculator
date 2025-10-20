let inputMode = 'annual';

document.getElementById('annualBtn').addEventListener('click', () => {
    inputMode = 'annual';
    document.getElementById('annualBtn').classList.add('active');
    document.getElementById('weeklyBtn').classList.remove('active');
    document.getElementById('annualInput').classList.remove('hidden');
    document.getElementById('weeklyInput').classList.add('hidden');
    calculateTithe();
});

document.getElementById('weeklyBtn').addEventListener('click', () => {
    inputMode = 'weekly';
    document.getElementById('weeklyBtn').classList.add('active');
    document.getElementById('annualBtn').classList.remove('active');
    document.getElementById('weeklyInput').classList.remove('hidden');
    document.getElementById('annualInput').classList.add('hidden');
    calculateTithe();
});

document.getElementById('annualGiving').addEventListener('input', calculateTithe);
document.getElementById('weeklyOffering').addEventListener('input', calculateTithe);
document.getElementById('grossIncome').addEventListener('input', calculateTithe);

function calculateTithe() {
    const grossIncome = parseFloat(document.getElementById('grossIncome').value) || 0;
    
    let annualGiving;
    if (inputMode === 'annual') {
        annualGiving = parseFloat(document.getElementById('annualGiving').value) || 0;
    } else {
        const weeklyOffering = parseFloat(document.getElementById('weeklyOffering').value) || 0;
        annualGiving = weeklyOffering * 52;
    }
    
    if (grossIncome === 0) {
        document.getElementById('currentPercent').textContent = '0%';
        document.getElementById('increaseOptions').innerHTML = '';
        return;
    }
    
    const currentPercent = (annualGiving / grossIncome) * 100;
    document.getElementById('currentPercent').textContent = currentPercent.toFixed(2) + '%';
    
    // Generate increase options
    const increaseOptionsDiv = document.getElementById('increaseOptions');
    increaseOptionsDiv.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const newPercent = currentPercent + i;
        const newAnnualGiving = (newPercent / 100) * grossIncome;
        const newWeeklyGiving = newAnnualGiving / 52;
        const weeklyIncrease = newWeeklyGiving - (annualGiving / 52);
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'increase-option';
        optionDiv.innerHTML = `
            <div class="increase-header">
                <span class="increase-label">+${i}%</span>
                <span class="increase-target">${newPercent.toFixed(2)}% total</span>
            </div>
            <div class="increase-details">
                <span class="weekly-amount">$${newWeeklyGiving.toFixed(2)}/week</span>
                <span class="weekly-increase">(+$${weeklyIncrease.toFixed(2)}/week)</span>
            </div>
        `;
        increaseOptionsDiv.appendChild(optionDiv);
    }
}

// Initial calculation
calculateTithe();
