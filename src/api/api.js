const baseUrl = import.meta.env.VITE_API_BASE_URL;

function getEvents() {
  return fetch(`${baseUrl}st/counts/ev_cyclists?tag_id=1`).then((response) => {
    return response.json();
  });
}

function getEventResults(eventId) {
  return fetch(`${baseUrl}results/${eventId}`).then((response) => {
    return response.json();
  });
}

// TODO: Поменять название на participant?
function getCyclists() {
  return fetch(`${baseUrl}st/list/ev_cyclists?tag_id=1`).then((response) => {
    return response.json();
  });
}

function getCyclistsResults(cyclistId) {
  return fetch(`${baseUrl}st/list/cyclist_events?tag_id=1&cyclist_id=${cyclistId}`).then(
    (response) => {
      return response.json();
    },
  );
}

export { getEvents, getEventResults, getCyclists, getCyclistsResults };
