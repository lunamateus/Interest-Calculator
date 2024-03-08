import data from "../json/texts.json" assert { type: "json" };

function insertTitle(titleData) {
  const titles = document.getElementsByClassName("title");
  for (const title of titles) {
    title.textContent = titleData;
  }
}

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

function insertTooltips(tooltipData) {
  const labels = document.querySelectorAll('label');

  for (const label of labels) {
    const labelId = label.getAttribute('for');
    const tooltipTitle = tooltipData[labelId];

    if (tooltipTitle) {
      const span = document.createElement('span');
      span.classList.add("material-symbols-outlined");

      // Set attributes using default and specific data
      span.setAttribute('data-bs-toggle', 'tooltip');
      span.setAttribute('data-bs-placement', 'right');
      span.setAttribute('data-bs-title', tooltipTitle);
      span.textContent = 'info';

      label.parentNode.insertBefore(span, label.nextSibling);
    }
  }
}


export function getJsonValue(key) {
  if (typeof data === 'object' && data !== null) {
    // Check if the key exists in the object
    if (key in data) {
      return data[key];
    } else {
      // Recursively search nested dictionaries (if applicable)
      for (const value of Object.values(data)) {
        const result = getJsonValue(value, key);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }

  return undefined; // Key not found or invalid data structure
}

insertTitle(data.title);
insertLabels(data.labels);
insertTooltips(data.tooltips);