let problems = JSON.parse(localStorage.getItem("problems")) || [];
let completedToday = JSON.parse(localStorage.getItem("completedToday")) || [];
let streakData = JSON.parse(localStorage.getItem("streakData")) || {
  currentStreak: 0,
  lastCompletedDate: null
};

function save() {
  localStorage.setItem("problems", JSON.stringify(problems));
  localStorage.setItem("completedToday", JSON.stringify(completedToday));
  localStorage.setItem("streakData", JSON.stringify(streakData));
}

function addProblem() {
  const name = document.getElementById("problemName").value;
  if (!name) return;

  const today = new Date();
  const day3 = new Date(today); day3.setDate(today.getDate() + 3);
  const day7 = new Date(today); day7.setDate(today.getDate() + 7);
  const day14 = new Date(today); day14.setDate(today.getDate() + 14);

  problems.push({
    id: Date.now(),
    name,
    dateSolved: today,
    revisionDates: [day3, day7, day14],
    completedRevisions: []
  });

  document.getElementById("problemName").value = "";
  save();
  render();
}

function markRevision(problemId, revisionDate) {
  const problem = problems.find(p => p.id === problemId);
  if (!problem) return;

  problem.completedRevisions.push(revisionDate);

  completedToday.push({
    name: problem.name,
    completedAt: new Date()
  });

  save();
  render();
}

function updateStreak(dueCount) {
  const today = new Date().toDateString();

  if (dueCount === 0) {
    if (streakData.lastCompletedDate !== today) {
      streakData.currentStreak += 1;
      streakData.lastCompletedDate = today;
    }
  } else {
    streakData.currentStreak = 0;
  }

  save();
}

function render() {
  const dueList = document.getElementById("dueList");
  const allProblems = document.getElementById("allProblems");

  let completedSection = document.getElementById("completedSection");
  if (!completedSection) {
    completedSection = document.createElement("div");
    completedSection.id = "completedSection";
    document.body.appendChild(completedSection);
  }

  let streakSection = document.getElementById("streakSection");
  if (!streakSection) {
    streakSection = document.createElement("div");
    streakSection.id = "streakSection";
    document.body.insertBefore(streakSection, document.body.firstChild);
  }

  dueList.innerHTML = "";
  allProblems.innerHTML = "";
  completedSection.innerHTML = "<h2>Completed Today</h2>";
  streakSection.innerHTML = `<h2>🔥 Streak: ${streakData.currentStreak} days</h2>`;

  const today = new Date();

  let dueItems = [];

  problems.forEach(problem => {
    problem.revisionDates.forEach(date => {
      if (
        new Date(date) <= today &&
        !problem.completedRevisions.includes(date)
      ) {
        dueItems.push({
          problem,
          date: new Date(date)
        });
      }
    });
  });

  // 🔥 Sort oldest first
  dueItems.sort((a, b) => a.date - b.date);

  dueItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "card due";
    div.innerHTML = `
      ${item.problem.name} - Due ${item.date.toDateString()}
      <button onclick="markRevision(${item.problem.id}, '${item.date}')">
        Mark Complete
      </button>
    `;
    dueList.appendChild(div);
  });

  // Update streak
  updateStreak(dueItems.length);

  problems.forEach(problem => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${problem.name}</strong><br>
      Solved: ${new Date(problem.dateSolved).toDateString()}
    `;
    allProblems.appendChild(card);
  });

  completedToday.forEach(item => {
    if (new Date(item.completedAt).toDateString() === today.toDateString()) {
      const div = document.createElement("div");
      div.className = "card done";
      div.innerHTML = `${item.name} - Completed`;
      completedSection.appendChild(div);
    }
  });
}

render();
