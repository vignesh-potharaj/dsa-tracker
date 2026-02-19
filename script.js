let problems = JSON.parse(localStorage.getItem("problems")) || [];
let completedToday = JSON.parse(localStorage.getItem("completedToday")) || [];

function save() {
  localStorage.setItem("problems", JSON.stringify(problems));
  localStorage.setItem("completedToday", JSON.stringify(completedToday));
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

function isSameDay(d1, d2) {
  return new Date(d1).toDateString() === new Date(d2).toDateString();
}

function markRevision(problemId, revisionDate) {
  const problem = problems.find(p => p.id === problemId);
  if (!problem) return;

  // Mark revision as completed
  problem.completedRevisions.push(revisionDate);

  // Add to completedToday list
  completedToday.push({
    name: problem.name,
    completedAt: new Date()
  });

  save();
  render();
}

function render() {
  const dueList = document.getElementById("dueList");
  const allProblems = document.getElementById("allProblems");

  // Create completed section if not exists
  let completedSection = document.getElementById("completedSection");
  if (!completedSection) {
    completedSection = document.createElement("div");
    completedSection.id = "completedSection";
    document.body.appendChild(completedSection);
  }

  dueList.innerHTML = "";
  allProblems.innerHTML = "";
  completedSection.innerHTML = "<h2>Completed Today</h2>";

  const today = new Date();

  problems.forEach(problem => {

    // DUE TODAY
    problem.revisionDates.forEach(date => {
      if (
        isSameDay(date, today) &&
        !problem.completedRevisions.includes(date)
      ) {
        const div = document.createElement("div");
        div.className = "card due";
        div.innerHTML = `
          ${problem.name} - Revision Due
          <button onclick="markRevision(${problem.id}, '${date}')">
            Mark Complete
          </button>
        `;
        dueList.appendChild(div);
      }
    });

    // ALL PROBLEMS
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${problem.name}</strong><br>
      Solved: ${new Date(problem.dateSolved).toDateString()}
    `;
    allProblems.appendChild(card);
  });

  // COMPLETED TODAY
  completedToday.forEach(item => {
    if (isSameDay(item.completedAt, today)) {
      const div = document.createElement("div");
      div.className = "card done";
      div.innerHTML = `
        ${item.name} - Completed
      `;
      completedSection.appendChild(div);
    }
  });
}

render();
