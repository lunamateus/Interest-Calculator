import data from "../json/texts.json" assert { type: "json" };

function setTitle(titleData) {
  const titles = document.getElementsByClassName("title");
  for (const title of titles) {
    title.textContent = titleData;
  }
}

function setLabels(labelsData) {
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

function setTooltips(tooltipData) {
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

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function setButtons(buttonData) {
  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    const buttonId = button.getAttribute('id');
    const btnText = buttonData[buttonId];

    if (btnText) {
      button.textContent = btnText;
    }
  }
}

export function getJsonValue(key) {
  if (typeof data === 'object' && data !== null) {
    if (key in data) {
      return data[key];
    } else {
      for (const value of Object.values(data)) {
        const result = getJsonValue(value, key);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return undefined;
}

setTitle(data.title);
setLabels(data.labels);
setButtons(data.buttons);
setTooltips(data.tooltips);