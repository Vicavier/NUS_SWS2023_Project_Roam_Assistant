<template>
  <div class="one-day-plan">
    <draggable class="list-group" tag="ul" v-model="daily_plan_list" v-bind="dragOptions" :move="onMove"
               @start="isDragging=true" @end="isDragging=false">
      <transition-group type="transition" :name="'flip-list'">
        <div
            class="list-group-item"
            v-for="element in daily_plan_list" :key="element.order">
          <div class="width-85 box-center">
            <h3 class="font-belanosima margin-tb-10px">{{ element.time }}</h3>
            <p class="text-small text-left">{{ element.event }}</p>
            <a class="text-small" :href="element.link" target="_blank">{{element.link}}</a>
            <img :src="element.picture" class="width-80"/>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import {VueDraggableNext} from "vue-draggable-next";

export default {
  props: {
    formalized_plan: Object,
    editable: Boolean
  },
  components: {
    draggable: VueDraggableNext
  },
  data() {
    return {
      child_editable: this.editable,
      isDragging: false,
      delayedDragging: false,
      daily_plan_list: []
    };
  },
  mounted() {
    let keys = Object.keys(this.formalized_plan)
    for (let i = 0; i < keys.length; i++) {
      this.daily_plan_list.push({
        order: i,
        time: keys[i],
        event: this.formalized_plan[keys[i]].text,
        link: this.formalized_plan[keys[i]].link,
        picture: this.formalized_plan[keys[i]].picture,
      })
    }
    console.log(this.daily_plan_list)
  },
  methods: {
    onMove({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
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
}
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
  width: 80%;
  background-color: white;
  text-align: center;
  border-radius: 20px;
  font-size:16px;
  line-height:23px;
  margin: 10px auto;
  color: black;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.one-day-plan{
  background-color: rgb(151, 190, 243);
  width: 80%;
  padding: 5px 0;
  margin: 50px auto;
}
</style>