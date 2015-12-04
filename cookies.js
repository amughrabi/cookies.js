/**
 * This script is simple JavaScript operations on cookies, you can remove, add, and find item from cookie.
 * This script can be used as Javascript API or as Jquery plugin (if jquery exists in your project);
 * @class cookies
 * @constructor
 */

/**
 * Used for the main implementation.
 * @global
 * */
var cookies = {
    /**
     * This method is for adding (key : value) into cookie.
     * @method addItem
     * @param {string} name (Required) The name of Item.
     * @param {string} value (Required) The value of Item.
     * @param {list} options (Optional) The configuration list include:
     *- expires: denotes to the period (in days) of time that makes item out of date.
     *- domain: denotes to cookie domain.
     *- path: denotes to path of item in cookies.
     *- secure: denotes to secure item.
     * @returns {null}
     * */
    addItem: function(name, value, options) {
        if(!utilities.hasText(value)) return;
        options = options || {};
        var date = new Date();
        switch (typeof options.expires) {
            case 'number' :
                // We will use expires attribute, because the max-age attribute is not supported by IE.
                // If the expire date is Number, We Assume that the expire date is days number.
                date.setTime(date.getTime() + (options.expires * (1000 * 60 * 60 * 24)));
                break;
            case 'string':
            case 'object':
                date = utilities.getDate(options.expires, date);
                break;
            case 'undefined':
                date = undefined;
                break;
        }

        var expires = date          ? '; expires=' + date.toUTCString() : '';
        var domain = options.domain ? '; domain='  + options.domain     : '';
        var path   = options.path   ? '; path='    + options.path       : '';
        var secure = options.secure ? '; secure'                        : '';

        /* write it */
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + domain +  path + secure;
    },
    /**
     * This method is for retrieving items from cookie.
     * @method getItem
     * @param {string} name (Required) The name of Item.
     * @param {string} value callback parameter.
     * @returns {string} the value that corresponding to the name from cookie.
     * */
    getItem: function(name, value) {
        if(!utilities.hasText(name)) return;
        value = document.cookie.replace(
            new RegExp('(?:(?:^|.*;)\\s*' +
            encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$'),
            '$1');
        return value ? decodeURIComponent(value) : value;
    },
    /**
     * This method is for checking if the item is exist in the cookie.
     * @method hasItem
     * @param {string} name (Required) The name of Item.
     * @returns {boolean} true if the value is exist in the cookie.
     * */
    hasItem: function(name) {
        if(!utilities.hasText(name)) return false;
        return (new RegExp('(?:^|;\\s*)' +
        encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&')
        + '\\s*\\=')).test(document.cookie);
    },
    /**
     * This method is for removing the if and only if the item is exist in the cookie.
     * @method removeItem
     * @param {string} name (Required) The name of Item.
     * */
    removeItem: function(name) {
        if(!utilities.hasText(name) || !this.hasItem(name)) return;
        var expiredDate = new Date();
        expiredDate.setTime(expiredDate.getTime() - 1);
        document.cookie = encodeURIComponent(name) + "=; expires=" + expiredDate.toUTCString();
    },
    /**
     * This method is for converting the string of cookies to list of (key : value) pairs.
     * @method list
     * @returns {list} all items as list.
     * */
    list: function() {
        return document.cookie.split(';').map(function(x) {
            return x.trim().split('=');
        }).reduce(function(accumaltor, element) {
                accumaltor[ element[ 0 ] ] = element[ 1 ]; return accumaltor;
            }, {}
        );
    },
    /**
     * This method is for removing all (key : value) pairs from cookie.
     * @method removeAll
     * */
    removeAll: function() {
        document.cookie.split(';').map(function(x) {
            return x.trim().split('=');
        }).reduce(function(accumlator, element) {
                cookies.removeItem(element[0]);
            }, {}
        );
    }
};

/**
 * Utilities: Used for helper methods.
 * @global
 * */
var utilities = {
    /**
     * Check if the string is *not* (empty or Null or whitespaces).
     * @method hasText
     * @returns {boolean}
     * */
    hasText: function(str) {
        return (str && str.trim().length > 0);
    },
    /**
     * Check if the date text or object is correct.
     * @method getDate
     * @returns {Date}
     * */
    getDate: function(o, def) {
        var date = new Date(o);
        return this.isValidDate(date) ? date : def;
    },
    /**
     * Check date object is correct
     * @method isValidDate
     * @returns {boolean}
     * */
    isValidDate: function(date) {
        return date instanceof Date && !isNaN(date.valueOf());
    }
};
/**
 * Implementation for cookies functionality - Creating jquery plugin.
 * - List of the cookie items:
 *      $.cookies() === cookies.list()
 * - Retrieve the item from cookie:
 *      $.cookies(name) === cookies.getItem(name)
 * - Add (key : value): The value that added in this way will be removed after removing session:
 *      $.cookies(name, value) === cookies.addItem(name, value) :
 * - Add (key : value, expires): The value that added in this way will be removed after 7 days.
 *      $.cookies(name, value, {expires : 7}) === cookies.addItem(name, value, {expires : 7}) :
 * - Add (key : value, domain): The value will be added to cookie with associated domain.
 *      $.cookies(name, value, {domain : 'example.com'}) === cookies.addItem(name, value, {domain : 'example.com'})
 * - Add (key : value, path): The value will be added to cookie under input path.
 *      $.cookies(name, value, {path : '/example'}) === cookies.addItem(name, value, {path : '/example'})
 * - Add (key : value, secure) : To prevent cookies from being observed by unauthorized parties due to the transmission
 *   of a the cookie in clear text.
 *      $.cookies(name, value, {secure : true}) === cookies.addItem(name, value, {secure : true})
 * - Note: you can mixing between options to fit your project requirements.
 * - Remove (key): Remove the item that have the same name from cookie.
 *      $.removeCookie(name) === cookies.removeItem(name)
 * - Check Item (key) : Check if the cookie have the required item.
 *      $.checkCookie(name) === cookies.hasItem(name)
 * - Erase all cookie items:
 *      $.clearCookies() === cookies.removeAll()
 * */
(function( $ ) {
    $.extend({
        cookies: function(name, value, options) {
            /* regex is faster than using array function (split) */
            if(utilities.hasText(value)) { // add item to cookies
                cookies.addItem(name, value, options);
            } else { // retrieve item
                return utilities.hasText(name) ? cookies.getItem(name) : cookies.list();
            }
        },
        removeCookie: function(name) {
            cookies.removeItem(name);
        },
        checkCookie: function(name) {
            return cookies.hasItem(name);
        },
        clearCookies: function() {
            cookies.removeAll();
        }
    });
}(jQuery));
