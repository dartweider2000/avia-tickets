class TicketUI{
   constructor(){
      this.container = document.querySelector('.content__row');
   }

   getTicketHTML({airlineName, airlineLogo, currency, date, destination, flightNumber, price, origin, transfers}){
      return `<div class="content__ticket ticket">
         <div class="ticket__airline airline-ticket">
            <div class="airline-ticket__logo">
               <img src="${airlineLogo}" alt="logo">
            </div>
            <div class="airline-ticket__title">${airlineName}</div>
         </div>
         <div class="ticket__addresses">
            <div class="ticket__source">${origin}</div>
            <div class="ticket__destination">${destination}</div>
         </div>
         <div class="ticket__description">
            <div class="ticket__service">
               <div class="ticket__date">${date}</div>
               <div class="ticket__deep">
                  <div class="ticket__change">Пересадок: ${transfers}</div>
                  <div class="ticket__flight">Номер рейса: ${flightNumber}</div>
               </div>
            </div>
            <div class="ticket__price">${price} ${currency}</div>
         </div>
      </div>`;
   }

   getEmptyHTML(){
      return `<div class="empty">Таких биллетов нет</div>`;
   }

   renderTickets(tickets){
      this.container.innerHTML = '';

      if(!tickets){
         this.container.insertAdjacentHTML('beforeend', this.getEmptyHTML());
         return;
      }

      const bodyHTML = Object.values(tickets).map(ticket => this.getTicketHTML(ticket));
      this.container.insertAdjacentHTML('beforeend', bodyHTML.join(''));
   }
}

const ticketUI = new TicketUI();

export default ticketUI;