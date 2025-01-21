const gridContainer = document.getElementById('grid_container');
const productsToDisplayElement = document.getElementById('productsCount');
let displayCount = productsToDisplayElement.value;

// when api doesnt have more data to fetch set it to false;
let moreData = true;
let pageNumber = 1;
let apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${displayCount}`

//update displayCount and apiUrl
function changeDisplayCount() {
    displayCount = productsToDisplayElement.value;
    pageNumber = 1;
    const updatedApiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${displayCount}`;
    fetchData(updatedApiUrl, true)
}

// updates elements to display on website
productsToDisplayElement.addEventListener('change', changeDisplayCount);


async function fetchData(apiUrl, clearContainerBool) {

    try {

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        //clear container because displayCount changed
        if (clearContainerBool) {
            populateGridContainer(data.data, gridContainer, clearContainerBool);
        }
        //append Data to container
        else {
            populateGridContainer(data.data, gridContainer);
        }

    }

    catch (error) {
        console.error("Error fetching data:", error);
        return;
    }

}


function populateGridContainer(jsonData, dataContainer, clearContainerBool) {

    //clean container because numberOfProducts to display changed
    if (clearContainerBool) {
        dataContainer.replaceChildren(); // clear container 

        jsonData.forEach(product => {
            insertProductIntoGrid(dataContainer, product);
        });

        //adds onClick to product that opens modal
        addEventListenersToProducts();
    }
    else {
        jsonData.forEach(product => {
            insertProductIntoGrid(dataContainer, product);
        });

        //adds onClick to product that opens modal
        addEventListenersToProducts();
    }

}

function insertProductIntoGrid(gridContainer, productData) {

    const productDiv = document.createElement('div');
   
    productDiv.classList.add('product_from_api');
    productDiv.setAttribute('data-api-Name', productData.id);
    productDiv.setAttribute('data-api-Value', productData.text);
    productDiv.setAttribute('data-api-Id', productData.id);

    // Create the inner div for the product ID
    const idDiv = document.createElement('div');
    idDiv.classList.add('api_product_id');
    idDiv.textContent = productData.id; // Set the content to match the dataset ID

    // Append the inner div to the main product div
    productDiv.appendChild(idDiv);

    gridContainer.appendChild(productDiv);
}


// Function to add event listeners dynamically
function addEventListenersToProducts() {
    
    const products = document.querySelectorAll('.product_from_api');
    products.forEach(product => {
        product.addEventListener('click', function () {
            // function from modal.js
            openModal(product);
        });
    });
    
}




fetchData(apiUrl, false);


