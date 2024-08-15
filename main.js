let btn = document.getElementById('get_data')

btn.addEventListener('click', function (event) {
  event.preventDefault()
  const tag = document.getElementById('location')
  const data = tag.value
  
  craw(data)

})

async function craw(location) {

  const API_Key = '993e2f3c8044ed3f8a149993504ae427';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_Key}&units=metric`

  try {

    const response = await fetch(url);
    const data = await response.json();

    const tranform = document.getElementById('content')
    const image = document.getElementById('weather_img')
    const ele_temp = document.getElementById('temperature')
    const ele_hum = document.getElementById('humidity')
    const ele_wind = document.getElementById('wind')
    const ele_main = document.getElementById('main-weather')
    const ele_sym = document.getElementById('symbol')
    const stt = document.getElementById('infor')
    document.getElementById('main_infor').classList.remove('d-none')

    
    tranform.classList.remove('expand')
    image.classList.remove('show')
    stt.classList.remove('show')

    ele_main.classList.remove('show')
    ele_temp.classList.remove('show')
    ele_sym.classList.remove('show')

    await new Promise(resolve => setTimeout(resolve, 500));

    


    if (data.cod === 200) {
      
      const icon = data.weather[0].icon
      const img = `http://openweathermap.org/img/wn/${icon}@2x.png`
      const temp = Math.round(data.main.temp) 
      const hum = data.main.humidity
      const wind = data.wind.speed
      const main = data.weather[0].main

      
      tranform.classList.add('expand')

      image.src = img
      image.style.width = '200px'
      ele_temp.innerHTML = temp
      ele_main.innerHTML = main
      ele_hum.innerHTML = hum + '%'
      ele_wind.innerHTML = wind + ' km/h'
      ele_sym.innerHTML = '<sup>°</sup>C'
      stt.classList.remove('d-none')

     
    }

    else {

      tranform.classList.add('expand')
      

      image.src = '/img/pageNotFound.jpg'
      image.style.width = ''
      ele_temp.innerHTML = ''
      ele_main.innerHTML = ''
      ele_hum.innerHTML = ''
      ele_wind.innerHTML = ''
      ele_sym.innerHTML = ''
      stt.classList.add('d-none')

      
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    image.classList.add('show')
    ele_main.classList.add('show')
    ele_temp.classList.add('show')
    ele_sym.classList.add('show')
    stt.classList.add('show')

  } catch (error) {

    console.error('Error: ', error)

  }

}