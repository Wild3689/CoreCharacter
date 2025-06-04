function getMaxStatPoints(level) {
  if (level < 1) return 0;
  let base = 4;
  let extra = 0;

  for (let i = 2; i <= level; i++) {
    if ((i - 1) % 3 !== 0) {
      extra += 1;
    }
  }

  return base + extra;
}

function getStatValues() {
  return {
    might: parseInt(document.getElementById("might").value) || 1,
    agility: parseInt(document.getElementById("agility").value) || 1,
    brains: parseInt(document.getElementById("brains").value) || 1,
    wits: parseInt(document.getElementById("wits").value) || 1
  };
}

function validateStats() {
  const level = parseInt(document.getElementById("level").value) || 1;
  const maxPoints = getMaxStatPoints(level);
  const baseStats = 4;

  const stats = getStatValues();
  const usedPoints = stats.might + stats.agility + stats.brains + stats.wits - baseStats;
  const remainingPoints = maxPoints - usedPoints;

  // Update max values dynamically with a cap of 6
  for (let stat in stats) {
    const input = document.getElementById(stat);
    const currentValue = stats[stat];
    const maxAllowed = Math.min(currentValue + remainingPoints, 6);
    input.max = maxAllowed;
  }

  // Optional: show remaining points
  const display = document.getElementById("points-remaining");
  if (display) {
    display.textContent = `Points remaining: ${remainingPoints}`;
  }
}

function updateItemSlots() {
  const might = parseInt(document.getElementById("might").value) || 1;
  const container = document.getElementById("item-slots");

  // Backup current item values
  const currentValues = Array.from(container.querySelectorAll("input")).map(input => input.value);

  // Clear existing slots
  container.innerHTML = "";

  // Create new slots based on Might
  for (let i = 0; i < might; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Item ${i + 1}`;
    input.value = currentValues[i] || ""; // Restore value if it exists
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }
}


function updateTalents() {
  const container = document.getElementById("talents");
  let talentValues = [];
}

  // Backup current values
  const currentInputs = container.querySelectorAll("input");
  currentInputs.forEach((input, i) => {
    talentValues[i] = input.value;
  });

  // Clear the container
  container.innerHTML = "";

function createTalentInput(index) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Talent ${index + 1}`;
  input.value = talentValues[index] || "";
  input.oninput = () => {
    talentValues[index] = input.value;
  };
  container.appendChild(input);
  container.appendChild(document.createElement("br"));
}

// Rebuild all saved talents
function updateTalents() {
  for (let i = 0; i < talentValues.length; i++) {
    createTalentInput(i);
  }
}

function backup() {
  const storage = localStorage;
  storage.setItem("charName", document.getElementById("charName"));
}

function loadLocal() {
  const display = document.getElementByID("charName");
  if (display) {
    display.textContent = localStorage.getItem("charName");
  }
}

window.onload = function () {
  validateStats();
  updateItemSlots();
  updateTalents();
  loadLocal();
};
