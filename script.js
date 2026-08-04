const pendingCount =
document.getElementById("pendingCount");
const searchInput = document.getElementById("searchInput");
const habitForm = document.getElementById("habitForm");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const progress = document.getElementById("progress");
const streak = document.getElementById("streak");
const clearBtn = document.getElementById("clearBtn");

// ===============================
// Load Local Storage
// ===============================

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// ===============================
// Save Habits
// ===============================

function saveHabits() {

    localStorage.setItem("habits", JSON.stringify(habits));

}

// ===============================
// Display Habits
// ===============================

function displayHabits() {

    habitList.innerHTML = "";
const filteredHabits = habits.filter(function(habit){

return habit.text
.toLowerCase()
.includes(searchInput.value.toLowerCase());

});
    filteredHabits.forEach(function(habit,index) {

        const li = document.createElement("li");

        // Habit Text

        const span = document.createElement("span");

        span.classList.add("habit-text");

        span.textContent = habit.text;

        if (habit.completed) {

            span.classList.add("completed");

        }
        const small=document.createElement("small");

small.textContent=habit.created;

li.appendChild(small);

        // Buttons Container

        const buttons = document.createElement("div");

        buttons.classList.add("buttons");

        // Complete Button

        const completeBtn = document.createElement("button");

        completeBtn.textContent = "✔";

        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", function () {

            habits[index].completed = !habits[index].completed;

            saveHabits();

            displayHabits();

        });

        // Edit Button

        const editBtn = document.createElement("button");

        editBtn.textContent = "Edit";

        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function () {

            const updatedHabit = prompt(

                "Edit Habit",

                habits[index].text

            );

            if (updatedHabit !== null && updatedHabit.trim() !== "") {

                habits[index].text = updatedHabit.trim();

                saveHabits();

                displayHabits();

            }

        });

        // Delete Button

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {

            habits.splice(index, 1);

            saveHabits();

            displayHabits();

        });

        buttons.appendChild(completeBtn);
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttons);

        habitList.appendChild(li);

    });

    updateStats();
if(total>0 && total===completed){

alert("🎉 Congratulations! All habits completed.");

}
pendingCount.textContent=
total-completed;
}

// ===============================
// Add Habit
// ===============================

habitForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const habitText = habitInput.value.trim();

    if (habitText === "") {

        alert("Please enter a habit.");

        return;

    }

    habits.push({

text:habitText,

completed:false,

created:new Date().toLocaleString()

});

    saveHabits();

    displayHabits();

    habitInput.value = "";

});
// ===============================
// Update Statistics
// ===============================

function updateStats() {

    const total = habits.length;

    const completed = habits.filter(function (habit) {

        return habit.completed;

    }).length;

    totalCount.textContent = total;

    completedCount.textContent = completed;

    // Progress Bar

    let percentage = 0;

    if (total > 0) {

        percentage = (completed / total) * 100;

    }

    progress.style.width = percentage + "%";

    // Streak

    streak.textContent = completed + " 🔥";

}

// ===============================
// Clear All Habits
// ===============================

clearBtn.addEventListener("click", function () {

    if (habits.length === 0) {

        alert("No habits found.");

        return;

    }

    const confirmDelete = confirm(

        "Are you sure you want to delete all habits?"

    );

    if (confirmDelete) {

        habits = [];

        saveHabits();

        displayHabits();

    }

});

// ===============================
// Load Saved Habits
// ===============================

displayHabits();
searchInput.addEventListener("input",displayHabits);
const today=new Date();

document.getElementById("todayDate").textContent=
today.toDateString();