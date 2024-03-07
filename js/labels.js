import labelData from "../json/labels.json" assert { type: "json" };

function insertLabels(labelsData) {
  const labels = document.querySelectorAll('label');

  for (const label of labels) {
    const labelId = label.getAttribute('for');

    // Find matching tooltip data based on labelId
    const matchingLabel = labelsData.find(label => label.for === labelId);
    if (matchingLabel) {
      label.textContent = matchingLabel.text;
    }
  }
}

insertLabels(labelData.labels);

