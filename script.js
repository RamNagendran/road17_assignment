
// Main function
(async function () {
    document.body.style.backgroundColor = "rgb(41 65 87)";
    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'container')
    const countryCardsElement = await createCards();
    mainDiv.appendChild(countryCardsElement);
    document.body.appendChild(mainDiv);
}())

// api for getting rest countries --------------------------------
async function getRestCountries() {
    try {
        const items = await fetch('https://restcountries.com/v3.1/all');
        return await items.json();
    } catch (err) {
        console.error(err);
    }
}

async function createCards() {
    try {
        // create row div ---------------------------------
        const countries = await getRestCountries();
        const rowDiv = document.createElement('div')
        rowDiv.setAttribute('class', 'row ')

        countries.forEach((items) => {

            // create col div ------------------------------
            const colDiv = document.createElement('div');
            colDiv.setAttribute('class', 'col-lg-4 col-sm-12');

            // create card div ------------------------------
            const cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'card');
            cardDiv.style.marginBottom = "25px"
            cardDiv.style.height = "400px";
            cardDiv.style.width = "380px";

            // card body div --------------------------------
            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.setAttribute('class', 'card-body');
            cardBodyDiv.style.background = "linear-gradient(332deg, #33323ce8, #f6e759b0)"
            cardBodyDiv.style.display = "flex";
            cardBodyDiv.style.flexDirection = "column";
            cardBodyDiv.style.alignItems = "center";
            cardBodyDiv.style.borderBottomRightRadius = "0.375rem"
            cardBodyDiv.style.borderBottomLeftRadius = "0.375rem"

            // card title ----------------------------------
            const cardTitle = document.createElement('div');
            cardTitle.innerHTML = items.name.official;
            cardTitle.style.height = "50px";
            cardTitle.style.backgroundColor = "#000"
            cardTitle.style.display = "flex";
            cardTitle.style.alignItems = "center";
            cardTitle.style.justifyContent = "center";
            cardTitle.style.color = "#fff";
            cardTitle.style.fontSize = "18px";
            cardTitle.style.fontWeight = 500;
            cardTitle.style.borderTopLeftRadius = "0.375rem"
            cardTitle.style.borderTopRightRadius = "0.375rem"
            cardBodyDiv.appendChild(cardTitle);

            // card flag image --------------------------------
            const flagImage = document.createElement('img');
            flagImage.src = items.flags.png;
            flagImage.setAttribute('alt', 'countries flag image')
            flagImage.setAttribute('height', '180px');
            flagImage.setAttribute('width', '100%');
            cardBodyDiv.appendChild(flagImage);

            // extra-details div --------------------------------
            const extraDetails = document.createElement('div');
            extraDetails.style.margin = "10px 0px"
            extraDetails.innerHTML = `
                <div style="color:#fff; display:flex; flex-direction:column; width:100%;" >
                    <div>
                        <span>Capital:</span>
                        <span>${items?.capital}</span>
                    </div>
                    <div>
                        <span>Region:</span>
                        <span>${items?.region}</span>
                    </div>
                    <div>
                        <span>Country Code:</span>
                        <span>${items?.cca2}</span>
                    </div>
                </div>
            `
            cardBodyDiv.appendChild(extraDetails)

            const weatherDetails = document.createElement('div')
            weatherDetails.style.display = 'none';
            weatherDetails.style.margin = "10px 0px";
            cardBodyDiv.appendChild(weatherDetails)

            // show weather button --------------------------------------
            const cardButton = document.createElement('button');
            cardButton.innerHTML = "Click for Weather";
            cardButton.style.backgroundColor = "transparent";
            cardButton.style.border = "1px solid #fff";
            cardButton.style.borderRadius = "8px";
            cardButton.style.color = "#fff";
            cardButton.style.height = "40px"
            cardButton.style.width = "50%"
            cardButton.addEventListener("click", async () => {
                extraDetails.style.display = "none";
                cardButton.style.display = "none";
                backButton.style.display = "block";
                const report = await weatherApi(items)
                weatherDetails.style.display = "block";
                weatherDetails.innerHTML = `
                    <div style="color:#fff; display:flex; flex-direction:column; width:100%;">
                        <div>
                            <span style="font-weight:600;">Main: </span>
                            <span>${report.weather[0]?.main}</span>
                        </div>
                        <div>
                            <span style="font-weight:600;">Description: </span>
                            <span>${report.weather[0]?.description}</span>
                        </div>
                        <div style="font-weight:600; margin-top:10px;"><u>Wind Details </u></div>
                        <div>
                            <span>Speed: “${report.wind.speed}“, </span>
                            <span>gust: “${report.wind.gust}“, </span>  
                            <span>Deg: “${report.wind.deg}“.</span>
                        </div>
                    </div>
                `
            })
            // back button --------------------------------------
            const backButton = document.createElement('button');
            backButton.innerHTML = "Go back";
            backButton.style.backgroundColor = "transparent";
            backButton.style.border = "1px solid #fff";
            backButton.style.borderRadius = "8px";
            backButton.style.color = "#fff";
            backButton.style.height = "40px"
            backButton.style.width = "50%"
            backButton.style.display = "none";
            backButton.addEventListener("click", async () => {
                extraDetails.style.display = "block";
                weatherDetails.style.display = "none";
                cardButton.style.display = "block";
                backButton.style.display = "none";
            })
            cardBodyDiv.appendChild(cardButton);
            cardBodyDiv.appendChild(backButton);

            // appends on col and row div -------------------------
            cardDiv.appendChild(cardTitle);
            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);
            rowDiv.appendChild(colDiv);
        })
        return rowDiv;
    } catch (e) {
        console.log(e);
    }
}

// weather api details ----------------------------------------------------------------
async function weatherApi(selCountry) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selCountry.latlng[0]}&lon=${selCountry.latlng[1]}&appid=${"7f05893b4ca0293c43500b285ce9f552"}`)
        return await res.json()
    } catch (e) {
        console.error("weather api error -->", e)
    }
}



