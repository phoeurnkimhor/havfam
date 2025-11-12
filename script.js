let answers = {
    generation: null,
    age: null,
    gender: null,
    side: null,
    siblingGender: null,
    siblingAge: null,
    spouse: null
};

const stepHistory = [];

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
    document.getElementById('prevBtn').style.display = stepHistory.length > 0 ? 'block' : 'none';
    updateProgress();
}

function updateProgress() {
    const totalSteps = stepHistory.length + 1;
    const progress = (stepHistory.length / totalSteps) * 100;
    document.getElementById('progressFill').style.width = Math.min(progress, 95) + '%';
}

function selectGeneration(gen) {
    answers.generation = gen;
    stepHistory.push('step-1');
    
    if (gen === 'self') {
        showStep('step-2a');
    } else {
        showStep('step-2b');
    }
}

function selectAge(age) {
    answers.age = age;
    stepHistory.push('step-2a');
    showStep('step-3a');
}

function selectGender(gender) {
    answers.gender = gender;
    stepHistory.push('step-3a');
    showStep('step-4a');
}

function selectSide(side) {
    answers.side = side;
    stepHistory.push('step-2b');
    showStep('step-3b');
}

function selectSiblingGender(siblingGender) {
    answers.siblingGender = siblingGender;
    stepHistory.push('step-3b');
    showStep('step-4b');
}

function selectSiblingAge(siblingAge) {
    answers.siblingAge = siblingAge;
    stepHistory.push('step-4b');
    showStep('step-5b');
}

function selectSpouse(spouse) {
    answers.spouse = spouse;
    stepHistory.push('step-4a');
    
    // If spouse is null, proceed directly to get title
    if (spouse === null) {
        getTitle();
    } else {
        // This case might need additional logic depending on your flow
        getTitle();
    }
}

function selectParentSpouse(spouse) {
    answers.spouse = spouse;
    stepHistory.push('step-5b');
    getTitle();
}

function prevStep() {
    stepHistory.pop();
    
    if (stepHistory.length === 0) {
        answers = { generation: null, age: null, gender: null, side: null, siblingGender: null, siblingAge: null, spouse: null };
        showStep('step-1');
        document.getElementById('result').classList.remove('active');
        return;
    }
    
    const lastStep = stepHistory[stepHistory.length - 1];
    showStep(lastStep);
}

async function getTitle() {
    let path = [];
    let generation = answers.generation;

    if (generation === "parent") {
        path = [answers.side.toLowerCase(), answers.siblingGender, answers.siblingAge];
        if (answers.spouse) {
            path.push(answers.spouse);
        }
    } else {
        path = [answers.gender, answers.age];
        if (answers.spouse) {
            path.push(answers.spouse);
        }
    }

    try {
        const response = await fetch("http://localhost:8000/get_title", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({generation: generation, path: path})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const resultDiv = document.getElementById("result");
        resultDiv.innerText = data.title;
        resultDiv.classList.add("active");
        document.getElementById('progressFill').style.width = '100%';
    } catch (error) {
        console.error("Error:", error);
        const resultDiv = document.getElementById("result");
        resultDiv.innerText = "Error: " + error.message;
        resultDiv.classList.add("active");
    }
}

showStep('step-1');
