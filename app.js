// Question pattern system - ready to be extended with user patterns
class QuestionGenerator {
    constructor() {
        this.patterns = [];
        this.questionCount = 0;
    }

    // Add a pattern function that returns { question: string, answer: number }
    addPattern(patternFunction) {
        this.patterns.push(patternFunction);
    }

    // Generate a random question from available patterns
    generateQuestion() {
        if (this.patterns.length === 0) {
            return {
                question: "2 + 2",
                answer: 4
            };
        }
        
        const randomPattern = this.patterns[Math.floor(Math.random() * this.patterns.length)];
        return randomPattern();
    }
}

// Helper function to get random integer in range [min, max]
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to get random element from array
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to round to nearest multiple (e.g., roundToNearest(3737, 100) = 3700)
function roundToNearest(num, nearest) {
    return Math.round(num / nearest) * nearest;
}

// Helper function to get a round number in range [min, max], rounded to nearest 'roundTo'
function randomRoundInt(min, max, roundTo = 1) {
    const num = randomInt(min, max);
    return roundToNearest(num, roundTo);
}

// Helper function for round percentages
function randomRoundPercent(min, max) {
    const percentages = [10, 15, 20, 25, 30, 40, 50, 60, 75];
    return randomChoice(percentages.filter(p => p >= min && p <= max));
}

// Pattern 1: Two-Digit Multiplication (Decomposition Method)
// (10k + d) × n
function pattern1() {
    const k = randomInt(1, 9);
    const d = randomInt(1, 9);
    // Use round numbers like 20, 30, 40, 50, etc. or 25, 50, 75
    const roundNumbers = [20, 25, 30, 40, 50, 60, 70, 75, 80, 90];
    const n = randomChoice(roundNumbers);
    const a = k * 10;
    const b = d;
    const answer = (a + b) * n;
    return {
        question: `What is (${a} + ${b}) × ${n}?`,
        answer: answer
    };
}

// Pattern 2: Division with Large Numbers (Scaling Method)
// (a × 1000) ÷ b
function pattern2() {
    // Use round numbers like 20, 30, 40, 50, 60, 70, 80
    const a = randomChoice([20, 30, 40, 50, 60, 70, 80, 90]);
    const b = randomChoice([2, 4, 5, 8]);
    const largeNumber = a * 1000;
    const answer = largeNumber / b;
    return {
        question: `What is ${largeNumber.toLocaleString()} ÷ ${b}?`,
        answer: Math.round(answer)
    };
}

// Pattern 3: Decimal Multiplication (Shift-and-Multiply)
// (a.b) × n
function pattern3() {
    // Use simple decimals like 1.5, 2.5, 3.5, 4.5 or whole numbers like 1.0, 2.0
    const decimals = [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 
                      1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0];
    const decimal = randomChoice(decimals);
    const n = randomChoice([2, 3, 4, 5, 6, 8, 10, 12]);
    const answer = decimal * n;
    return {
        question: `What is ${decimal} × ${n}?`,
        answer: Math.round(answer * 10) / 10
    };
}

// Pattern 4: Percentage of a Large Number
// p% of Y
function pattern4() {
    const percentages = [10, 15, 20, 25, 30, 50, 75];
    const p = randomChoice(percentages);
    // Round to nearest 100: 1000, 2000, 3000, etc. up to 10000
    const Y = randomRoundInt(1000, 10000, 1000);
    const answer = (Y * p) / 100;
    return {
        question: `What is ${p}% of ${Y.toLocaleString()}?`,
        answer: Math.round(answer)
    };
}

// Pattern 5: Percentage Increase
// X × (1 + p/100)
function pattern5() {
    // Round to nearest 10: 100, 110, 120, etc.
    const X = randomRoundInt(100, 900, 10);
    const percentages = [10, 15, 20, 25, 50];
    const p = randomChoice(percentages);
    const answer = X * (1 + p / 100);
    return {
        question: `What is ${X} increased by ${p}% ?`,
        answer: Math.round(answer)
    };
}

// Pattern 6: Break-Even Analysis (Units)
// F / (P - V)
function pattern6() {
    // Round to nearest 5000: 10000, 15000, 20000, etc.
    const F = randomRoundInt(10000, 50000, 5000);
    // Round prices to nearest 10
    const P = randomRoundInt(50, 200, 10);
    // Round variable costs to nearest 5, ensure P > V with good margin
    const V = randomRoundInt(20, P - 20, 5);
    const answer = F / (P - V);
    return {
        question: `A product has fixed costs of $${F.toLocaleString()}, variable costs of $${V}, and a price of $${P}. How many units are needed to break even?`,
        answer: Math.ceil(answer)
    };
}

