const userLang = (navigator.language || navigator.browserLanguage).substring(0, 2);
export const dataT = await loadTranslations(userLang);

async function loadTranslations(lang) {
  const file = `json/${lang == 'pt' ? 'pt' : 'en'}.json`; 
  try {
    const response = await fetch(file);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error loading translation file:', error);
  }
}

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
  if (typeof dataT === 'object' && dataT !== null) {
    if (key in dataT) {
      return dataT[key];
    } else {
      for (const value of Object.values(dataT)) {
        const result = getJsonValue(value, key);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return undefined;
}

setTitle(dataT.headers.headerCalculator);
setTextContent('h3', 'id', dataT.headers);
setTextContent('label', 'for', dataT.labels);
setTextContent('button', 'id', dataT.buttons);
setTextContent('a', 'id', dataT.links);
setTextContent('span', 'id', dataT.tooltips, true);