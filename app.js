import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import config from "./config.js";
import CryptoJS from "crypto-js";

const canalCode = "ub0q3rd0EpdD"; // Most be a parameter available when load this page
const userId = 5; // Most be a parameter available when load this page
//let hashUserID = hashStringJavaScript(userId.toString());

// Obtener los parámetros de la URL actual
const params = new URLSearchParams(window.location.search);
const hashUserID = params.get('hashUserID'); // For testing I will be getting the hashUserID from URL

//hashUserID = 'c81e728d9d4c2f60';
const backend_url = 'http://localhost:8000/api/';

function hashStringJavaScript(string) {
    // NOTA: cuando haga esto verificar si las longitudes de las cadenas estan iguales en el front y back
    return CryptoJS.MD5(string).toString().substring(0, 15);
}

window.Pusher = Pusher;

// Create the ECHO instance
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: config.REVERB_KEY, // Reverb key
    wsHost: config.REVERB_WS_HOST,
    wsPort: config.REVERB_WS_PORT ?? 80,
    wssPort: config.REVERB_WSS_PORT ?? 443,
    forceTLS: (config.REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    disableStats: true
});


// Main
window.addEventListener('DOMContentLoaded', function () {

    console.log('------ CANAL = ' + canalCode + '  ------');
    // Check for pending Notifications
    fetch(backend_url + 'notifications/pending', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: canalCode,
            token_user_notification: hashUserID
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => console.error('Error al obtener notificaciones pendientes:', error));

    const user_code_container = document.getElementById('user_code');
    const user_code = document.createElement('span');
    user_code.innerText = 'UserCode: ' + hashUserID;
    user_code_container.appendChild(user_code);

    // Initiate the connection with the broadcast channel
    console.log('Starting Channel Suscription... canal-' + canalCode)
    window.Echo.channel('channel-' + canalCode)
        .listen('.channel.' + canalCode, (event) => {
            console.log(event);
           if (event.token_user_notification === 'broadcast' || event.token_user_notification === hashUserID) { // Only broadcast notifications (for all channel users) will be shown here



                const container = document.getElementById('notificationContainer');
                const notification = document.createElement('div');
                notification.classList.add('alert', 'alert-info', 'mt-2');
                notification.innerText = event.message;
                container.appendChild(notification);

                // Send notification read receipt to the backend
                fetch(backend_url + 'notification/read', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        notificationId: event.notification_id,
                        canalCode: event.code,
                        token_user_notification: hashUserID
                    })

                }).catch(error => console.error('Error al registrar lectura:', error));
           }

        }).error((error) => {
        console.error('Error connecting to WebSocket:', error);
    });

    // Check the connection status
    window.Echo.connector.pusher.connection.bind('state_change', function (states) {
        console.log('Connection state changed:', states);
    });
    window.Echo.connector.pusher.connection.bind('connected', function () {
        console.log('Successfully connected to WebSockets!');
    });

});