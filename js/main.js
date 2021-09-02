
// global scope variable
const searchResult = document.getElementById("search-result");
const bookShow = document.getElementById("book-show");

// search book name
const searchBook = async () => {
    searchResult.innerHTML = `
    <div class="h-100 w-100 d-flex justify-content-center align align-items-center">
        <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // error handling validation
    if (searchText === '') {
        searchResult.innerHTML = `<h5 class="w-50 mx-auto text-center text-danger bg-white p-2 rounded">Please! Valid book Name Of Search</h5>`;
        bookShow.innerHTML = '';
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        searchField.value = "";
        bookShow.innerHTML = '';
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data);
    }
}

// display search result books
const displaySearchResult = books => {
    const totalResult = books.numFound;
    books = books.docs;
    const arr = books.filter(favourite => favourite.cover_i !== undefined && favourite.author_name !== undefined && favourite.publisher !== undefined && favourite.title !== undefined && favourite.first_publish_year !== undefined);
    // error handling validation
    if (arr.length === 0) {
        bookShow.innerHTML = "";
        searchResult.innerHTML = `<h5 class="w-25 mx-auto text-center text-danger bg-white p-2 rounded">No Result Found!</h5>`;
    }

    else {
        const p = document.createElement("p");
        // book show total result of book quantity
        p.innerHTML = `<h5 class="w-25 mx-auto text-center bg-white p-2 rounded text-primary">Total: ${totalResult} You got ${arr.length} books</h5>`;
        bookShow.innerHTML = '';
        bookShow.appendChild(p);
        searchResult.innerHTML = '';
        //  foreach of array book
        arr.forEach(book => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div class="card card-all">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-card" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title.slice(0, 20)}</h3>
                    <h4 class="author">${book.author_name[0]}</h4>
                    <h5 class="publisher text-muted">${book.publisher[0].slice(0, 20)}</h5>
                    <p class="year">First Publish Year: ${book.first_publish_year}</p>
                </div >
            </div >
    `;
            searchResult.appendChild(div);
        })
    }
}