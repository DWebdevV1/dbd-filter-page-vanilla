import {SURVIVOR_URL, KILLER_URL, MAP_URL, KILLER_AUDIO, SURVIVORS, KILLERS, MAPS} from './variables.js';
import {createSurvivorModal} from "./actions.js";

export let survivorList = [];
export let killerList = [];
export let mapList = [];

async function getSurvivors() {
    try {
        const data = await fetch(SURVIVOR_URL);
        return data.json();
    } catch (e) {
        return [];
    }
}

async function getKillers() {
    try {
        const data = await fetch(KILLER_URL);
        return data.json();
    } catch (e) {
        return [];
    }
}
async function getMaps() {
    try {
        const data = await fetch(MAP_URL);
        return data.json();
    } catch (e) {
        return [];
    }
}

export async function initAppData() {
    const survivors = await getSurvivors();
    const killers = await getKillers();
    const maps = await getMaps();

    if (survivors && survivors?.length) {
        survivorList = survivors;
        await initSurvivors(survivors);
    }

    if (killers && killers?.length) {
        killerList = killers;
        await initKillers(killers);
    }

    if (maps && maps?.length) {
        mapList = maps;
        await initMaps(maps);
    }
}

export function initSurvivors(survivorArr) {
    SURVIVORS.replaceChildren('', '');

    survivorArr
        .filter(s => s.active)
        .forEach(survivor => {
        const div = document.createElement('div');
        const span = document.createElement('span');

        div.classList.add('box-survivor');
        div.style.backgroundImage = `url('${survivor?.imagePath}')`;
        span.classList.add('box__badge');
        span.classList.add('box-survivor__badge--center');
        span.textContent = survivor?.name;

        div.addEventListener('click', () => createSurvivorModal(survivor));
        div.appendChild(span);
        SURVIVORS.appendChild(div);
    });
}

export function initKillers(killerArr) {
    KILLERS.replaceChildren('', '');

    killerArr
        .filter(s => s.active)
        .forEach(killer => {
        const div = document.createElement('div');
        const spanMain = document.createElement('span');
        const spanSide = document.createElement('span');

        div.classList.add('box-killer');
        spanMain.classList.add('box__badge');
        spanMain.classList.add('box-killer__badge--center');
        spanSide.classList.add('box__badge');
        spanSide.classList.add('box__badge--side');

        div.style.backgroundImage = `url('${killer?.imagePath}')`;
        div.setAttribute('id', killer?.id);
        div.addEventListener('click', () => playKillerSound(killer.id));
        spanMain.textContent = killer?.name;
        spanSide.textContent = killer?.name;

        div.appendChild(spanMain);
        div.appendChild(spanSide);
        KILLERS.appendChild(div);
    });
}

export function initMaps(mapArr) {
    MAPS.replaceChildren('', '');

    mapArr
        .filter(s => s.active)
        .forEach(map => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        const span = document.createElement('span');

        div.classList.add('box-map');
        p.classList.add('box-map__text');
        span.classList.add('box__badge');
        span.classList.add('box-map__badge__name');

        div.style.backgroundImage = `url('${map['imagePath']}')`;
        p.textContent = map['mapText'];
        span.textContent = map['name'];

        div.appendChild(p);
        div.appendChild(span);
        MAPS.appendChild(div);
    });
}

function playKillerSound(killerId) {
    try {
        const killer = killerList.find(k => k.id === Number(killerId));
        const lastKiller = killerList.find(k => k.selected);
        const data = KILLER_AUDIO.src.split('/');
        const currentMp3 = data[data.length - 1]?.toLowerCase();

        if (currentMp3 && killer?.audioPath?.toLowerCase().includes(currentMp3)) {
            KILLER_AUDIO.pause();
            KILLER_AUDIO.src = '';
            toggleSoundClass(false, null, lastKiller);
        } else {
            KILLER_AUDIO.src = killer.audioPath;
            KILLER_AUDIO.play().then(() => null);
            toggleSoundClass(true, killer, lastKiller);
        }
    } catch (e) {
        console.log('Error while playing killer sound', e);
    }
}

function toggleSoundClass(active, killer, lastKiller) {
    if (killer) {
        const killerEl = KILLERS.childNodes.item(killer.id + 1);
        killerEl.classList.add('box-killer--sound-active');
        active ? killer.selected = true : killer.selected = false;
    }
    if (lastKiller) {
        const lastKillerEl = KILLERS.childNodes.item(lastKiller.id + 1);
        lastKillerEl.classList.remove('box-killer--sound-active');
        lastKiller.selected = false;
    }
}


