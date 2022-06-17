import {SURVIVORS, KILLERS, MAPS, NAV_SURVIVORS, NAV_KILLERS, NAV_MAPS, SEARCH_INPUT} from './variables.js';
import { initAppData, initSurvivors, initKillers, initMaps, survivorList, killerList, mapList } from './init.js';

let lastSelectedNav = 'SURVIVORS';

function showSelectedNavPart(part) {
    switch(part) {
        case 'SURVIVORS':
            KILLERS.style.display = 'none';
            MAPS.style.display = 'none';
            SURVIVORS.style.display = 'flex';

            NAV_SURVIVORS.children[0].classList.add('link-active');
            NAV_KILLERS.children[0].classList.remove('link-active');
            NAV_MAPS.children[0].classList.remove('link-active');
            break;
        case 'KILLERS':
            SURVIVORS.style.display = 'none';
            MAPS.style.display = 'none';
            KILLERS.style.display = 'flex';

            NAV_KILLERS.children[0].classList.add('link-active');
            NAV_SURVIVORS.children[0].classList.remove('link-active');
            NAV_MAPS.children[0].classList.remove('link-active');
            break;
        case 'MAPS':
            SURVIVORS.style.display = 'none';
            KILLERS.style.display = 'none';
            MAPS.style.display = 'flex';

            NAV_MAPS.children[0].classList.add('link-active');
            NAV_SURVIVORS.children[0].classList.remove('link-active');
            NAV_KILLERS.children[0].classList.remove('link-active');
            break;
    }
}

function setLastSelectedNav(part) {
    lastSelectedNav = part;
}

NAV_SURVIVORS.addEventListener('click', () => {
    showSelectedNavPart('SURVIVORS');
    setLastSelectedNav('SURVIVORS');
    localStorage.setItem('LAST_SELECTED_NAV_PART', 'SURVIVORS');
});

NAV_KILLERS.addEventListener('click', () => {
    showSelectedNavPart('KILLERS');
    setLastSelectedNav('KILLERS');
    localStorage.setItem('LAST_SELECTED_NAV_PART', 'KILLERS');
});

NAV_MAPS.addEventListener('click', () => {
    showSelectedNavPart('MAPS');
    setLastSelectedNav('MAPS');
    localStorage.setItem('LAST_SELECTED_NAV_PART', 'MAPS');
});

SEARCH_INPUT.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const searchValue = e.target.value.toLowerCase();
    let result = [];

    switch (lastSelectedNav) {
        case 'SURVIVORS':
            result = survivorList.filter(s => s.name.toLowerCase().includes(searchValue));
            initSurvivors(result);
            break;
        case 'KILLERS':
            result = killerList.filter(k => k.name.toLowerCase().includes(searchValue));
            initKillers(result);
            break;
        case 'MAPS':
            result = mapList.filter(m => m.name.toLowerCase().includes(searchValue));
            initMaps(result);
            break;
    }
})

function initApp() {
    const lastPart = localStorage.getItem('LAST_SELECTED_NAV_PART') || 'SURVIVORS';
    showSelectedNavPart(lastPart);
}

initAppData()
    .then(() => initApp())
    .catch((e) => console.log('Error while initializing app', e))
    .finally(() => console.log('App initialized'));