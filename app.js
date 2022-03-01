const searchPhone = () => {
    document.getElementById('search-result').innerHTML = ""
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;


    //clear input field
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data.data)
            if (data.status === false) {

                const searchResult = document.getElementById('search-result')
                const div = document.createElement('div');
                div.innerHTML = `<h2 class="m-4 text-center text-danger">No Phone Found</h2>`
                searchResult.appendChild(div)

            }
            else {
                displaySearchResult(data.data.slice(0, 20))


            }
        })
}

const displaySearchResult = datas => {
    const searchResult = document.getElementById('search-result')
    for (const data of datas) {
        // console.log(data)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${data.image}" class="card-img-top w-50 m-5" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <h6 class="card-text">Brand: ${data.brand}</h6>
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
        .then(data => {
            console.log(data.data)
            displayPhoneDetails(data.data)
        })
}

const displayPhoneDetails = phone => {

    const { chipSet, displaySize, memory } = phone.mainFeatures;

    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
   
    <div class="card-body text-center h">
        <img src="${phone.image}" class="card-img-top w-25 m-5" alt="...">
            <h4 class="card-title">${phone.name}</h4>
            <h5>${phone.releaseDate ? `Release Date: ${phone.releaseDate}` : 'No release date found'}</h5>
            <h6 class="card-text">Brand: ${phone.brand}</6>
        <div>
            <h4>MainFeatures:</h4>
            <p>ChipSet: ${chipSet}</p>
            <p>DisplaySize: ${displaySize}</p>
            <p>Memory: ${memory}</p>
        </div>

        <div> 
            <h4>Others:</h4>
             ${phone.others ? `GPS: ${phone.others.GPS}, Bluetooth: ${phone.others.Bluetooth}, NFC: ${phone.others.NFC}` : 'There is no others property in this phone'}
        </div>
        <div>
            <h4>Sensors:</h4> 
            ${phone.mainFeatures.sensors.map((sensor) => sensor)}
        </div >
    </div >
    `
    phoneDetails.appendChild(div)

}