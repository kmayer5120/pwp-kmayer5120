const form = document.getElementById("formCalculator");

const totalYardageUsed = (yardageFullSkein, weightFinishedProject, weightFullSkein) => {
    if (weightFullSkein < 0) {
        return "Cannot divide by zero. Please enter the weight of full skein.";
    }
    return (yardageFullSkein * weightFinishedProject) / weightFullSkein;
}

const displayTotalYardageUsed = () => {
    const yardageFullSkein = Number(document.getElementById("totalYardageSkein").value);
    const weightFinishedProject = Number(document.getElementById("weightFinishedProject").value);
    const weightFullSkein = Number(document.getElementById("weightFullSkein").value);
    const output = document.getElementById("yardageUsed");

    console.log({yardageFullSkein})
    console.log({weightFullSkein})
    console.log({weightFinishedProject})

    const yardageUsed = totalYardageUsed(yardageFullSkein, weightFinishedProject, weightFullSkein);

    output.innerText = `${yardageUsed} yards used`;
}