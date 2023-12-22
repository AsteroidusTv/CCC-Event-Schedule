function openPopup(id) {
    const popup = document.getElementById(id);
    popup.classList.add("popup", "show");
  }

  function closePopup(id) {
    const popup = document.getElementById(id);
    popup.classList.add("closing");
    setTimeout(() => {
        popup.classList.remove("show", "closing");
    }, 250);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const popups = document.querySelectorAll(".show");
      popups.forEach(function (popup) {
      closePopup(popup.id);
    });
    }
  })