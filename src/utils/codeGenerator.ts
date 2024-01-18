import type Path from '../interfaces/Path';

export const GenerateHtmlCode = (paths: Path[], imageName: any, imageDimensions: any) =>{



let code = `<html>
<head>
</head>
<body>
  <svg id='wrapper' style="background: url('${imageName}');
      background-repeat: no-repeat;
      width: ${imageDimensions.width}px;
      height: ${imageDimensions.height}px;">
  </svg>
  <script>
  const svg = document.getElementById('wrapper');
  const rect = svg.getBoundingClientRect();
  verticalDifference = rect.top + window.scrollY;
  horizontalDifference = rect.left + window.scrollX;
  const paths ={
  `;
  paths.forEach((el)=>{
    code+=`
    ${el.name}: [`;
    el.points.forEach((point) =>{
      code+=`{x: ${point.y} + horizontalDifference,y: ${point.x} + verticalDifference},
      `;
    });
    code+=`      ],
    `;
  });
  code+=`
  }
    `;
  code+=`
  </script>
</body>
</html>`;

return code;
}

// export const GenerateReactCode = (paths: any, imageName: any, imageDimensions: any) =>{
//   let code = `import React from 'react';
// function interactiveImage(){
//   function handleClick(){
//     alert("Element clicked!😜")
//   }

//   const svgStyle = {
//     background: "url('${imageName}')",
//     backgroundRepeat: "no-repeat",
//     width: "${imageDimensions.width}px",
//     height: "${imageDimensions.height}px",
//   };

//   const shapeStyle = {
//     cursor: "pointer",
//   };

//   return (
//     <svg style={svgStyle}>`;
//     rects.forEach((element, index)=> {
//       code +=  `
//       <rect
//         x="${element.dimensions.x1}"
//         y="${element.dimensions.y1}"
//         width="${element.dimensions.width}"
//         height="${element.dimensions.height}"
//         opacity="0"
//         className="shape"
//         style={shapeStyle}
//         ${svgData.data[element.key]?.value.id === '' ? 'id="rect_' + index + '"' : 'id="' + svgData.data[element.key]?.value.id + '"'}
//         ${svgData.data[element.key]?.value.onclick ? 'onClick={handleClick}' : ''}
//       />`;
//     });



//     circles.forEach((element, index) => {
//       code += `
//       <circle
//         cx="${element.dimensions.x1}"
//         cy="${element.dimensions.y1}"
//         r="${element.dimensions.radius}"
//         opacity="0"
//         className="shape"
//         style={shapeStyle}
//         ${svgData.data[element.key]?.value.id === '' ? 'id="circle_' + index + '"' : 'id="' + svgData.data[element.key]?.value.id + '"'}
//         ${svgData.data[element.key]?.value.onclick ? 'onClick={handleClick}' : ''}
//       />`;
//     });

//     polys.forEach((element, index) => {
//       code += `
//       <polygon
//         points="${toString(element.points)}"
//         opacity="0"
//         className="shape"
//         style={shapeStyle}
//         ${svgData.data[element.key]?.value.id === '' ? 'id="poly_' + index + '"' : 'id="' + svgData.data[element.key]?.value.id + '"'}
//         ${svgData.data[element.key]?.value.onclick ? 'onClick={handleClick}' : ''}
//       />
//       `;
//     });

//     code += `
//     </svg>
//   )
// }
// export default interactiveImage;

// ///add this to your styles file: .shape:hover{opacity: 0.1;}`;
  

//   return code;
// }

// export const GenerateVueCode = (imageDimensions, rects, circles, polys, imageName) =>{
//   let code = `<script setup>
//   function handleClick(){
//     alert("Element clicked!😜")
//   }
// </script>
// <template>
//   <svg style="background: url('${imageName}');
//       background-repeat: no-repeat;
//       width: ${imageDimensions.width}px;
//       height: ${imageDimensions.height}px;">`;

//   rects.forEach((element, index)=> {
//     code +=  `
//     <rect
//       x="${element.dimensions.x1}"
//       y="${element.dimensions.y1}"
//       width="${element.dimensions.width}"
//       height="${element.dimensions.height}"
//       opacity="0"
//       class="shape"
//       ${svgData.data[element.key]?.value.id === '' ? 'id="rect_' + index + '"' : 'id="' + svgData.data[element.key]?.value.id + '"'}
//       ${svgData.data[element.key]?.value.onclick ? '@click="handleClick()"' : ''}
//     />`;
//   });



//   circles.forEach((element, index) => {
//     code += `
//     <circle
//       cx="${element.dimensions.x1}"
//       cy="${element.dimensions.y1}"
//       r="${element.dimensions.radius}"
//       opacity="0"
//       class="shape"
//       ${svgData.data[element.key]?.value.id === '' ? 'id="circle_' + index + '"' : 'id="' + svgData.data[element.key]?.value.id + '"'}
//       ${svgData.data[element.key]?.value.onclick ? '@click="handleClick()"' : ''}
//     />`;
//   });

//   polys.forEach((element, index) => {
//     code += `
//     <polygon
//       points="${toString(element.points)}"
//       opacity="0"
//       class="shape"
//       ${svgData.data[element.key]?.value.id === '' ? 'id="poly_' + index + '"' : 'id="' + svgData.data[element.key]?.value.id + '"'}
//       ${svgData.data[element.key]?.value.onclick ? '@click="handleClick()"' : ''}
//     />
//     `;
//   });

//   code += `
//   </svg>
// </template>

// <style scoped>
//     .shape:hover {
//     opacity: 0.1;
//     cursor: pointer;
//   }
// </style>
// `;

// return code;
// }