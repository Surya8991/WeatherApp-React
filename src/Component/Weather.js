import React, { useState } from 'react'

function Weather() {
    const [city, setCity] = useState("")
    const [result, setResult] = useState('No Results to Display')
    const handleClick = async (e) => {
        e.preventDefault();
        if (!city || city.length<3) {
            setResult('Enter a Valid city to provide results');
            return;
        }
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '312010d414msh8545db27298176dp13e396jsn219e580e2c10',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        try {
            let result = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options);
            let data = await result.json();
            const {
                temp_c,
                temp_f,
                condition: { text: conditionText },
                humidity,
                wind_kph,
            } = data.current;
            setResult(`The temperature in ${city} is ${temp_c} C or ${temp_f}F. Condition: ${conditionText}. Humidity: ${humidity}%. Wind: ${wind_kph} km/h.`);
            setCity('')
        } catch (error) {
            setResult("Enter a Valid Location");
            setCity('')
        }
    }

    return (
        <>
            <div className='container my-3'>
                <form>
                    <h1 className='text-center'>Weather App</h1>
                    <div className="mb-3">
                        <label htmlFor="inputCity" className="form-label">City Name</label>
                        <input type="text" className="form-control" name='inputCity' value={city} id="inputCity" onChange={(e) => { setCity(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
                <div className='container my-3'>
                    <h3>Result</h3>
                    <p>{result}</p>
                </div>
            </div>
        </>
    )

}

export default Weather