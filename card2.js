const runFloating = document.getElementById("runFloating");

const floatingHtml = document.getElementById("floatingHtml");
const floatingCss = document.getElementById("floatingCss");
const floatingJs = document.getElementById("floatingJs");

const websitePreview = document.getElementById("websitePreview");

const tabs = document.querySelectorAll(".editor-tab");
const panels = document.querySelectorAll(".floating-code-panel");

const floatingContainer =
document.getElementById("floatingContainer");

const dragHeader =
document.getElementById("dragHeader");

const resizeHandle =
document.getElementById("resizeHandle");




// =====================
// RUN CODE
// =====================

function runCode(){

    const html = floatingHtml.value;
    const css = floatingCss.value;
    const js = floatingJs.value;


    const iframe = document.createElement("iframe");


    iframe.style.width="100%";
    iframe.style.height="100%";
    iframe.style.border="0";


    websitePreview.innerHTML="";
    websitePreview.appendChild(iframe);



    const doc =
    iframe.contentWindow.document;


    doc.open();


    doc.write(`

<!DOCTYPE html>

<html>

<head>

<style>

${css}

</style>

</head>


<body>


${html}


<script>

${js}

<\/script>


</body>

</html>

`);


    doc.close();

}






// =====================
// FIXED TABS
// =====================

tabs.forEach(tab=>{


    tab.addEventListener(
    "pointerdown",
    (e)=>{

        // stop dragging from starting
        e.stopPropagation();

    });


    tab.addEventListener(
    "click",
    ()=>{


        tabs.forEach(t=>
            t.classList.remove("active")
        );


        panels.forEach(p=>
            p.classList.remove("active")
        );



        tab.classList.add("active");



        document
        .getElementById(tab.dataset.tab)
        .classList.add("active");


    });


});







// =====================
// RUN BUTTON
// =====================

runFloating.onclick = runCode;









// =====================
// DRAG
// =====================

let dragging=false;

let offsetX=0;
let offsetY=0;



dragHeader.addEventListener(
"pointerdown",
(e)=>{


    // do not drag when clicking buttons
    if(e.target.closest(".editor-tab")){
        return;
    }



    dragging=true;


    let rect =
    floatingContainer.getBoundingClientRect();


    offsetX =
    e.clientX - rect.left;


    offsetY =
    e.clientY - rect.top;


    dragHeader.setPointerCapture(
    e.pointerId
    );


});





dragHeader.addEventListener(
"pointermove",
(e)=>{


if(!dragging)return;



let x =
e.clientX - offsetX;


let y =
e.clientY - offsetY;



x=Math.max(
0,
Math.min(
x,
window.innerWidth -
floatingContainer.offsetWidth
)
);


y=Math.max(
0,
Math.min(
y,
window.innerHeight -
floatingContainer.offsetHeight
)
);



floatingContainer.style.left =
x+"px";


floatingContainer.style.top =
y+"px";


floatingContainer.style.right =
"auto";


});





dragHeader.addEventListener(
"pointerup",
()=>{

dragging=false;

});










// =====================
// RESIZE
// =====================


let resizing=false;

let startX;
let startY;
let startW;
let startH;



resizeHandle.addEventListener(
"pointerdown",
(e)=>{


resizing=true;


startX=e.clientX;
startY=e.clientY;


startW =
floatingContainer.offsetWidth;


startH =
floatingContainer.offsetHeight;


resizeHandle.setPointerCapture(
e.pointerId
);


});





resizeHandle.addEventListener(
"pointermove",
(e)=>{


if(!resizing)return;



floatingContainer.style.width =
Math.max(
280,
startW+(e.clientX-startX)
)+"px";



floatingContainer.style.height =
Math.max(
250,
startH+(e.clientY-startY)
)+"px";


});






resizeHandle.addEventListener(
"pointerup",
()=>{

resizing=false;

});






// START

runCode();