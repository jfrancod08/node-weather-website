console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent =  'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const location = search.value
    // console.log(location)

        fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Error: ' + data.error
                // console.log(data.error)
            } else {            
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Forecast: ' + data.forecast
            // console.log('Location: ' + data.location)
            // console.log('Forecast: ' + data.forecast)
            }
        })

    })

})