<template>
  <div class="container">
    <div class="content">
      <div class="checkbox">
        <input type="checkbox" v-model="editable">Enable drag and drop
      </div>
      <div>
        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" :move="onMove"
                   @start="isDragging=true" @end="isDragging=false">
          <transition-group type="transition" :name="'flip-list'">
            <div class="list-group-item height-40px bg-wight margin-tb-5px text-center border-radius-20px text-medium color-black" v-for="element in list" :key="element.order">
              {{ element.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
  <div id="splash">
    <div class="anim">
      <div id="loader">
        <svg version="1.1" width="60px" height="70px" viewBox="0 0 60 70">
          <defs>
            <filter id="f1" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          <g id="airplane">
            <path fill="#000" d="M0.677,20.977l4.355,1.631c0.281,0.104,0.579,0.162,0.88,0.16l9.76-0.004L30.46,41.58c0.27,0.34,0.679,0.545,1.112,0.541
          h1.87c0.992,0,1.676-0.992,1.322-1.918l-6.643-17.439l6.914,0.002l6.038,6.037c0.265,0.266,0.624,0.412,0.999,0.418l1.013-0.004
          c1.004-0.002,1.684-1.012,1.312-1.938l-2.911-7.277l2.912-7.278c0.372-0.928-0.313-1.941-1.313-1.938h1.017
          c-0.375,0-0.732,0.15-0.996,0.414l-6.039,6.039h-6.915l6.646-17.443c0.354-0.926-0.33-1.916-1.321-1.914l-1.87-0.004
          c-0.439,0.004-0.843,0.203-1.112,0.543L15.677,17.24l-9.765-0.002c-0.3,0.002-0.597,0.055-0.879,0.16L0.678,19.03
          C-0.225,19.36-0.228,20.637,0.677,20.977z" transform="translate(44,0) rotate(90 0 0)" />
          </g>
          <g id="shadow" transform="scale(.9)">
            <path fill="#000" fill-opacity="0.3" d="M0.677,20.977l4.355,1.631c0.281,0.104,0.579,0.162,0.88,0.16l9.76-0.004L30.46,41.58c0.27,0.34,0.679,0.545,1.112,0.541
      		h1.87c0.992,0,1.676-0.992,1.322-1.918l-6.643-17.439l6.914,0.002l6.038,6.037c0.265,0.266,0.624,0.412,0.999,0.418l1.013-0.004
      		c1.004-0.002,1.684-1.012,1.312-1.938l-2.911-7.277l2.912-7.278c0.372-0.928-0.313-1.941-1.313-1.938h1.017
      		c-0.375,0-0.732,0.15-0.996,0.414l-6.039,6.039h-6.915l6.646-17.443c0.354-0.926-0.33-1.916-1.321-1.914l-1.87-0.004
      		c-0.439,0.004-0.843,0.203-1.112,0.543L15.677,17.24l-9.765-0.002c-0.3,0.002-0.597,0.055-0.879,0.16L0.678,19.03
      		C-0.225,19.36-0.228,20.637,0.677,20.977z" transform="translate(64,30) rotate(90 0 0)" filter="url(#f1)" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {VueDraggableNext} from 'vue-draggable-next'
import {ref} from "vue";
import {processData} from "@/hooks/processData";

let message = [];

export default {
  components: {
    draggable: VueDraggableNext
  },
  setup(){
    let editable = ref(true)
    let isDragging = ref(false)
    let delayedDragging = ref(false)
    let plan_from_backEnd = ref("{\n" +
        "    \"Transportation\": {\n" +
        "        \"Flight\": \"You can book flight ticket from Shanghai to Singapore in here [https://www.kayak.sg/flights/SHA-SIN/2023-08-11/2023-08-18?sort=bestflight_a]\",\n" +
        "        \"Train\": \"No train from Shanghai to Singapore.\"\n" +
        "    },\n" +
        "    \"TravelPlan\": [\n" +
        "        {\n" +
        "            \"index\": 0,\n" +
        "            \"Morning\": \"Start your day with a visit to the iconic Merlion Park, where you can see the famous Merlion statue, a mythical creature with the head of a lion and the body of a fish. Enjoy panoramic views of the city skyline and Marina Bay from this picturesque location.\",\n" +
        "            \"Lunch Recommendation\": \"You can have lunch in 'Jypsy at One Fullerton [https://www.pscafe.com/jypsy-one-fullerton] near Merlion Park\",\n" +
        "            \"Afternoon\": \"Head to the Supertree Grove at Gardens by the Bay, a futuristic park with towering tree-like structures. Explore the various gardens and attractions, such as the Flower Dome and Cloud Forest, and admire the stunning views of the city from the OCBC Skyway.\",\n" +
        "            \"Dinner Recommendation\": \"You can have dinner at 'Marina Bay BBQ Steamboat Buffet' [https://www.facebook.com/marinabaysteamboat/] inside Garden by the Bay\",\n" +
        "            \"Evening\": \"Take a leisurely stroll along the Singapore River and enjoy the vibrant atmosphere of Clarke Quay. Indulge in a delicious dinner at one of the riverside restaurants and take a river cruise to see the cityscape illuminated at night.\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"Bedtime\": \"You can find amazing hotels here [https://www.kayak.sg/hotels/Singapore/2023-07-12/2023-07-16?sort=rank_a]\"\n" +
        "        }\n" +
        "    ],\n" +
        "    \"Additional Information\": {\n" +
        "        \"Emergency Number\": \"The emergency number in Singapore is 995. This number should be dialed in case of a medical emergency or when an ambulance is needed. When you call 995, you will be connected to the Singapore Civil Defence Force (SCDF) Emergency Medical Services, and they will dispatch an ambulance to your location.\",\n" +
        "        \"Police Number\": \"For other emergencies such as police assistance or fire-related emergencies, you can dial 999\",\n" +
        "        \"Weather Condition\": \"summer in Singapore is characterized by occasional rain showers and thunderstorms. These rain showers can be heavy and brief, providing temporary relief from the heat. It's advisable to carry an umbrella or raincoat when exploring the city during the summer season.\"\n" +
        "    }\n" +
        "}")
    processData(message,plan_from_backEnd.value)

    function onMove({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }


    return {
      onMove,
      editable,
      isDragging,
      delayedDragging
    }
  },
  data() {
    return {
      list: message.map((name, index) => {
        return {name, order: index + 1, fixed: false};
      }),
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style scoped>
@import "@/static/css/basic.css";

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
}


.list-group-item,.list-group-item i  {
  cursor: move;
}
.content{
  width: 80%;
  background-color: rgba(255,255,255,0.5);
}

#splash {
  background: #56CCF2; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-repeat: repeat-y;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  animation: splash 3s ease-in;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
}

#loader {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%,0);
}

#loader:after {
  content: '';
  position: absolute;
  left: 50%;
  margin-left: -8px;
  bottom: -170px;
  width: 3px;
  background: #fff;
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
  height: 200px;
}

#loader:before {
  content: '';
  position: absolute;
  left: 50%;
  margin-left: 8px;
  bottom: -190px;
  width: 3px;
  background: #000;
  background: linear-gradient(to bottom, rgba(0,0,0,.2) 0%, rgba(0,0,0,.2) 50%, rgba(0,0,0,0) 100%);
  height: 200px;
}

#splash .anim {
  height: 100%;
  position: absolute;
  left: 50%;
  width: 100px;
  transform: translate(-50%,100%);
  animation: loader 4s linear;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
}

@keyframes loader {
  0% {
    transform: translate(-50%,110%);
  }
  30% {
    transform: translate(-50%,50%);
  }
  100% {
    transform: translate(-50%,0%);
  }
}

@keyframes splash {
  0% {
    transform: translate(0%,0%);
  }
  50% {
    transform: translate(0%,0%);
  }
  100% {
    transform: translate(0%,-100%);
  }
}
</style>