<template>
  <div class="container">
    <div class="wrapper">
      <div class="grid">
        <div class="item">
          <h1 class="font-belanosima title-extra-large color-apple-wight text-center">Roam Assistant</h1>
          <h5 class="font-belanosima text-large color-apple-wight font-weight-300 text-center">Your personal AI travel
            planner</h5>
          <div class="width-300px height-50px bg-wight box-center display-table border-radius-25px">
            <input class="display-table-cell vertical-center text-medium font-belanosima margin-left-20px" placeholder="Where to go..." type="text"
                   style="background:none;outline:none;border:none;"/>
            <div id="submit" class="height-40px width-60px bg-blue border-radius-20px display-table-cell" @click="submit"><i class="icon-arrow-thick-right color-black vertical-center text-extra-large margin-left-10px"></i></div>
          </div>
        </div>
        <div class="item">
          <div class="globe-total-container">
            <div id="globe-container"></div>
            <div id="globe-shadow"></div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="hidden" id="vertexShader">
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main(){
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }
  </div>

  <div class="hidden" id="fragmentShader">
    uniform sampler2D globeTexture;
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main(){
    float intensity = 1.05 - dot(vertexNormal, vec3(0,0,1));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
    }
  </div>

  <div class="hidden" id="atmosphereVertexShader">
    varying vec3 vertexNormal;

    void main(){
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9);
    }
  </div>

  <div class="hidden" id="atmosphereFragmentShader">
    varying vec3 vertexNormal;

    void main(){
    float intensity = pow(0.6 - dot(vertexNormal, vec3(0,0,1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
    }
  </div>
</template>


<script>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {showEarth} from "@/hooks/earth";

export default {
  setup() {
    let info = reactive({
      user_name: "",
      user_passwd: ""
    })
    let tourPlan = reactive({
      place: "",
      start_time: "",
      end_time: ""
    })

    function submit() {
      axios({
        method: 'POST',
        url: 'http://localhost:9090/user/weather',
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(info)
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data)
          alert("登录成功!")
        } else
          alert("登录失败!")
      })

    }

    onMounted(() => {
      showEarth();
    })
    return {
      tourPlan,
      submit,
    }
  }
}
</script>
<style scoped>
@import "@/static/css/basic.css";

#globe-container {
  margin: 0 auto;
  width: fit-content;
}

#globe-shadow {
  width: 200px;
  height: 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.019);
  margin: 0 auto;
}

.container {
  background: #56CCF2; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.hidden {
  display: none;
}

.grid {
  display: flex;
  align-items: center;
}

.item {
  flex: 0 0 50%;
}


.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

#submit:hover{
  cursor: pointer;
  background-color: rgb(77,136,231);
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
}
#submit:hover i{
  margin-left: 40px;
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
}
</style>