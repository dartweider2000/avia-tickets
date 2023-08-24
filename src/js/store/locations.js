import api from "../services/apiService";

class Locations{
   constructor(api){
      this.api = api;
      this.countries = null;
      this.cities = null;
      this.shortCitiesList = null;
      this.airlines = null;
      this.tickets = null;
   }

   async init(){
      const response = await Promise.all([
         this.api.countries(),
         this.api.cities(),
         this.api.airlines()
      ]);

      const [countries, cities, airlines] = response;

      this.countries = this.serializeCountries(countries);
      this.cities = this.serializeCities(cities);
      this.airlines = this.serializeAirlines(airlines);

      this.shortCitiesList = this.crateShortCitiesList();

      console.log(this.airlines);

      return response;
   }

   serializeAirlines(airlines){
      return airlines.reduce((result, item) => {
         item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
         item.name = item.name || item.name_translations.en;
         delete item.name_translations;
         result[item.code] = item;

         return result;
      }, {});
   }

   getAirlineNameByCode(code){
      return this.airlines[code]?.name || '';
   }

   getAirlineLogoByCode(code){
      return this.airlines[code]?.logo || '';
   }

   getCityNameByCityCode(code){
      return Object.values(this.cities).find(city => city.code === code);
   }

   getCityCodeByKey(key){
      return this.cities[key].code;
   }

   serializeCountries(countries){
      return countries.reduce((result, country) => {
         result[country.code] = country;
         return result;
      }, {});
   }  

   serializeCities(cities){
      return cities.reduce((result, city) => {
         const key = `${this.getCityName(city)}, ${this.getCountryNameByCountryCode(city.country_code)}`;
         result[key] = city;
         return result;
      }, {});
   }  

   crateShortCitiesList(){
      return Object.keys(this.cities).reduce((result, key) => {
         result[key] = null;
         return result;
      }, {});
   }

   getCityName(city){
      return city.name || city.name_translations.en;
   }

   getCountryNameByCountryCode(country_code){
      return this.countries[country_code].name;
   }

   serializeTickets(data, currency){
      return Object.values(data).reduce((result, ticket) => {
         const date = ticket.departure_at.match(/^\d\d\d\d-\d\d-\d\d/i)[0];

         result[date] = {
            date,
            'origin': this.getCityName(this.getCityNameByCityCode(ticket.origin)),
            'destination': this.getCityName(this.getCityNameByCityCode(ticket.destination)),
            'transfers': ticket.transfers,
            'flightNumber': ticket.flight_number,
            'price': ticket.price,
            currency,
            'airlineName': this.getAirlineNameByCode(ticket.airline),
            'airlineLogo': this.getAirlineLogoByCode(ticket.airline)
         }

         return result;
      }, {});
   }

   async fetchTickets(params){
      const response = await this.api.prices(params);
      
      response && (this.tickets = this.serializeTickets(response.data, response.currency));
      console.log(this.tickets);
   }
}

const locations = new Locations(api);

export default locations;