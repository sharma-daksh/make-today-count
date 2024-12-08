const checkboxlist = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.input');
const error_msg = document.querySelector('.error-msg');
const progress_made = document.querySelector('.progress-made');
const quotesLabel=document.querySelector('.label')
const quotes = [
    "Every journey begins with a single step. Let's get started!",
     "Great start! Keep pushing forward.",
     "You're halfway there! Keep the momentum going.",
     "Fantastic! You've conquered your goals today!"
]




const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length
progress_made.style.width =`${completedGoalsCount/3 *100}%`
quotesLabel.innerText=quotes[completedGoalsCount]
inputFields.forEach((input) => {
    if (!allGoals[input.id]) {
        allGoals[input.id] = {
            name: "",
            completed: false
        };
    }
});
localStorage.setItem('allGoals', JSON.stringify(allGoals));

checkboxlist.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const goalsAdded = [...inputFields].every((input) => input.value);

        if (goalsAdded) {
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length
            progress_made.style.width =`${completedGoalsCount/3 *100}%`
            progress_made.firstElementChild.innerText=`${completedGoalsCount}/3completed.`
            quotesLabel.innerText=quotes[completedGoalsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        } else {
            error_msg.classList.add('give-error');
        }
    });
});

inputFields.forEach((input) => {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus', () => {
        error_msg.classList.remove('give-error');
    });

    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            input.value=allGoals[input.id].name
            return
        }
        
        allGoals[input.id] = {
            name: input.value,
            completed: false,
        };
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    });
});
