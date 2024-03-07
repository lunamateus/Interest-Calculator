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

    // Find matching tooltip data based on labelId
    const matchingTooltip = tooltipData.find(tooltip => tooltip.labelId === labelId);
    if (matchingTooltip) {
      const span = document.createElement(matchingTooltip.tag); // Use tag from JSON
      span.classList.add(matchingTooltip.class); // Add class from JSON

      // Set tooltip attributes based on JSON data
      span.setAttribute('data-bs-toggle', 'tooltip');
      span.setAttribute('data-bs-placement', matchingTooltip.attributes.data_bs_placement);
      span.setAttribute('data-bs-title', matchingTooltip.attributes.data_bs_title);
      span.textContent = 'info';

      // Insert the span element after the label
      label.parentNode.insertBefore(span, label.nextSibling);
    }
  }
}

insertTitle(data.title);
insertLabels(data.labels);
insertTooltips(data.tooltips);