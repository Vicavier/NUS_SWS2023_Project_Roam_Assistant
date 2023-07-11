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
</template>

<script>
import {VueDraggableNext} from 'vue-draggable-next'

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

export default {
  components: {
    draggable: VueDraggableNext
  },
  setup(){
    function onMove({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }

    return {
      onMove
    }
  },
  data() {
    return {
      list: message.map((name, index) => {
        return {name, order: index + 1, fixed: false};
      }),
      editable: true,
      isDragging: false,
      delayedDragging: false
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
</style>