const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const projectGrid = document.querySelector('#project-grid');
const timelineContainer = document.querySelector('#timeline');
const faqList = document.querySelector('#faq-list');

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${path}: ${response.status}`);
  }
  return response.json();
}

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function renderProjects(items) {
  if (!projectGrid) return;

  projectGrid.innerHTML = items
    .map((project) => {
      const featuredClass = project.featured ? 'project-featured' : '';
      return `
        <article class="project-card ${featuredClass}" data-category="${project.category}">
          <a class="project-art ${project.artClass}" href="${project.href}" aria-label="${project.ariaLabel}">
            ${project.content}
            <span class="art-label">${project.label}</span>
            <span class="art-open" aria-hidden="true">↗</span>
          </a>
          <div class="project-info">
            <div>
              <p class="project-type">${project.type}</p>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
            <div class="project-tags">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderTimeline(items) {
  if (!timelineContainer) return;
  timelineContainer.innerHTML = items
    .map(
      (item) => `
        <article class="timeline-item">
          <span class="timeline-year">${item.label}</span>
          <span class="timeline-dot" aria-hidden="true"></span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>`
    )
    .join('');
}

function renderFaq(items) {
  if (!faqList) return;
  faqList.innerHTML = items
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>`
    )
    .join('');
}

const filterButtons = document.querySelectorAll('.filter-button');
if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle('is-active', isSelected);
        filterButton.setAttribute('aria-pressed', String(isSelected));
      });

      document.querySelectorAll('.project-card').forEach((card) => {
        const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
        card.hidden = !shouldShow;
      });
    });
  });
}

async function initPortfolio() {
  try {
    const [projects, timeline, faq] = await Promise.all([
      loadJson('./src/data/projects.json'),
      loadJson('./src/data/timeline.json'),
      loadJson('./src/data/faq.json')
    ]);

    renderProjects(projects);
    renderTimeline(timeline);
    renderFaq(faq);
  } catch (error) {
    console.error('Portfolio initialisation failed:', error);
  }
}

initPortfolio();
document.querySelector('#current-year').textContent = new Date().getFullYear();
