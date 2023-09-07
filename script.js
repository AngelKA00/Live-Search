const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate the list with all items
async function populateList() {
    const data = await fetchData();
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.title;
        resultsList.appendChild(listItem);
        listItem.textContent = item.url;
        resultsList.appendChild(listItem);
    });
}

// Function to filter and display search results
function filterResults() {
    const searchTerm = searchInput.value.toLowerCase();
    const listItems = resultsList.getElementsByTagName('li');

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}

// Event listener for input changes (live search)
searchInput.addEventListener('input', filterResults);

// Populate the list with all items initially
populateList();