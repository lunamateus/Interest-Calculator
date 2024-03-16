import {createAccordion} from './faq.js';

export let userLang;
export let dataT;
const langButtons = document.querySelectorAll(".lang-link");
const currentYearSpan = document.getElementById("currentYear");

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

function loadTexts(data, lang) {
  document.getElementById("language").setAttribute('data-text', lang);

  setTitle(data.headers.headerCalculator);
  setTextContent('h3', 'id', data.headers);
  setTextContent('a', 'data-text', data.links);
  setTextContent('button', 'data-text', data.language);
  setTextContent('label', 'for', data.labels);
  setTextContent('button', 'id', data.buttons);
  setTextContent('span', 'id', data.tooltips, true);
  setTextContent('a', 'data-text', data.language);
  if (document.location.pathname == '/faq.html') {
    setTextContent('h3', 'data-text', data.links);
    createAccordion(data.faq);
  }
}

function getLocalLanguage() {
  return (navigator.language || navigator.browserLanguage).substring(0, 2);
}

userLang = localStorage.getItem("userLang") ? localStorage.getItem("userLang") : getLocalLanguage();
dataT = await loadTranslations(userLang);

langButtons.forEach(function(button) {
  button.addEventListener("click", async function() {
    const newLang = this.dataset.text;
    localStorage.setItem("userLang", newLang); // Save the new language
    const newTexts = await loadTranslations(newLang);

    userLang = newLang;
    dataT = newTexts;

    if (document.location.pathname == '/faq.html') {
      document.getElementById("faqAccordion").innerHTML = "";
    } else if (document.location.pathname == '/index.html'){
      document.getElementById("results").innerHTML = "";
      document.getElementById("evoChart").style.display = "none";
    }

    loadTexts(dataT, userLang);
  });
});

currentYearSpan.textContent = new Date().getFullYear();
loadTexts(dataT, userLang);
