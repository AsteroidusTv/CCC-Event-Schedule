const { invoke } = window.__TAURI__.tauri;

let createForm = document.getElementById("createForm");
let createNameInput = document.getElementById("createNameInput");
let createDateInput = document.getElementById("createDateInput");
let createDescriptionInput = document.getElementById("createDescriptionInput");

async function createEvent() {
  const result = await invoke("create_event", {
      createNameValue: createNameInput.value,
      createDateValue: createDateInput.value,
      createDescriptionValue: createDescriptionInput.value,
  });
  console.log("->>>>", result)
}

window.addEventListener("DOMContentLoaded", () => {
  createForm.addEventListener("submit", (e) => {
    createEvent();
    console.log(createNameInput.value, createDateInput.value, createDescriptionInput.value);
  });
});
