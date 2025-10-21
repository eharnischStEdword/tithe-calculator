// Currency formatting for input fields
function formatInputCurrency(value) {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    let formatted = parts[0];
    if (parts.length > 1) {
        formatted = parts[0] + '.' + parts[1].slice(0, 2); // Limit to 2 decimal places
    }
    
    // Add commas for thousands
    formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return formatted;
}

function applyCurrencyFormat(inputElement) {
    // Get cursor position before formatting
    const cursorPos = inputElement.selectionStart;
    
    // Remove non-numeric characters except decimal point
    const rawValue = inputElement.value.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    const parts = rawValue.split('.');
    let cleanValue = parts[0];
    if (parts.length > 1) {
        cleanValue = parts[0] + '.' + parts[1].slice(0, 2); // Limit to 2 decimal places
    }
    
    // Format with commas
    const formatted = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Add dollar sign
    const finalValue = formatted ? '$' + formatted : '';
    
    // Only update if the value actually changed
    if (inputElement.value !== finalValue) {
        inputElement.value = finalValue;
        
        // Restore cursor position (adjust for added characters)
        const newCursorPos = Math.min(cursorPos + (finalValue.length - inputElement.value.length), finalValue.length);
        inputElement.setSelectionRange(newCursorPos, newCursorPos);
    }
}

function getCurrencyValue(inputElement) {
    // Extract numeric value from formatted currency string
    const value = inputElement.value.replace(/[$,]/g, '');
    return parseFloat(value) || 0;
}

// Add input event listeners for real-time formatting
document.getElementById('offeringAmount').addEventListener('input', function(e) {
    applyCurrencyFormat(e.target);
    calculateTithe();
});

document.getElementById('incomeAmount').addEventListener('input', function(e) {
    applyCurrencyFormat(e.target);
    calculateTithe();
});

// Add listeners to all radio buttons
document.querySelectorAll('input[name="offeringFreq"]').forEach(radio => {
    radio.addEventListener('change', calculateTithe);
});
document.querySelectorAll('input[name="incomeFreq"]').forEach(radio => {
    radio.addEventListener('change', calculateTithe);
});

