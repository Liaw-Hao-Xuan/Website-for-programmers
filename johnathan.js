const runFloating = document.getElementById("runFloating");
const floatingHtml = document.getElementById("floatingHtml");
const floatingCss = document.getElementById("floatingCss");
const floatingJs = document.getElementById("floatingJs");
const websitePreview = document.getElementById("websitePreview");

const tabs = document.querySelectorAll(".editor-tab");
const panels = document.querySelectorAll(".floating-code-panel");

const floatingContainer = document.getElementById("floatingContainer");
const dragHeader = document.getElementById("dragHeader");
const resizeHandle = document.getElementById("resizeHandle");

// -------------------------
// Run Code
// -------------------------

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

// -------------------------
// Tabs
// -------------------------

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(panel => panel.classList.remove("active"));

        tab.classList.add("active");

        document
            .getElementById(tab.dataset.tab)
            .classList.add("active");

    });

});

// -------------------------
// Drag Window
// -------------------------

let isDragging = false;

let offsetX = 0;
let offsetY = 0;

dragHeader.addEventListener("pointerdown", (e) => {

    if (isResizing) return;

    isDragging = true;

    const rect = floatingContainer.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    dragHeader.setPointerCapture(e.pointerId);

    dragHeader.style.cursor = "grabbing";

    e.preventDefault();

});

dragHeader.addEventListener("pointermove", (e) => {

    if (!isDragging) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const maxX = window.innerWidth - floatingContainer.offsetWidth;
    const maxY = window.innerHeight - floatingContainer.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    floatingContainer.style.left = x + "px";
    floatingContainer.style.top = y + "px";

    floatingContainer.style.right = "auto";

});

function stopDragging(e) {

    if (!isDragging) return;

    isDragging = false;

    dragHeader.style.cursor = "grab";

    dragHeader.releasePointerCapture(e.pointerId);

}

dragHeader.addEventListener("pointerup", stopDragging);
dragHeader.addEventListener("pointercancel", stopDragging);

// -------------------------
// Resize Window
// -------------------------

let isResizing = false;

let startWidth = 0;
let startHeight = 0;

let startX = 0;
let startY = 0;

resizeHandle.addEventListener("pointerdown", (e) => {

    isResizing = true;

    startWidth = floatingContainer.offsetWidth;
    startHeight = floatingContainer.offsetHeight;

    startX = e.clientX;
    startY = e.clientY;

    resizeHandle.setPointerCapture(e.pointerId);

    e.preventDefault();

});

resizeHandle.addEventListener("pointermove", (e) => {

    if (!isResizing) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let width = startWidth + dx;
    let height = startHeight + dy;

    const minWidth = 280;
    const minHeight = 250;

    const maxWidth = window.innerWidth - floatingContainer.offsetLeft;
    const maxHeight = window.innerHeight - floatingContainer.offsetTop;

    width = Math.max(minWidth, Math.min(width, maxWidth));
    height = Math.max(minHeight, Math.min(height, maxHeight));

    floatingContainer.style.width = width + "px";
    floatingContainer.style.height = height + "px";

});

function stopResize(e) {

    if (!isResizing) return;

    isResizing = false;

    resizeHandle.releasePointerCapture(e.pointerId);

}

resizeHandle.addEventListener("pointerup", stopResize);
resizeHandle.addEventListener("pointercancel", stopResize);

// -------------------------
// Keep Window Inside Screen
// -------------------------

window.addEventListener("resize", () => {

    let left = floatingContainer.offsetLeft;
    let top = floatingContainer.offsetTop;

    let width = floatingContainer.offsetWidth;
    let height = floatingContainer.offsetHeight;

    if (left + width > window.innerWidth) {
        left = window.innerWidth - width;
    }

    if (top + height > window.innerHeight) {
        top = window.innerHeight - height;
    }

    left = Math.max(0, left);
    top = Math.max(0, top);

    floatingContainer.style.left = left + "px";
    floatingContainer.style.top = top + "px";
    floatingContainer.style.right = "auto";

});

// -------------------------
// Run Button
// -------------------------

runFloating.addEventListener("click", runCode);

// Initial Preview

runCode();