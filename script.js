const runFloating = document.getElementById("runFloating");
const floatingHtml = document.getElementById("floatingHtml");
const floatingCss = document.getElementById("floatingCss");
const floatingJs = document.getElementById("floatingJs");
const websitePreview = document.getElementById("websitePreview");
const tabs = document.querySelectorAll(".editor-tab");
const panels = document.querySelectorAll(".floating-code-panel");
const floatingContainer = document.getElementById("floatingContainer");
const dragHeader = document.getElementById("dragHeader");

function runCode() {
    const html = floatingHtml.value;

    const css = `
        <style>
            ${floatingCss.value}
        </style>
    `;

    const js = `
        <script>
            ${floatingJs.value}
        <\/script>
    `;

    websitePreview.innerHTML = html + css + js;
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(panel => panel.classList.remove("active"));

        tab.classList.add("active");
        const panelId = tab.dataset.tab;
        document.getElementById(panelId).classList.add("active");
    });
});

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

dragHeader.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - floatingContainer.offsetLeft;
    offsetY = e.clientY - floatingContainer.offsetTop;
    dragHeader.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const maxX = window.innerWidth - floatingContainer.offsetWidth;
    const maxY = window.innerHeight - floatingContainer.offsetHeight;

    if (newX < 0) newX = 0;
    if (newY < 80) newY = 80;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    floatingContainer.style.left = `${newX}px`;
    floatingContainer.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    dragHeader.style.cursor = "move";
});

// Run code initially and on button click
runFloating.addEventListener("click", runCode);
runCode();
