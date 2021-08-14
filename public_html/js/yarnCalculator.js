const form = document.getElementById("formCalculator");

const totalYardageUsed = (
  yardageFullSkein,
  weightFinishedProject,
  weightFullSkein
) => {
  return weightFullSkein > 0
    ? `${((yardageFullSkein * weightFinishedProject) / weightFullSkein).toFixed(
        2
      )} yards used.`
    : "Skein weight must be greater than zero.";
};

const displayTotalYardageUsed = () => {
  const yardageFullSkein = parseFloat(
    document.getElementById("totalYardageSkein").value
  );
  const weightFinishedProject = parseFloat(
    document.getElementById("weightFinishedProject").value
  );
  const weightFullSkein = parseFloat(
    document.getElementById("weightFullSkein").value
  );
  const output = document.getElementById("yardage-used");

  //set p tag to output of calculation
  output.innerText = totalYardageUsed(
    yardageFullSkein,
    weightFinishedProject,
    weightFullSkein
  );
};
