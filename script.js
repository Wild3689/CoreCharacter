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
