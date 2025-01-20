
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('modal-close-button');
//

function openModal(id, name, value) {
   modal.showModal();
}

function closeModal() {
    modal.close();
}


//closes modal
closeModalButton.addEventListener('click', closeModal);