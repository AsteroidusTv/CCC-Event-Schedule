const { invoke } = window.__TAURI__.tauri;

const createEventForm = document.getElementById("createEventForm");
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

function deleteEvent(id) {
  console.log("Yes :", id)
}

async function showEvent() {
  const result = await invoke("show_event");
  const showEvents = document.getElementById("showEvents"); // Assurez-vous d'avoir un élément avec cet ID dans votre HTML

  for (var i = 0; i < result.length; i++) {
    const eventDiv = document.createElement('div');
    const eventName = document.createElement('p');
    const eventDate = document.createElement('p');
    const eventDescription = document.createElement('p');
    const eventDeleteButton = document.createElement('button');

    eventDiv.classList.add("event-container");

    eventName.textContent = result[i].name;
    eventDate.textContent = result[i].date;
    eventDescription.textContent = result[i].description;

    eventDeleteButton.id = result[i].name;
    eventDeleteButton.textContent = "Delete";

    eventDiv.appendChild(eventName);
    eventDiv.appendChild(eventDate);
    eventDiv.appendChild(eventDescription);
    eventDiv.appendChild(eventDeleteButton);

    showEvents.appendChild(eventDiv);

    // Utilisation d'une IIFE pour capturer la bonne référence de eventDeleteButton
    (function(button) {
      button.onclick = function() {
        console.log("Delete event with ID:", button.id);
        deleteEvent(button.id)
      };
    })(eventDeleteButton);
  }
}

async function deleteEvent(eventId) {
  await invoke("delete_event", {
    name: eventId,
  });
  location.reload();
}




window.addEventListener("DOMContentLoaded", () => {
  showEvent()
  createEventForm.addEventListener("submit", (e) => {
    createEvent();
    console.log(createNameInput.value, createDateInput.value, createDescriptionInput.value);
  });
});


