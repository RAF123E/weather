let apiKey = '7d77b96c972b4d119a3151101212704';
async function search(city) {
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
    try {
        let result = await fetch(apiUrl);
        if (!result.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await result.json();
        console.log(data);
        let forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = '';
        data.forecast.forecastday.forEach(day => {
            const date = new Date(day.date);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const maxTemp = day.day.maxtemp_c;
            const minTemp = day.day.mintemp_c;
            const condition = day.day.condition.text;
            const icon = day.day.condition.icon;
            
            const forecastCard = `
                <div class="col-md-4 text-center">
                    <div class="card mb-4 shadow-sm bg-dark text-white">
                    <div class="card-header">
                            <h4>${city}</h4>
                        </div>
                    <div class="date">${dayOfWeek}</div>
                        <img src="https:${icon}" alt="${condition}" class="card-img-top w-25">
                        <div class="card-body">
                            <h3 class="card-text">Max Temp: ${maxTemp}°C</h3>
                            <h3 class="card-text">Min Temp: ${minTemp}°C</h3>
                                  
                            <p class="card-text text-info">${condition}</p>
                        </div>
                    </div>
                </div>
            `
            ;

           
            forecastElement.innerHTML += forecastCard;
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


function handleFormSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search').value;
    search(searchInput);
}


document.getElementById('submit').addEventListener('click', handleFormSubmit);

search("cairo");