// Pattern 7: Profit Margin Calculation
// Profit = R - C, Margin = Profit / R
function pattern7() {
    // Round revenue to nearest 10000: 10000, 20000, 30000, etc.
    const R = randomRoundInt(20000, 100000, 10000);
    // Round costs to nearest 5000, ensuring reasonable margin
    const C = randomRoundInt(10000, Math.floor(R * 0.8), 5000);
    const profit = R - C;
    const margin = (profit / R) * 100;
    return {
        question: `A firms revenue is $${R.toLocaleString()}, with costs of  $${C.toLocaleString()}. Find the profit and profit margin.`,
        answer: `$${profit.toLocaleString()} profit, ${Math.round(margin)}% margin`
    };
}

// Pattern 8: Market Size Estimation (Consumption Model)
// N × s × u × 365
function pattern8() {
    // Round to nearest 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
    const N = randomRoundInt(10, 100, 10); // in millions
    const sPercent = randomChoice([10, 15, 20, 25, 30, 40, 50]);
    const u = randomChoice([1, 2, 3, 4, 5]);
    const s = sPercent / 100;
    const answer = N * s * u * 12;
    return {
        question: `A country has ${N} million people. ${sPercent}% use a product daily, on average ${u} units/month each. What is the total annual consumption?`,
        answer: Math.round(answer) + " million units"
    };
}

// Pattern 9: Asset Distribution by Ownership
// H × a × 2 + H × b × 1
function pattern9() {
    // Round to nearest 100: 1000, 2000, 3000, etc.
    const H = randomRoundInt(1000, 10000, 100);
    const a = randomRoundPercent(10, 40);
    const b = randomRoundPercent(20, 50);
    const answer = H * (a / 100) * 2 + H * (b / 100) * 1;
    return {
        question: `Of ${H.toLocaleString()} households in a city, ${a}% own 2 cars, ${b}% own 1 car. How many total cars are there?`,
        answer: Math.round(answer)
    };
}

// Pattern 10: Compound Growth Over Multiple Years
// V₀ × (1+g)^t
function pattern10() {
    // Round to nearest 1000: 1000, 2000, 3000, etc.
    const V0 = randomRoundInt(1000, 10000, 1000);
    const g = randomChoice([5, 10, 15, 20]);
    const t = randomChoice([2, 3, 4, 5]);
    const answer = V0 * Math.pow(1 + g / 100, t);
    return {
        question: `A market is worth $${V0.toLocaleString()} and grows ${g}% annually for ${t} years. What is its value after ${t} years?`,
        answer: Math.round(answer)
    };
}

// Pattern 11: Sequential Percentage Changes
// P × (1-a) × (1+b)
function pattern11() {
    // Round to nearest 10: 100, 110, 120, etc.
    const P = randomRoundInt(100, 1000, 10);
    const a = randomRoundPercent(10, 30);
    const b = randomRoundPercent(5, 25);
    const answer = P * (1 - a / 100) * (1 + b / 100);
    return {
        question: `A product costs $${P}. Its prce gets reduced by ${a}% during an offer, then increased by ${b}%. What is its final price?`,
        answer: Math.round(answer * 100) / 100
    };
}

// Pattern 12: Weighted Average Margin
// Σ(w_i × m_i)
function pattern12() {
    const numProducts = randomInt(2, 3);
    let products = [];
    let totalWeight = 0;
    
    // Generate products with round percentages
    for (let i = 0; i < numProducts; i++) {
        const w = randomRoundPercent(20, 50);
        const m = randomRoundPercent(10, 40);
        products.push({ w, m });
        totalWeight += w;
    }
    
    // Normalize weights to sum to 100, rounding to nearest 5
    let normalizedProducts = products.map(p => ({ 
        w: Math.round(p.w * 100 / totalWeight / 5) * 5, 
        m: p.m 
    }));
    
    // Adjust last weight to ensure sum equals 100
    let currentSum = normalizedProducts.reduce((sum, p) => sum + p.w, 0);
    if (currentSum !== 100) {
        normalizedProducts[normalizedProducts.length - 1].w += (100 - currentSum);
    }
    
    let weightedSum = 0;
    normalizedProducts.forEach(p => {
        weightedSum += (p.w / 100) * p.m;
    });
    
    const questionText = normalizedProducts.map((p, i) => 
        `Product ${i + 1}: ${p.w}% revenue, ${p.m}% margin`
    ).join(', ');
    
    return {
        question: `What is the weighted average margin of the following products: ${questionText}`,
        answer: Math.round(weightedSum * 10) / 10 + "%"
    };
}

