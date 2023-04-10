
require('./bootstrap')
//axios adding
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


// vue js instance
window.Vue = require('vue');
import Vue from 'vue';

//import Notification Helpers
import Notification from './Helpers/Notifiations';
window.Notification = Notification;

//import Sweetalert2 Notifications
import SwalHelper from "./Helpers/SwalHelper";
window.SwalHelper = SwalHelper;

//import All general used functions
import GeneralFunctions from "./Helpers/GeneralFunctions";
window.GeneralFunctions = GeneralFunctions;
