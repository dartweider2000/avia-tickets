import locations from "./store/locations";
import selectFormUI from "./views/selectFrom";
import searchFormUI from "./views/searchForm";
import ticketUI from "./views/tickets";


document.addEventListener('DOMContentLoaded', async (e) => {
   initApp();

   searchFormUI.form.addEventListener('submit', submitFormHandler);

   async function initApp(){
      await locations.init();
      searchFormUI.setAutoCompleteData(locations.shortCitiesList);
   }

   async function submitFormHandler(e){
      e.preventDefault();

      const origin = locations.getCityCodeByKey(searchFormUI.originValue);
      const destination = locations.getCityCodeByKey(searchFormUI.destinationValue);
      const depart_date = searchFormUI.departTimeValue;
      const return_date = searchFormUI.returnTimeValue;
      const currency = selectFormUI.selectValue;

      await locations.fetchTickets({
         origin,
         destination,
         depart_date,
         return_date,
         currency
      });

      ticketUI.renderTickets(locations.tickets);
   }
});


