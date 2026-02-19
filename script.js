let problems = JSON.parse(localStorage.getItem("problems")) || [];

function save() {
  localStorage.setItem("problems", JSON.stringify(problems));
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

function markRevision(id, date) {
  const problem = problems.find(p => p.id === id);
  problem.completedRevisions.push(date);
  save();
  render();
}

function render() {
  const dueList = document.getElementById("dueList");
  const allProblems = document.getElementById("allProblems");
  dueList.innerHTML = "";
  allProblems.innerHTML = "";

  const today = new Date();

  problems.forEach(problem => {

    // Due section
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
            Mark Done
          </button>
        `;
        dueList.appendChild(div);
      }
    });

    // All problems
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${problem.name}</strong><br>
      Solved: ${new Date(problem.dateSolved).toDateString()}
    `;
    allProblems.appendChild(card);
  });
}

render();
