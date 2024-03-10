import data from "../json/texts.json" assert { type: "json" };

function setTitle(titleData) {
  const titles = document.querySelectorAll('title');
  for (const title of titles) {
    title.textContent = titleData;
  }
}

function setTextContent(elementType, attribute, data, tooltip = false) {
  const elements = document.querySelectorAll(elementType);

  for (const element of elements) {
    const id = element.getAttribute(attribute);
    const text = data[id];

    if (text) {
      if (tooltip) {
        new bootstrap.Tooltip(element, {title:text});
      } else {
        element.textContent = text
      }
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

setTitle(data.headers.headerCalculator);
setTextContent('h3', 'id', data.headers);
setTextContent('label', 'for', data.labels);
setTextContent('button', 'id', data.buttons);
setTextContent('a', 'id', data.links);
setTextContent('span', 'id', data.tooltips, true);