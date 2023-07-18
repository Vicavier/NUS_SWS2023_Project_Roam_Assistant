<template>
  <div class="weather-card">
    <div class="city-name">
      <p class="text-center">{{destination}} Weather Report</p>
    </div>
    <ul class="days">
      <li>
        <div class="today">20 <span class="degree">&#8451;</span>					</div>
        <div class="icons sunny"></div>
      </li>
      <li>
        <span class="day-name">Tue</span>
        <div class="tempeture">9 <span class="degree">&#8451;</span>			</div>
        <div class="icons rainy"></div>
      </li>
      <li>
        <span class="day-name">Wed</span>
        <div class="tempeture">15 <span class="degree">&#8451;</span>				</div>
        <div class="icons cloudy"></div>
      </li>
      <li>
        <span class="day-name">Tue</span>
        <div class="tempeture">3 <span class="degree">&#8451;</span>				</div>
        <div class="icons snowy"></div>
      </li>
      <li>
        <span class="day-name">Fri</span>
        <div class="tempeture">18 <span class="degree">&#8451;</span>					</div>
        <div class="icons sunny"></div>
      </li>
    </ul>
  </div>
</template>
<script>

import {reactive} from "vue";
import axios from "axios";
import apis from "@/api-keys";

export default {
  setup(){
    const destination = localStorage.getItem('destination')

    let location = reactive({
      lat:'',
      lng:''
    })

    // geocoding()
    function geocoding() {
      axios({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?' + 'address=' + localStorage.getItem('destination') + '&key=' + apis.google_map,
      }).then(resp => {
        console.log(resp.data.results[0].geometry.location.lat)
        location.lat += resp.data.results[0].geometry.location.lat
        location.lng += resp.data.results[0].geometry.location.lng
        console.log(location)
        getWeather()
      })
    }

    function getWeather(){
      let url = 'https://api.openweathermap.org/data/2.5/forecast?cnt=6&lat='+location.lat+'&lon='+location.lng+'&appid='+apis.openWeather
      console.log(url)
      axios({
        method: 'GET',
        url: url,
      }).then(resp => {
        console.log(resp.data.list)
      })
    }
    return{
      destination,
      geocoding
    }
  }
}
</script>
<style scoped>

.weather-card{
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 2px 20px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin: 20px;
}

.city-name{
  font-size: .8em;
  color: #888;
  position: relative;
  display: block;
  text-align: left;
  margin: 10px 0 40px 20px;
}

.city-name:before{
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  height: 25px;
  width: 25px;
  background-position: center center;
  background-size: 25px;
  background-repeat: no-repeat;
  background-image: url(@/static/images/天气.png);
}

.days{
  list-style: none;
  margin-bottom: 10px;
}

.days li{
  margin-right: 30px;
  display: inline-block;
}

.days li:first-child{
  margin: 0 20px 0 20px;
}

.days li:last-child{
  margin-right: 25px;
}

.day-name{
  font-size: .9em;
  margin-bottom: 15px;
  color: #888;
  display: block;
}

.today{
  font-size: 4em;
  color: #888;
}

.today span.degree{
  font-size: 12px;
}

.tempeture{
  font-size: 1em;
  color: #888;
  margin-bottom: 15px;
}

.icons{
  height: 25px;
  width: 25px;
  background-position: center center;
  background-size: 25px;
  background-repeat: no-repeat;
}

.sunny {
  background-image: url(@/static/images/打雷-夜晚.png)}

.cloudy{
  background-image: url(@/static/images/太阳-多云-阴天.png)}

.rainy{
  background-image: url(@/static/images/下雨-夜晚.png)}

.snowy{
  background-image: url(@/static/images/下雪-夜晚.png)}
</style>