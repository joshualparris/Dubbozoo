'use strict';
(() => {
  const cards = Array.from(document.querySelectorAll('.animal-card'));
  const search = document.getElementById('species-search');
  const evidence = document.getElementById('evidence-filter');
  const regionButtons = Array.from(document.querySelectorAll('[data-region-filter]'));
  const loadMore = document.getElementById('load-more');
  const count = document.getElementById('results-count');
  const empty = document.getElementById('no-results');
  let region = 'All', visibleLimit = 18;
  if (search && evidence && cards.length && count) {
    const apply = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const selected = evidence.value;
      const matched = cards.filter(card => {
        if (region !== 'All' && card.dataset.region !== region) return false;
        if (selected === 'question' && card.dataset.unverified !== 'yes') return false;
        if (selected === 'taxonomy' && card.dataset.taxon !== 'yes') return false;
        if (selected === 'strong' && card.dataset.strong !== 'yes') return false;
        return (card.dataset.search || '').includes(query);
      });
      const displayed = Math.min(visibleLimit, matched.length);
      const remaining = Math.max(0, matched.length - displayed);
      const shown = new Set(matched.slice(0, displayed));
      cards.forEach(card => card.hidden = !shown.has(card));
      count.textContent = displayed + ' of ' + matched.length + ' matching animals shown (' + cards.length + ' total).';
      if (empty) empty.hidden = matched.length > 0;
      if (loadMore) {
        loadMore.hidden = remaining === 0;
        loadMore.disabled = remaining === 0;
        loadMore.textContent = remaining > 0
          ? 'Show ' + Math.min(21, remaining) + ' more animals (' + remaining + ' remaining) →'
          : 'All matching animals shown';
      }
    };
    search.addEventListener('input', () => { visibleLimit = 18; apply(); });
    evidence.addEventListener('change', () => { visibleLimit = 18; apply(); });
    regionButtons.forEach(button => button.addEventListener('click', () => {
      region = button.dataset.regionFilter;
      visibleLimit = 18;
      regionButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      apply();
    }));
    if (loadMore) loadMore.addEventListener('click', () => {
      // Never let repeated clicks, including clicks on a CSS-visible hidden button,
      // produce a negative count or pages beyond the number of matching animals.
      const matchingCount = cards.filter(card => {
        const query = search.value.trim().toLocaleLowerCase();
        return (region === 'All' || card.dataset.region === region) &&
          (evidence.value === 'all' ||
            (evidence.value === 'question' && card.dataset.unverified === 'yes') ||
            (evidence.value === 'taxonomy' && card.dataset.taxon === 'yes') ||
            (evidence.value === 'strong' && card.dataset.strong === 'yes')) &&
          (card.dataset.search || '').includes(query);
      }).length;
      if (visibleLimit >= matchingCount) return;
      visibleLimit = Math.min(matchingCount, visibleLimit + 21);
      apply();
    });
    apply();
  }
  const repoCards = Array.from(document.querySelectorAll('.repo-card'));
  document.querySelectorAll('[data-repo-filter]').forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.repoFilter;
    document.querySelectorAll('[data-repo-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    repoCards.forEach(card => card.hidden = kind !== 'All' && card.dataset.category !== kind);
  }));
  const loadQuestions = document.getElementById('load-questions');
  const questionPanel = document.getElementById('question-panel');
  const questionSearch = document.getElementById('question-search');
  const questionResults = document.getElementById('question-results');
  const questionCount = document.getElementById('question-count');
  let questions = null;
  const appendTextWithLinks = (element, raw) => {
    const plain = String(raw || '').replace(/\*\*/g, '').replace(/\`/g, '');
    const expression = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let index = 0, match;
    while ((match = expression.exec(plain))) {
      element.append(document.createTextNode(plain.slice(index, match.index)));
      const link = document.createElement('a');
      link.href = match[2]; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = match[1]; element.append(link); index = expression.lastIndex;
    }
    element.append(document.createTextNode(plain.slice(index)));
  };
  const renderQuestions = () => {
    if (!questions || !questionResults || !questionSearch) return;
    const query = questionSearch.value.trim().toLocaleLowerCase();
    const matches = !query
      ? questions.filter(q => [7,27,99,107,277,344,438,471].includes(Number(q.id.slice(-4))))
      : questions.filter(q => (q.id + ' ' + q.question + ' ' + (q.current_atlas_answer || '')).toLocaleLowerCase().includes(query));
    const display = matches.slice(0,10);
    questionResults.replaceChildren();
    display.forEach(q => {
      const item = document.createElement('article');item.className = 'question-hit';
      const source = document.createElement('div');source.className = 'source-line';
      source.textContent = q.id + ' · ' + (q.source_review_status === 'not_freshly_verified' ? 'Not independently source-checked' : 'AI source-text checked');
      const heading = document.createElement('h4');heading.textContent = q.question;
      const answer = document.createElement('p');appendTextWithLinks(answer,q.current_atlas_answer || 'No revised answer stored.');
      item.append(source, heading, answer);questionResults.append(item);
    });
    if (questionCount) questionCount.textContent = (query ? matches.length + ' matching questions' : 'Selected source examples') + ' · displaying ' + display.length + ' · 622 total parent questions';
    if (!display.length) { const p=document.createElement('p');p.textContent='No matching questions. Try an animal name or ID such as Q0007.';questionResults.append(p); }
  };
  if (loadQuestions && questionPanel && questionSearch && questionResults) {
    loadQuestions.addEventListener('click',async () => {
      if (questions) { questionPanel.hidden = false; questionSearch.focus(); return; }
      loadQuestions.disabled = true;loadQuestions.textContent='Opening research index…';
      try {
        const response = await fetch('data/question-verification-ledger-2026-10-18.json',{credentials:'omit'});
        if (!response.ok) throw new Error('HTTP '+response.status);
        const data = await response.json();
        if (!Array.isArray(data.questions)) throw new Error('The research format is invalid');
        questions = data.questions;
        questionPanel.hidden = false;
        loadQuestions.textContent='Question explorer loaded ✓';
        renderQuestions();
        questionSearch.focus();
      } catch (error) {
        loadQuestions.textContent='Could not open question data — retry';
        loadQuestions.disabled = false;
        if (questionCount) questionCount.textContent='The local research file could not be loaded. You can still open it on GitHub.';
        questionPanel.hidden = false;
      }
    });
    questionSearch.addEventListener('input',renderQuestions);
  }
})();

'use strict';
(() => {
  // Dubbozoo discovery media — field journal, timeline and privacy-safe story player.
  const journalCards = Array.from(document.querySelectorAll('.journal-card'));
  const animalCards = Array.from(document.querySelectorAll('.animal-card'));
  const findAnimalCard = number => animalCards.find(card => {
    const label = card.querySelector('.animal-number');
    return label && label.textContent.replace(/\D/g,'').padStart(3,'0') === String(number).padStart(3,'0');
  });
  journalCards.forEach(card => {
    const source = findAnimalCard(card.dataset.animalNumber);
    const img = source && source.querySelector('.animal-photo img');
    const target = card.querySelector('.journal-photo');
    if (img && target) target.style.backgroundImage = 'linear-gradient(0deg,rgba(13,45,37,.12),rgba(13,45,37,.04)),url("' + img.src.replace(/"/g,'%22') + '")';
  });

  document.querySelectorAll('[data-timeline-filter]').forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.timelineFilter;
    document.querySelectorAll('[data-timeline-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('.timeline-item').forEach(item => item.hidden = selected !== 'all' && item.dataset.timelineKind !== selected);
  }));

  const speechSupport = document.getElementById('speech-support');
  const narrationNow = document.getElementById('narration-now');
  const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let currentUtterance = null;
  const speak = (text, label) => {
    if (!canSpeak || !text) {
      if (narrationNow) narrationNow.textContent = 'Narration is not available in this browser.';
      return;
    }
    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'en-AU';
    currentUtterance.rate = 0.96;
    currentUtterance.onend = () => { currentUtterance = null; };
    if (narrationNow) narrationNow.textContent = 'Now listening: ' + (label || 'Dubbozoo field journal');
    window.speechSynthesis.speak(currentUtterance);
  };
  if (speechSupport) speechSupport.textContent = canSpeak ? 'Narration available on this device ✓' : 'Narration unavailable in this browser';
  journalCards.forEach(card => {
    const button = card.querySelector('.listen-inline');
    if (button) button.addEventListener('click', () => speak(card.dataset.narration, card.dataset.storyTitle));
  });
  const tourButton = document.getElementById('listen-tour');
  if (tourButton) tourButton.addEventListener('click', () => {
    const tour = journalCards.map(card => card.dataset.narration).filter(Boolean).join(' Next stop. ');
    speak('Welcome to the Dubbozoo field journal highlights tour. ' + tour, 'six-stop highlights tour');
  });
  const pauseButton = document.getElementById('pause-narration');
  if (pauseButton) pauseButton.addEventListener('click', () => {
    if (!canSpeak) return;
    if (window.speechSynthesis.paused) window.speechSynthesis.resume(); else if (window.speechSynthesis.speaking) window.speechSynthesis.pause();
  });
  const stopButton = document.getElementById('stop-narration');
  if (stopButton) stopButton.addEventListener('click', () => {
    if (canSpeak) window.speechSynthesis.cancel();
    currentUtterance = null;
    if (narrationNow) narrationNow.textContent = 'Narration stopped. Choose a story whenever you are ready.';
  });

  const stories = journalCards.map(card => {
    const photo = card.querySelector('.journal-photo');
    return {
      title: card.dataset.storyTitle || '',
      caption: card.dataset.storyCaption || '',
      image: photo ? photo.style.backgroundImage : ''
    };
  });
  let storyIndex = 0, storyTimer = null;
  const storyImage = document.getElementById('story-image');
  const storyTitle = document.getElementById('story-title');
  const storyCaption = document.getElementById('story-caption');
  const storyCounter = document.getElementById('story-counter');
  const storyPlay = document.getElementById('story-play');
  const renderStory = index => {
    if (!stories.length) return;
    storyIndex = (index + stories.length) % stories.length;
    const story = stories[storyIndex];
    if (storyImage) {
      storyImage.style.backgroundImage = story.image || 'linear-gradient(145deg,#426953,#162f28)';
      storyImage.classList.remove('story-fade');
      void storyImage.offsetWidth;
      storyImage.classList.add('story-fade');
    }
    if (storyTitle) storyTitle.textContent = story.title;
    if (storyCaption) storyCaption.textContent = story.caption;
    if (storyCounter) storyCounter.textContent = 'Story ' + (storyIndex + 1) + ' of ' + stories.length;
  };
  const stopStory = () => {
    if (storyTimer) window.clearInterval(storyTimer);
    storyTimer = null;
    if (storyPlay) storyPlay.textContent = '▶ Auto-play';
  };
  const startStory = () => {
    stopStory();
    storyTimer = window.setInterval(() => renderStory(storyIndex + 1), 6500);
    if (storyPlay) storyPlay.textContent = 'Ⅱ Pause story';
  };
  const prev = document.getElementById('story-prev'), next = document.getElementById('story-next');
  if (prev) prev.addEventListener('click', () => { stopStory(); renderStory(storyIndex - 1); });
  if (next) next.addEventListener('click', () => { stopStory(); renderStory(storyIndex + 1); });
  if (storyPlay) storyPlay.addEventListener('click', () => storyTimer ? stopStory() : startStory());
  journalCards.forEach((card, index) => {
    const button = card.querySelector('.watch-inline');
    if (button) button.addEventListener('click', () => {
      stopStory(); renderStory(index);
      const target = document.getElementById('listen-watch');
      if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
  renderStory(0);
})();
