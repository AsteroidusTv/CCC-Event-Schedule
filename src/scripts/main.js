const { invoke } = window.__TAURI__.tauri;

const createEventForm = document.getElementById("createEventForm");
const createNameInput = document.getElementById("createNameInput");
const createDateInput = document.getElementById("createDateInput");
const createDescriptionInput = document.getElementById("createDescriptionInput");
const showEvents = document.getElementById('showEvents');

function compareDates(event1, event2) {
  const date1 = new Date(event1.date);
  const date2 = new Date(event2.date);
  
  return date1 - date2;
}

async function createEvent() {
  const result = await invoke("create_event", {
      createNameValue: createNameInput.value,
      createDateValue: createDateInput.value,
      createDescriptionValue: createDescriptionInput.value,
  });
  alert(result);
}

async function showEvent() {
  const result = await invoke("show_event");
  result.sort(compareDates);

  if (result.length > 0) {
    const nextEvent = result[0];
    const currentDate = new Date();

    if (new Date(nextEvent.date) > currentDate) {
      console.log("Le prochain événement est :", nextEvent);
    } else {
      console.log("Tous les événements sont déjà passés.");
    }
  } else {
    console.log("Il n'y a pas d'événements.");
  }

  for (var i = 0; i < result.length; i++) {
    const event = result[i];

    const eventDiv = document.createElement('div');
    const eventName = document.createElement('p');
    const eventDate = document.createElement('p');
    const eventDescription = document.createElement('p');
    const eventDeleteButton = document.createElement('button');

    eventDiv.classList.add("event-container");

    eventName.textContent = event.name;
    eventDate.textContent = event.date;
    eventDescription.textContent = event.description;

    eventDeleteButton.id = event.name;
    eventDeleteButton.textContent = "Delete";

    eventDiv.appendChild(eventName);
    eventDiv.appendChild(eventDate);
    eventDiv.appendChild(eventDescription);
    eventDiv.appendChild(eventDeleteButton);

    showEvents.appendChild(eventDiv);

    (function(button) {
      button.onclick = function() {
        deleteEvent(button.id);
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


