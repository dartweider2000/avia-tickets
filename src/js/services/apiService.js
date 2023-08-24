import axios from "axios";
import config from "../config/apiConfig";

/**
 * /counties - array of
 * /cities - array of cities
 * /price/cheap - array
 */
class Api{
   constructor(config){
      this.url = config.url;
   }

   async request(prefix, params = null){
      try{
         const response = await axios.get(`${this.url}${prefix}`, {params: params ? params : null});
         return response.data;
      }catch(err){
         console.log(err);

         //return Promise.reject(err);
      }
   }

   async airlines(){
      return await this.request('/airlines');
   }

   async countries(){
      return await this.request('/countries');
   }

   async cities(){
      return await this.request('/cities');
   }

   async prices(params){
      return await this.request('/prices/cheap', params);
   }
}

const api = new Api(config);

export default api;