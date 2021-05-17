const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');



window.addEventListener('load', () => {

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = document.querySelector(button.dataset.modalTarget);
    openModal(popup);
  })
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    console.log('clicked!!!!!', popup)
    closeModal(popup);
  })
});

overlay.addEventListener('click', ()=> {
  const popup = document.querySelectorAll('.popup.active');
  popup.forEach(popup => {
    closeModal(popup);
  })
})

function openModal(popup) {
  console.log('after!!!!!', popup)
  if (popup == null) return
  popup.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(popup) {
  if (popup == null) return
  popup.classList.remove('active');
  overlay.classList.remove('active');
}

});