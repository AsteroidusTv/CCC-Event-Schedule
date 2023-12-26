const { invoke } = window.__TAURI__.tauri;

const createEventForm = document.getElementById("createEventForm");
const createNameInput = document.getElementById("createNameInput");
const createDateInput = document.getElementById("createDateInput");
const createDescriptionInput = document.getElementById("createDescriptionInput");
const showEvents = document.getElementById('showEvents');

function createEventContainer(event) {
  const eventDiv = document.createElement('div');
  const elements = ['name', 'date', 'description'];

  eventDiv.classList.add("event-container");

  elements.forEach(element => {
    const p = document.createElement('p');
    p.textContent = event[element];
    eventDiv.appendChild(p);
  });

  return eventDiv;
}

function createDeleteButton(eventId) {
  const eventDeleteButton = document.createElement('button');

  eventDeleteButton.id = eventId;
  eventDeleteButton.textContent = "Delete";

  return eventDeleteButton;
}

async function createEvent() {
  const result = await invoke("create_event", {
      createNameValue: createNameInput.value,
      createDateValue: createDateInput.value,
      createDescriptionValue: createDescriptionInput.value,
  });
}

async function showEvent() {
  const result = await invoke("show_event");
  result.sort((a, b) => new Date(a.date) - new Date(b.date));

  const currentDate = new Date();
  const upcomingEvents = [];

  for (const event of result) {
    const eventDate = new Date(event.date);

    if (eventDate >= currentDate) {
      upcomingEvents.push(event);
    } else {
      await deleteEvent(event.name);
    }
  }

  const nextEventDiv = document.querySelector('.next-event');
  nextEventDiv.innerHTML = '';

  if (upcomingEvents.length > 0) {
    const upcomingEvent = upcomingEvents[0];
    const upcomingEventDiv = createEventContainer(upcomingEvent);
    const eventDeleteButton = createDeleteButton(upcomingEvent.name);

    eventDeleteButton.onclick = () => deleteEvent(upcomingEvent.name);

    upcomingEventDiv.appendChild(eventDeleteButton);
    nextEventDiv.appendChild(upcomingEventDiv);
  } else {
    nextEventDiv.innerHTML = `<h1>No upcoming events</h1>`;
  }

  showEvents.innerHTML = ''; // Clear the existing events in the general list

  for (const event of upcomingEvents.slice(1)) {
    const eventDiv = createEventContainer(event);
    const eventDeleteButton = createDeleteButton(event.name);

    eventDeleteButton.onclick = () => deleteEvent(event.name);

    eventDiv.appendChild(eventDeleteButton);
    showEvents.appendChild(eventDiv);
  }
}


async function deleteEvent(eventId) {
  await invoke("delete_event", { name: eventId });
  location.reload();
}


window.addEventListener("DOMContentLoaded", () => {
  showEvent()
  createEventForm.addEventListener("submit", (e) => {
    createEvent();
    console.log(createNameInput.value, createDateInput.value, createDescriptionInput.value);
  });
});
