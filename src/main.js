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
}

async function showEvent() {
  const result = await invoke("show_event");
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].name);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showEvent()
  createForm.addEventListener("submit", (e) => {
    createEvent();
    console.log(createNameInput.value, createDateInput.value, createDescriptionInput.value);
  });
});
