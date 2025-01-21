
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('modal-close-button');

const modalNameValue = document.getElementById('modal-name');
const modalValue = document.getElementById('modal-value');
const modalID = document.getElementById('modal-id')


function openModal(element) {
    modal.showModal();

    modalNameValue.innerText = element.dataset.apiName ?? 'Value was not set';
    modalValue.innerText = element.dataset.apiValue ?? 'Value was not set';
    modalID.innerText = element.dataset.apiId ? `ID: ${element.dataset.apiId}` : 'Id not set';

}

function closeModal() {
    modal.close();
}


//closes modal
closeModalButton.addEventListener('click', closeModal);

