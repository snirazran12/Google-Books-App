const booksList = document.getElementById('booksList');
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const apiKey = 'AIzaSyAHtZNkp1041bzgwpk-t42YYAtnNrG1PNw';
let googleBooks = [];

searchButton.addEventListener('click', () => {
    const searchString = searchBar.value?.toLowerCase();
    if(searchString){
        loadBooks(searchString);
    }
})

const loadBooks = async (searchString) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=${apiKey}`);
        let jsonRespone = await res.json();
        googleBooks = jsonRespone.items;
        displayBooks(googleBooks);
    } catch (err) {
        console.error(err);
    }
};

const displayBooks = (books) => {
    let description;
    
    const htmlString = books
        .map((book) => {
        description = book.volumeInfo?.description;
        if(!description) {
            description = 'No desription for this book.'
        }
        return `
        <li class="book">
            <h2>${book.volumeInfo?.title}</h2>
            <p>${description}</p>
            <img src=${book.volumeInfo?.imageLinks?.thumbnail} alt=" No image"></img>
        </li>
        `;
        })
        .join('');
        booksList.innerHTML = htmlString;
};
