/* sessionStorage 和localStorage的工具类 */
const storage = {
    setLocal: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getLocal: function(key) {
        let value = window.localStorage.getItem(key);
        return JSON.parse(value);
    },
    clearOneLocal: function(key) {
        window.localStorage.removeItem(key);
    },
    clearAllLocal: function() {
        window.localStorage.clear();
    },
    setSession: function(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getSession: function(key) {
        let value = window.sessionStorage.getItem(key);
        return JSON.parse(value);
    },
    clearOneSession: function(key) {
        window.sessionStorage.removeItem(key);
    },
    clearAllSession: function() {
        window.sessionStorage.clear();
    }
};

export default storage