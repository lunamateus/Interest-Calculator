export function createAccordion(questionsData) {
  const accordionContainer = document.getElementById('faqAccordion');

  for (const question in questionsData) {
    const accordionItem = createAccordionItem(questionsData[question], question);
    accordionContainer.appendChild(accordionItem);
  }
}

export function createAccordionItem(questionData, number) {
  const { question, answer } = questionData; // Destructuring assignment

  const accordionItem = document.createElement('div');
  accordionItem.classList.add('accordion-item');

  const accordionHeader = document.createElement('h3');
  accordionHeader.classList.add('accordion-header');
  accordionHeader.setAttribute('id', `heading-${number}`); // Extract number from question

  const button = document.createElement('button');
  button.classList.add('accordion-button', 'collapsed');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', `#collapse-${number}`); // Extract number from question
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', `collapse-${number}`); // Extract number from question
  button.textContent = question;

  accordionHeader.appendChild(button);

  const accordionContent = document.createElement('div');
  accordionContent.classList.add('accordion-collapse', 'collapse');
  accordionContent.setAttribute('id', `collapse-${number}`); // Extract number from question
  accordionContent.setAttribute('aria-labelledby', `heading-${number}`); // Extract number from question

  const accordionBody = document.createElement('div');
  accordionBody.classList.add('accordion-body');
  accordionBody.textContent = answer;

  accordionContent.appendChild(accordionBody);
  accordionItem.appendChild(accordionHeader);
  accordionItem.appendChild(accordionContent);

  return accordionItem;
}