import { mainStore, results } from "./Cyclist.vue";

// let cyclist = computed(() => {
//   let cyclist = _.cloneDeep(
//     cyclistsStore.cyclists.find((cyclist) => cyclistId.value == cyclist.id)
//   );
//   for (const key in mainStore.marathons) {
//     if (Object.hasOwnProperty.call(mainStore.marathons, key)) {
//       let result = mainStore.marathons[key].find((element) => {
//         return element.participants.find(
//           (participant) => participant?.id == cyclist.id
//         );
//       });
//       if (result) {
//         let cyclistResult = result.participants.find(
//           (participant) => participant?.id == cyclist.id
//         );
//         cyclist.results.push({
//           season: key,
//           distance: result.distance,
//           type: result.type,
//           group: cyclistResult.group,
//           place: cyclistResult.place,
//           number: cyclistResult.number,
//           time: cyclistResult.time,
//           team: cyclistResult.team,
//         });
//       }
//     }
//   }
//   return cyclist;
// });
export function loadCyclistEvents() {
  let allEvents = [];
  mainStore.getEvents().then((response) => {
    allEvents = response.data.data;

    results.value.forEach((result) => {
      // TODO: Анимация загрузки
      console.log(allEvents, "allEvents");
      let foundEvent = allEvents.find((event) => {
        // console.log(event, "event");
      });

      mainStore.getEventResults(result.event_id).then((response) => {
        console.log(result.event_id, "result.event_id");
        console.log(response.data.data);
      });
    });
  });
}
