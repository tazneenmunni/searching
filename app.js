const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)

    //clear input field
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = datas => {
    const searchResult = document.getElementById('search-result')
    for (const data of datas) {
        console.log(data)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${data.image}" class="card-img-top w-50 m-5" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">${data.brand}</p>
                <button onclick="loadPhoneDetails('${data.slug}')" class="btn btn-outline-dark">Details</button>
            </div>
        </div>
        `
        searchResult.appendChild(div)

    }
}

const loadPhoneDetails = phoneID => {
    // console.log(phoneID)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {

    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 m-5" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <a href="#" class="btn btn-primary">Show More</a>
        </div>
    `
    phoneDetails.appendChild(div)

}