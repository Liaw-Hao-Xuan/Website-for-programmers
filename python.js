let pyodide;
const outputText = document.getElementById("outputText");
const pythonCode = document.getElementById("pythonCode");
const runBtn = document.getElementById("runBtn");

async function loadPyodideAndPackages() {
    pyodide = await loadPyodide();
    outputText.textContent = "Python Ready ✔";
}

loadPyodideAndPackages();

runBtn.addEventListener("click", async () => {
    try {
        let code = pythonCode.value;

        let result = await pyodide.runPythonAsync(`
import sys
from io import StringIO

output = StringIO()
sys.stdout = output

try:
${code.split("\n").map(l => "    " + l).join("\n")}
except Exception as e:
    print(e)

sys.stdout = sys.__stdout__
output.getvalue()
        `);

        outputText.textContent = result;
    }
    catch (err) {
        outputText.textContent = err;
    }
});

/* DRAG FUNCTION */
const container = document.getElementById("floatingContainer");
const header = document.getElementById("dragHeader");

let isDragging = false;
let offsetX, offsetY;

header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - container.offsetLeft;
    offsetY = e.clientY - container.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    container.style.left = (e.clientX - offsetX) + "px";
    container.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});