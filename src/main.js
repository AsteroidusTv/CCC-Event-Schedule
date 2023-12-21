const { invoke } = window.__TAURI__.tauri;

const createForm = document.getElementById("createForm");
const createNameInput = document.getElementById("createNameInput");
const createDateInput = document.getElementById("createDateInput");
const createDescriptionInput = document.getElementById("createDescriptionInput");
const showEvents = document.getElementById('showEvents');

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
    var eventDiv = document.createElement('div');
    var eventName = document.createElement('p');
    var eventDate = document.createElement('p');
    var eventDescription = document.createElement('p');

    eventName.textContent = result[i].name;
    eventDate.textContent = result[i].date;
    eventDescription.textContent = result[i].description;

    eventDiv.appendChild(eventName);
    eventDiv.appendChild(eventDate);
    eventDiv.appendChild(eventDescription);

    showEvents.appendChild(eventDiv);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showEvent()
  createForm.addEventListener("submit", (e) => {
    createEvent();
    console.log(createNameInput.value, createDateInput.value, createDescriptionInput.value);
  });
});
