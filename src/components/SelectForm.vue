<script lang="ts" setup>
import { ref, watch } from 'vue';
import {Check} from '@element-plus/icons-vue';
import type Point from '../interfaces/Point';
import type Path from '../interfaces/Path';

const imageUrl = ref<string | null>(null);
const imageName = ref('');
const imageDimensions = ref({height: 0, width: 0});

const active = ref(0);

const paths = ref<Path[]>([{name: `Path_${active.value}`, points: [{x: 100, y: 100 }]}]);

const pathNameInput = ref(paths.value[active.value].name);


const draggingPath = ref<number | null>(null);
const draggingPoint = ref<number | null>(null);
const offset = ref({x: 0, y: 0});
const visible = ref(false);

const setVisible = (newValue: boolean) => visible.value = newValue;

window.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event: any) {
  if (event.key === 'Delete') {
    paths.value[active.value].points.pop();
  }   
}

function saveName(){
  const pathName = pathNameInput.value.toString();
  try {
    if (!(/^[a-zA-Z_]\w*$/.test(pathName))) throw 'Invalid property name!';
    if (paths.value.findIndex((el,index) => el.name == pathName && index !== active.value) > -1) throw 'Path name already exists!'
    paths.value[active.value].name = pathName;
  } catch (error) {
    alert(error);
  }
}

function handleImageChange(event: Event){
  const inputImage = (event.target as HTMLInputElement).files?.[0];

  if (inputImage) {
    imageUrl.value = URL.createObjectURL(inputImage);
    imageName.value = inputImage.name;
    const imgElement = new Image();
    imgElement.src = imageUrl.value;

    imgElement.onload = () => {
      imageDimensions.value = {
        width: imgElement.width,
        height: imgElement.height,
      };
    };

  }

};


function handleClick(event: any) {
  var x = event.clientX - event.target.getBoundingClientRect().left;
  var y = event.clientY - event.target.getBoundingClientRect().top;


  if (event.ctrlKey) {
    let newKey: number = paths.value.length;
    let point: Point = {x: x, y: y };
    let path: Path = {name: `Path_${newKey}`, points: [point]}
    paths.value.push(path);
    active.value = newKey;
    
  } else {
    let point: Point = {x: x, y: y };
    paths.value[active.value].points.push(point);
  }
}

function toString(path: Point[]){
  let pathString: string = "";
  path.forEach((el,index) => {
    if (index == 0) {
      pathString+= `M${el.x},${el.y}`;
    }
    else {
      pathString+= ` L${el.x},${el.y}`;
    }
  });
  return pathString;
}



function handlePathClick(index: number){
  setVisible(true);
  active.value = index;
}


function handleDrag(pathIndex: number, pointIndex: number, event: any){
  draggingPath.value = pathIndex;
  draggingPoint.value = pointIndex
  offset.value = {
      x: event.clientX - paths.value[pathIndex].points[pointIndex].x,
      y: event.clientY- paths.value[pathIndex].points[pointIndex].y,
  };
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
}

function drag(event: any) {
  const x = event.clientX - offset.value.x;
  const y = event.clientY - offset.value.y;
  paths.value[draggingPath.value!].points[draggingPoint.value!].x = x;
  paths.value[draggingPath.value!].points[draggingPoint.value!].y = y;

}

function stopDrag() {
  draggingPath.value = null;
  draggingPoint.value = null;
  offset.value = {x: 0, y: 0}
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
}


</script>

<template>
    <div class="container d-flex flex-column mt-5 align-items-center">
        <label for="image-input" class="image-input-label text-white py-2 px-3 rounded h5">Select image</label>
        <input type="file" id="image-input" accept="image/jpeg, image/jpg, image/png, image/svg" class="d-none" @change="handleImageChange" />
        <svg v-if="imageUrl" class="image-wrapper" :style="{ 
            background: 'url(' + imageUrl + ')',
            'background-repeat': 'no-repeat',
            width: imageDimensions.width + 'px', 
            height: imageDimensions.height + 'px'
          }" 
          @click.self="handleClick"
        >
    
        <g v-for="(path, index) in paths" :key="index">
          <path :d="toString(path.points)" stroke="black" fill="transparent" @click="handlePathClick(index)" class="pointable"/>
          <NamePopover :visible="visible" :setVisible="setVisible"/>
          <circle v-for="(point, i) in path.points" :key="i"
            :cx="point.x.valueOf()" 
            :cy="point.y.valueOf()" 
            stroke="black"
            opacity="0.5"
            :fill="index == active ? 'white' : 'black'"
            r="5"
            class="pointable"
            @click="handlePathClick(index)"
            @mousedown="handleDrag(index, i, $event)"
            />
        </g> 
        </svg>
        <div v-if="imageUrl" class="my-4 w-25 d-flex">
          <el-input v-model="pathNameInput" placeholder="Enter path name" clearable  :value="paths[active].name" class="mx-2"/>
          <el-button type="success" :icon="Check" circle @click="saveName"/>
        </div>
        <ShowCode :imageDimensions="imageDimensions" :imageUrl="imageUrl" :imageName="imageName" :paths="paths"/>
    </div>
  
    
  
</template>

<style scoped>
.image-input-label{
    cursor: pointer;
    background: #79bbff;
}

.pointable{
  cursor: pointer;
}

</style>