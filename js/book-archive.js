const titleHead = document.getElementById('title-head');
// load book Archive from API
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    // clear data
    searchField.value = '';
    if (searchText == '') {
        const searchResult = document.getElementById('search-result');
        const bookFoundContainer = document.getElementById('book-found-container');
        bookFoundContainer.innerHTML = ``
        setTimeout(() => {
            searchResult.innerHTML = ``;
        }, 3000)
        searchResult.innerHTML =
            `
            <div class="error fs-5">No Result Exists! Please Search Again</div>
        `  ;
        return searchResult.innerHTML;
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        console.log(url)
        fetch(url).then((response) => response.json()).then(data => displayBooks(data.docs)).catch(err => displayError(err));
        loadSpinner('block');
        animateTyped();
    }
}

// error handling
const displayError = err => {
    const searchResult = document.getElementById('search-result');
    console.log(typeof err);
    searchResult.innerHTML = `<div class="error fs-5">Result Doesn't Exist!</div>`;
    setTimeout(() => {
        searchResult.innerText = ``;
    }, 3000)
}

// loading spinner and animation activation
const loadSpinner = (displayStyle) => {
    const spinnerCustom = document.getElementsByClassName('spinner-custom');
    for (let spinner of spinnerCustom) {
        spinner.style.display = displayStyle;
    }
}

const animateTyped = () => {
    const boogle = document.querySelector('#boogle');
    boogle.classList.add('typed');
}
const removeTyped = () => {
    const boogle = document.querySelector('#boogle');
    boogle.classList.remove('typed');
}

// display book name, author, publisher, year of publishing
const displayBooks = books => {
    if (books.length === 0) {
        displayError(books);
        loadSpinner('none');
        removeTyped();
    }
    else {
        loadSpinner('none');
        removeTyped();

        const searchResult = document.getElementById('search-result');
        searchResult.textContent = ''; // clear result while searching different things

        // total result found
        const bookFoundContainer = document.getElementById('book-found-container');
        bookFoundContainer.textContent = '';
        const totalResults = document.createElement('div');
        totalResults.innerHTML =
            `
            <div class="book-found bg-primary fs-5">${books.length ? books.length : totalResults.textContent = ''} Books Found</div>
            `

        bookFoundContainer.appendChild(totalResults);

        books.slice(0, 30).forEach(book => {
            const { cover_i, title, type, language, author_name, publisher, publish_year, subject, text, subject_key, ebook_count_i, edition_count } = book;

            titleHead.innerText = title;

            // search result
            const div = document.createElement('div');
            div.innerHTML =
                `
                <div class="col">
            <div onclick = "displayModalByName('${title}','${cover_i}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class= "card card-custom">
                <img src=" https://covers.openlibrary.org/b/id/${cover_i ? cover_i : 0}-M.jpg" class="card-img-top img-fluid" alt="Book images not available">

                <div class="card-body">
                    <h5 class="card-title fw-bold text-white">${title}</h5>
                    <p class="card-text">
                            <span class="fw-bold">Category:</span> ${type};
                            <span class="fw-bold">Language:</span> ${language ? language : 'Language not found'}<br>
                        <span class="fw-bold">Book Details:</span>
                        <ul>
                            <li>Author Name: ${author_name ? author_name.slice(0, 5).map(auth => auth) : 'Author not found'}</li>
                            <li>Book Publisher: ${publisher ? publisher.map(pub => pub) : 'Book Publisher not found'}</li>
                            <li>Publishing Year: ${publish_year ? publish_year.map(pub => pub) : 'Publishing year not found'}</li>
                        </ul>
                        <span class="fw-bold">Search Suggestion:</span>
                        <p class="text-justify">
                            ${subject ? subject : 'No suggestion found'}<br>
                        </p>
                            <span class="fw-bold">eBook Online</span>
                            <ul>
                                <li>eBook Count: ${ebook_count_i}</li>
                                <li>Edition Count: ${edition_count}</li>
                            </ul>
                            <br>
                            <ul>
                                <li>Text Key: ${text ? text.slice(0, 5).map(txt => txt) : 'No text key found'}</li >
                                <li>Subject Key: ${subject_key ? subject_key.slice(0, 5).map(sub => sub) : 'No subject key found'}</li>
                            <ul>
                        </div>
                    </div>
                </div >
                `
            searchResult.appendChild(div);
        });
    }

}

// modal - book details
const displayModalByName = (name, cover_i) => {
    console.log(name, cover_i);
    const modalContainer = document.querySelector('#modalBox');
    modalContainer.textContent = '';
    const infoContainer = document.createElement('div');
    infoContainer.innerHTML =
        `
    <div class="modal-content custom-modal shadow-lg">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Book Details</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body text-dark">
<img src=" https://covers.openlibrary.org/b/id/${cover_i ? cover_i : 0}-M.jpg" class="card-img-top img-fluid" alt="Book images not available">
            ${name ? 'Book Name: ' + name : 'Book Name does not Exist!'}
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
</div>
                    </div>
    
  `
    modalContainer.appendChild(infoContainer);
}
