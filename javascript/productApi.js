const gridContainer = document.getElementById('grid_container');
const productsToDisplayElement = document.getElementById('productsCount');
let displayCount = productsToDisplayElement.value;

const loaderDiv = document.getElementById('loaderDiv');

// when api doesnt have more data to fetch set it to false;
let moreDataToFetch = true;
let dataIsLoading = false;
let pageNumber = 1;
let apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${displayCount}`

//update displayCount and apiUrl
function changeDisplayCount() {
    displayCount = productsToDisplayElement.value;
    pageNumber = 1;
    moreDataToFetch = true;
    const updatedApiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${displayCount}`;
    fetchData(updatedApiUrl, true)
}

// updates elements to display on website
productsToDisplayElement.addEventListener('change', changeDisplayCount);


async function fetchData(apiUrl, clearContainerBool) {

    try 
    {
        if(dataIsLoading === false && moreDataToFetch === true)
        {

            dataIsLoading = true;
            displayLoadingAnimation();
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            
            if(data.currentPage === data.totalPages){
                moreDataToFetch = false;
            }
    
            //clear container because displayCount changed
            if (clearContainerBool) 
            {
                populateGridContainer(data.data, gridContainer, true);
            }
            //append Data to container
            else
            {
                populateGridContainer(data.data, gridContainer, false);
            }

        }
      
    }

    catch (error) {
        console.error("Error fetching data:", error);
        return;
    }

    finally 
    {
        dataIsLoading = false;
        removeLoadingAnimation();
        pageNumber += 1;
    }

}


function populateGridContainer(jsonData, dataContainer, clearContainerBool) {

    //clear container because numberOfProducts to display changed
    if (clearContainerBool) {
        dataContainer.replaceChildren(); // clear container 

        jsonData.forEach(product => {
            insertProductIntoGrid(dataContainer, product);
        });

        //adds onClick to products that opens modal
        addEventListenersToProducts();
    }
    else 
    {
        jsonData.forEach(product => {
            insertProductIntoGrid(dataContainer, product);
        });

        //adds onClick to products that opens modal
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


document.addEventListener('scroll', () => {

    const rect = gridContainer.getBoundingClientRect(); // Get the container's position relative to the viewport
    const windowHeight = window.innerHeight; // Visible part of the viewport

    // Check if the bottom of the container is visible
    if (rect.bottom <= windowHeight && !dataIsLoading) { 
        apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${displayCount}`;
        fetchData(apiUrl, false);
    }
});



function displayLoadingAnimation(){
    loaderDiv.classList.add('active');
}

function removeLoadingAnimation(){
    loaderDiv.classList.remove('active');
}