
/**
 * User login data in local storage handler
 */
export default class UserProfile {
    /**
     * Read user data from local storage
     * 
     * @returns {Object|null} User object data information 
     */
    static get() {
        return localStorage.getItem("USER")? JSON.parse(localStorage.getItem("USER")) : null;
    }

    /**
     * Store user data information to local storage
     * 
     * @param {Object} param User data information to store 
     */
    static set({id, name, lastname, email, birthday, token}) {
        localStorage.setItem("USER", JSON.stringify({
            'id': id, 
            'name': name, 
            'lastname': lastname, 
            'email': email, 
            'birthday': birthday, 
            'token': token,
        }));
    }

    /**
     * Remove the user data from local storage and change 
     * location to login page
     */
    static del() {
        localStorage.removeItem("USER"); 
        document.location.href = "login";
    }
}