function formatCurrency(value) {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function getFrequencyLabel(frequency) {
    const labels = {
        52: 'week',
        26: 'bi-weekly period',
        12: 'month',
        1: 'year'
    };
    return labels[frequency] || 'period';
}

function validateInput(value) {
    // Handle empty input as valid but flagged
    if (value === '' || value === null || value === undefined) {
        return { value: 0, isValid: true, message: '', isEmpty: true };
    }
    
    // Handle edge cases: negative numbers, NaN, Infinity, very large numbers
    // Remove currency formatting if present
    const cleanValue = typeof value === 'string' ? value.replace(/[$,]/g, '') : value;
    const num = parseFloat(cleanValue);
    
    if (isNaN(num) || !isFinite(num)) {
        return { value: 0, isValid: false, message: 'Please enter a valid number', isEmpty: false };
    }
    
    // Prevent negative numbers
    if (num < 0) {
        return { value: 0, isValid: false, message: 'Amounts cannot be negative', isEmpty: false };
    }
    
    // Prevent extremely large numbers (over 999 million)
    if (num > 999999999) {
        return { value: 999999999, isValid: false, message: 'Amount is too large (max: $999,999,999)', isEmpty: false };
    }
    
    return { value: num, isValid: true, message: '', isEmpty: false };
}

function showValidationMessage(message, isError = true) {
    const messageDiv = document.getElementById('validationMessage');
    if (!messageDiv) return;
    
    if (message) {
        messageDiv.textContent = message;
        messageDiv.className = isError ? 'validation-message' : 'validation-message info';
        messageDiv.style.display = 'block';
    } else {
        messageDiv.style.display = 'none';
    }
}

function setInputValidation(inputElement, isValid) {
    if (!inputElement) return;
    
    if (isValid) {
        inputElement.classList.remove('invalid-input');
    } else {
        inputElement.classList.add('invalid-input');
    }
}

function calculateTithe() {
    try {
        // Get and validate input values
        const offeringInput = document.getElementById('offeringAmount');
        const incomeInput = document.getElementById('incomeAmount');
        
        const offeringValidation = validateInput(getCurrencyValue(offeringInput));
        const incomeValidation = validateInput(getCurrencyValue(incomeInput));
        
        // Set visual validation feedback
        setInputValidation(offeringInput, offeringValidation.isValid);
        setInputValidation(incomeInput, incomeValidation.isValid);
        
        // Show validation messages
        let validationMessage = '';
        if (!offeringValidation.isValid && !offeringValidation.isEmpty) {
            validationMessage = offeringValidation.message;
        } else if (!incomeValidation.isValid && !incomeValidation.isEmpty) {
            validationMessage = incomeValidation.message;
        }
        
        // Handle special case: both inputs are 0
        if (offeringValidation.value === 0 && incomeValidation.value === 0) {
            validationMessage = 'Enter your offering and income amounts to see calculations';
            showValidationMessage(validationMessage, false);
        } else if (incomeValidation.value === 0) {
            validationMessage = 'Enter your income to see percentage calculations';
            showValidationMessage(validationMessage, false);
        } else {
            showValidationMessage(validationMessage);
        }
        
        // Get frequency values with fallback
        const offeringFreqElement = document.querySelector('input[name="offeringFreq"]:checked');
        const incomeFreqElement = document.querySelector('input[name="incomeFreq"]:checked');
        
        if (!offeringFreqElement || !incomeFreqElement) {
            console.error('Radio button elements not found');
            return;
        }
        
        const offeringFreq = parseFloat(offeringFreqElement.value) || 52;
        const incomeFreq = parseFloat(incomeFreqElement.value) || 52;
        
        // Core calculations
        const annualOffering = offeringValidation.value * offeringFreq;
        const annualIncome = incomeValidation.value * incomeFreq;
        
        // Update summary section
        updateSummary(annualOffering, annualIncome);
        
        // Handle division by zero case
        if (annualIncome === 0) {
            document.getElementById('currentPercent').textContent = '0%';
            document.getElementById('increaseOptions').innerHTML = '';
            return;
        }
        
        // Calculate current percentage
        const currentPercent = (annualOffering / annualIncome) * 100;
        document.getElementById('currentPercent').textContent = currentPercent.toFixed(2) + '%';
        
        // Generate increase options
        generateIncreaseOptions(currentPercent, annualIncome, offeringFreq, offeringValidation);
        
    } catch (error) {
        console.error('Error in calculateTithe:', error);
        // Fallback to safe state
        document.getElementById('currentPercent').textContent = '0%';
        document.getElementById('increaseOptions').innerHTML = '';
        showValidationMessage('An error occurred. Please check your inputs.');
    }
}

function generateIncreaseOptions(currentPercent, annualIncome, offeringFreq, offeringValidation) {
    const frequencyLabel = getFrequencyLabel(offeringFreq);
    const increaseOptionsDiv = document.getElementById('increaseOptions');
    
    if (!increaseOptionsDiv) {
        console.error('Increase options div not found');
        return;
    }
    
    increaseOptionsDiv.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        try {
            const newPercent = currentPercent + i;
            const newAnnualGiving = (newPercent / 100) * annualIncome;
            const newAmountInFreq = newAnnualGiving / offeringFreq;
            const increaseInFreq = newAmountInFreq - offeringValidation.value;
            
            const optionDiv = document.createElement('div');
            optionDiv.className = 'increase-option';
            optionDiv.innerHTML = `
                <div class="increase-left">
                    <div class="increase-label">+${i}% INCREASE</div>
                    <div class="increase-amount">$${formatCurrency(newAmountInFreq)}</div>
                    <div class="increase-frequency">per ${frequencyLabel}</div>
                    <div class="increase-delta">+$${formatCurrency(increaseInFreq)} more than current</div>
                </div>
                <div class="increase-right">
                    <div class="increase-percent">${newPercent.toFixed(1)}%</div>
                    <div class="increase-annual">of annual income</div>
                </div>
            `;
            increaseOptionsDiv.appendChild(optionDiv);
        } catch (error) {
            console.error(`Error generating increase option ${i}:`, error);
        }
    }
}

function updateSummary(annualOffering, annualIncome) {
    try {
        // Update giving summary with error handling
        const annualGivingEl = document.getElementById('annualGiving');
        const monthlyGivingEl = document.getElementById('monthlyGiving');
        const weeklyGivingEl = document.getElementById('weeklyGiving');
        
        if (annualGivingEl) annualGivingEl.textContent = '$' + formatCurrency(annualOffering);
        if (monthlyGivingEl) monthlyGivingEl.textContent = '$' + formatCurrency(annualOffering / 12);
        if (weeklyGivingEl) weeklyGivingEl.textContent = '$' + formatCurrency(annualOffering / 52);
        
        // Update income summary with error handling
        const annualIncomeEl = document.getElementById('annualIncome');
        const monthlyIncomeEl = document.getElementById('monthlyIncome');
        const weeklyIncomeEl = document.getElementById('weeklyIncome');
        
        if (annualIncomeEl) annualIncomeEl.textContent = '$' + formatCurrency(annualIncome);
        if (monthlyIncomeEl) monthlyIncomeEl.textContent = '$' + formatCurrency(annualIncome / 12);
        if (weeklyIncomeEl) weeklyIncomeEl.textContent = '$' + formatCurrency(annualIncome / 52);
        
    } catch (error) {
        console.error('Error updating summary:', error);
    }
}

// Initial calculation with error handling
try {
    calculateTithe();
} catch (error) {
    console.error('Error in initial calculation:', error);
}