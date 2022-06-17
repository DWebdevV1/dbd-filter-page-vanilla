export function createSurvivorModal(data) {
    if (!data) return;

    const modalBg = document.createElement('div');
    const modal = document.createElement('div');
    const modalWrapper = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalImage = document.createElement('img');
    const modalTitle = document.createElement('h1');
    const modalHeadline = document.createElement('p');
    const modalText = document.createElement('p');

    modalBg.classList.add('modal--bg');
    modal.classList.add('modal');
    modal.classList.add('create-modal');
    modalWrapper.classList.add('modal__wrapper');
    modalContent.classList.add('modal__content');
    modalTitle.classList.add('modal__content__title');
    modalHeadline.classList.add('modal__content__headline');
    modalText.classList.add('modal__content__text');

    modalBg.addEventListener('click', () => document.body.removeChild(modalBg));

    modalImage.src = data?.imagePath;
    modalImage.alt = data?.name;

    modalTitle.textContent = data?.name;
    modalHeadline.textContent = data?.headline;
    modalText.textContent = data?.mainText;

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalHeadline);
    modalContent.appendChild(modalText);

    modalWrapper.appendChild(modalImage);
    modalWrapper.appendChild(modalContent);

    modal.appendChild(modalWrapper);
    modalBg.appendChild(modal);

    document.body.appendChild(modalBg);
}