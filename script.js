// Get the textarea element
const textarea = document.getElementById("textarea");
const fileNameInput = document.getElementById("fileName");
const selectMenu = document.getElementById("fileType");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");

// Load text from local storage if available
const savedText = localStorage.getItem("savedText");
if (savedText) {
    textarea.value = savedText;
}

// Auto-save to local storage
textarea.addEventListener("input", () => {
    localStorage.setItem("savedText", textarea.value);
});

// Change button text based on selected file type
selectMenu.addEventListener("change", () => {
    const selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    saveBtn.innerText = `Save As ${selectedOption.split(" ")[0]} File`;
});

// Save text as a file
saveBtn.addEventListener("click", () => {
    if (fileNameInput.value.trim() === "") {
        alert("Please enter a file name.");
        return;
    }

    const blob = new Blob([textarea.value], { type: selectMenu.value });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileNameInput.value;
    link.href = fileUrl;
    link.click();
});

// Reset button functionality
resetBtn.addEventListener("click", () => {
    textarea.value = "";
    fileNameInput.value = "";
    localStorage.removeItem("savedText");
});
