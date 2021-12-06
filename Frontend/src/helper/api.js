import axios from "axios";
import UserProfile from '../models/UserProfile';

/**
 * Manage api calls
 */
export default class Api {
  constructor() {
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  /**
 * Api call initial configuration
 *
 */
  init = () => {
    const defaultOptions = {
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    this.client = axios.create(defaultOptions);

    // Set the AUTH token for any request
    if (UserProfile.get()?.token) {
        this.client.interceptors.request.use(function (config) {
            config.headers.Authorization =  `Bearer ${UserProfile.get().token}`;
            return config;
        });
    }

    return this.client;
  };
  
  /**
   * Login with email and password
   *
   * @param  {Object}  data  The user login form data
   * @return {Object}  User logged data
   */
  login = (data) => {
    return this.init().post("/user/login", data);
  }
  
  /**
   * Register new user
   *
   * @param  {Object}  data  The user registration form data
   * @return {Object}  User created data
   */
  register = (data) => {
    return this.init().post("/user/register", data);
  }
  
  /**
   * List of register users in database
   *
   * @return {Object[]}  List of registered users
   */
  getUserList = (page = null, name = null, range = null) => {
    name = name=== ""? null : name;
    return this.init().get("/users", {
      params: {
        page: page,
        name: name,
        range: range,
      }
    });
  };

}