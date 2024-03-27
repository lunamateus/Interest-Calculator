import {createAccordion} from './accordion.js';

export let userLang;
export let dataT;
const langButtons = document.querySelectorAll(".lang-link");
const currentYearSpan = document.getElementById("currentYear");
const languageButton = document.getElementById("language");
const htmlTag = document.querySelector('html');

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

function setTitle(pages, website) {
  const titles = document.querySelectorAll('title');
  let thisPage = (window.location.pathname).split("/").pop().split(".")[0];
  thisPage = thisPage ? thisPage : 'index';
  
  titles[0].textContent = `${pages[thisPage]} | ${website}`;
}

function addIcon(name) {
  const img = document.createElement('img');
  img.src = `./assets/images/${name}.png`;
  img.alt = name;
  return img;
}

function setTextContent(elementType, attribute, data, opt = {tooltip: false, icon: false}) {
  const elements = document.querySelectorAll(elementType);

  for (const element of elements) {
    const id = element.getAttribute(attribute);
    const text = data[id];

    if (text) {
      if (opt.tooltip) {
        new bootstrap.Tooltip(element, {title:text});
      } else {
        element.textContent = text;
        if (opt.icon) {
          element.textContent += ' ';
          element.appendChild(addIcon(id));
        }
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
  languageButton.setAttribute('data-text', lang);
  htmlTag.setAttribute('lang', lang);

  setTitle(data.links, data.headers.headerCalculator);
  setTextContent('h3', 'id', data.headers);
  setTextContent('a', 'data-text', data.links);
  setTextContent('button', 'data-text', data.language, {icon: true});
  setTextContent('span', 'id', data.tooltips, {tooltip: true});
  setTextContent('label', 'for', data.labels);
  setTextContent('option', 'id', data.select);
  setTextContent('span', 'id', data.span);
  setTextContent('button', 'id', data.buttons);
  setTextContent('a', 'data-text', data.language, {icon: true});
  if (document.location.pathname.includes('faq')) {
    setTextContent('h3', 'data-text', data.links);
    createAccordion(data.faq);
  } else if (document.location.pathname.includes('contact')) {
    setTextContent('p', 'id', data.headers);
  }
}

function getLocalLanguage() {
  return (navigator.language || navigator.browserLanguage).substring(0, 2);
}

userLang = localStorage.getItem("userLang") ? localStorage.getItem("userLang") : getLocalLanguage();
dataT = await loadTranslations(userLang);

langButtons.forEach(function(button) {
  button.addEventListener("click", async function() {
    const thisPage = document.location.pathname;
    
    userLang = this.dataset.text;
    localStorage.setItem("userLang", userLang);
    dataT = await loadTranslations(userLang);

    if (thisPage.includes('index') || thisPage == '/'){
      document.getElementById("results").innerHTML = "";
      document.getElementById("evoChart").style.display = "none";
    } else if (thisPage.includes('faq')) {
      document.getElementById("faqAccordion").innerHTML = "";
    }

    loadTexts(dataT, userLang);
  });
});

loadTexts(dataT, userLang);
currentYearSpan.textContent = new Date().getFullYear();
