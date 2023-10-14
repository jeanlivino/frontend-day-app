import { hasSaved } from "./LocalStorage";

export function renderTopic(card) {
  return `<li class="topicos-cronograma-content">
          <div>
            <p id="horario-topico" class="horario-topico">${card.hour}</p>
          </div>
          <div class="nome-topico">
            <p id="nome-topico">${card.title}</p>
          </div>
        </li>`;
}
export function renderTalk(talk) {
  const saved = hasSaved(talk);

  // Mapeamento de substituição
  const roomMappings = {
    'principal': 'Auditório',
    'invite': 'Convida',
    'frontend': 'Front-End',
    'communities': 'Comunidades',
  };

  // Verifique se o tipo de sala está no mapeamento e faça a substituição
  const roomName = roomMappings[talk.room] || talk.room;


  function getSocialLinks(url) {
    let linkName = 'LinkedIn';
    let iconLink = 'fa-brands fa-linkedin'
    switch (true) {
      case url.includes('instagram.com'):
        linkName = 'Instagram'
        iconLink = 'fa-brands fa-instagram'
        break;
      case url.includes('github.com'):
        linkName = 'GitHub';
        iconLink = 'fa-brands fa-github'
        break;
      case url.includes('pmenoslab'):
        linkName = 'Site';
        iconLink = 'fa-solid fa-globe'
        break;
      case url.includes('twitter.com'):
        linkName = 'Twitter';
        iconLink = 'fa-brands fa-x-twitter'
        break;
    }
    return { linkName, iconLink };
  }
  
  const socialInfo = getSocialLinks(talk.speaker.social_link);
  const linkName = socialInfo.linkName;
  const iconLink = socialInfo.iconLink;
  

  return `<li class="cards-palestrante-content">
  <div class="info-post">
      <div class="user">
          <div class="user-img">
              <img src="./assets/logos/frontenday2023.svg" alt="Logo Front-End Day 2023">
          </div>
          <div class="user-nome">
              <p class="horarioLive">${talk.hour}</p>
          </div>
        </div>
        <div class="action">
          <label><input type="checkbox" data-id="${talk.id}" ${saved ? 'checked' : ''} onclick="handleToggleSave(this)" /><span class="btn-salvar"><i class="fa-solid fa-bookmark icon-salvar"></i></span></label>
        </div>
  </div>
  <div class="palestrante">
  <div class="img-palestrante">
  <img src="${talk.speaker.image}" alt="${talk.title}" class="imag-palestrante">
  </div>
  <div class="info-palestrante">
  <div class="nome-cargo">
  <h3 class="nomePalestrante">${talk.speaker.title}</h3>
  <p class="cargoPalestrante">${talk.speaker.role} 
  ${talk.speaker.company}</p>
  </div>
  
  <div class="redes-profile">
  <div class="linkedin-user">
  <a href="${talk.speaker.social_link}" target="_blank"><i class="${iconLink}"></i>
  <p class="name-link">${linkName}</p>
  </a>
  </div>
  </div>
  
  <div class="trilha">
  <p class="trilhaPalestrante">Trilha: ${roomName}</p>
  </div>
  </div>
  </div>
  <div class="assunto-palestra">
  <p class="assuntoLive">${talk.title}</p>
  </div>
</li>`;
}