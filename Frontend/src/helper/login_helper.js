import Api from "./api";
import UserProfile from "../models/UserProfile";

/**
 * Class to handle user login or register
 */
export default class LoginHelper {

  /**
   * Call to API to login if @isNew is false, register otherwise
   * 
   * @param   {Object}  data   Login/Register data
   * @param   {boolean} isNew  if it is true indicates that it is a register
   * @returns {Promise(string[]|null)}  Return the promise of list of errors, if it exists, or null if not
   */
  static loginApiCall = async (data, isNew) => {
    const api = new Api();
    
    if (isNew) {
      return await api.register(data)
        .then(this.handleApiResponse)
        .catch(this.handleApiError);
    }
  
    return await api.login(data)
      .then(this.handleApiResponse)
      .catch(this.handleApiError);
    
  }
  
  /**
   * Store user data in LocalStorage
   * 
   * @param   {Object}  response   Api user data response
   */
  static handleApiResponse(response) {
    UserProfile.set(response.data);
  }
  
  /**
   * Store api call error in a list of string to return
   * 
   * @param   {Object}    error  Api error response
   * @returns {string[]}  List of errors from api
   */
  static handleApiError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data.errors) {
          let messages = [];
          for(let msg in error.response.data.errors) {
              if (msg !== 'status_code')
              messages.push(error.response.data.errors[msg]);
          }
          return messages;
      }
      return "error desconocido";
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return ["Sin conexión con el servidor"];
    } else {
        // Something happened in setting up the request that triggered an Error
        return ["Error"];
    }
  }
}