// Pattern 13: Weighted Average Cost
// (q₁c₁ + q₂c₂) / (q₁ + q₂)
function pattern13() {
    // Round quantities to nearest 50: 100, 150, 200, etc.
    const q1 = randomRoundInt(100, 500, 50);
    // Round costs to nearest 5: 10, 15, 20, etc.
    const c1 = randomRoundInt(10, 50, 5);
    const q2 = randomRoundInt(100, 500, 50);
    const c2 = randomRoundInt(10, 50, 5);
    const answer = (q1 * c1 + q2 * c2) / (q1 + q2);
    return {
        question: `Factory A produces ${q1} units at $${c1}/unit. Factory B produces ${q2} units at $${c2}/unit. What is the average cost?`,
        answer: Math.round(answer * 100) / 100
    };
}

// Pattern 14: Consulting Project Billing
// r × d × h × w × c
function pattern14() {
    const r = randomChoice([100, 150, 200, 250, 300]);
    const d = randomChoice([3, 4, 5]);
    const h = randomChoice([6, 7, 8]);
    // Round weeks to whole numbers: 2, 3, 4, 5, 6, 7, 8
    const w = randomChoice([2, 3, 4, 5, 6, 7, 8]);
    const c = randomChoice([2, 3, 4, 5]);
    const answer = r * d * h * w * c;
    return {
        question: `A team of ${c} consultants works for $${r}/hour, ${d} days/week, ${h} hours/day, ${w} weeks. What is the total fee?`,
        answer: "$" + answer.toLocaleString()
    };
}

// Pattern 15: Cost Reduction & Profit Increase
// New cost: C × (1 - r), New profit: P - C_new
function pattern15() {
    // Round price to nearest 5: 50, 55, 60, etc.
    const P = randomRoundInt(50, 200, 5);
    // Round cost to nearest 5, ensuring reasonable margin
    const C = randomRoundInt(Math.floor(P * 0.4), Math.floor(P * 0.8), 5);
    const r = randomChoice([10, 15, 20, 25]);
    const C_new = C * (1 - r / 100);
    const newProfit = P - C_new;
    return {
        question: `A product is sold for $${P}. Its cost is $${C}. The cost is reduced by ${r}%. What is the new profit per unit?`,
        answer: "$" + Math.round(newProfit * 100) / 100
    };
}

// Initialize question generator
const generator = new QuestionGenerator();

// Add all patterns
generator.addPattern(pattern1);
generator.addPattern(pattern2);
generator.addPattern(pattern3);
generator.addPattern(pattern4);
generator.addPattern(pattern5);
generator.addPattern(pattern6);
generator.addPattern(pattern7);
generator.addPattern(pattern8);
generator.addPattern(pattern9);
generator.addPattern(pattern10);
generator.addPattern(pattern11);
generator.addPattern(pattern12);
generator.addPattern(pattern13);
generator.addPattern(pattern14);
generator.addPattern(pattern15);

// DOM elements
const questionElement = document.getElementById('question');
const questionTextElement = document.getElementById('questionText');
const answerElement = document.getElementById('answer');
const revealBtn = document.getElementById('revealBtn');
const nextBtn = document.getElementById('nextBtn');
const cardFront = document.getElementById('cardFront');
const cardBack = document.getElementById('cardBack');
const questionCountElement = document.getElementById('questionCount');

let currentQuestion = null;
let currentAnswer = null;

// Initialize with first question
function loadNewQuestion() {
    const result = generator.generateQuestion();
    currentQuestion = result.question;
    currentAnswer = result.answer;
    
    // Set question text
    questionElement.textContent = currentQuestion;
    questionTextElement.textContent = currentQuestion;
    
    // Set answer (handle both numbers and strings)
    if (typeof currentAnswer === 'string') {
        answerElement.textContent = currentAnswer;
    } else {
        answerElement.textContent = currentAnswer.toLocaleString();
    }
    
    // Adjust font size based on question length
    questionElement.className = 'question';
    if (currentQuestion.length > 60) {
        questionElement.classList.add('long');
        answerElement.classList.add('long');
    } else if (currentQuestion.length > 30) {
        questionElement.classList.add('medium');
    }
    
    // Show front, hide back
    cardFront.style.display = 'flex';
    cardBack.style.display = 'none';
}

// Reveal answer
revealBtn.addEventListener('click', () => {
    cardFront.style.display = 'none';
    cardBack.style.display = 'flex';
});

// Next question
nextBtn.addEventListener('click', () => {
    generator.questionCount++;
    questionCountElement.textContent = generator.questionCount;
    loadNewQuestion();
});

// Initialize on page load
loadNewQuestion();

