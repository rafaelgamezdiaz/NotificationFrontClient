// config.js
const config = {
    REVERB_KEY: 'fyvzjkj9t1bixmq10abu',     // Llave de Reverb
    REVERB_WS_HOST: 'localhost',               // Host del servidor de Laravel Echo
    REVERB_WS_PORT: 8080,                      // Puerto para WebSocket / 6001
    REVERB_WSS_PORT: 8080,                       // Puerto para WSS WebSocket / o 443
    REVERB_SCHEME: 'http'

    // REVERB_APP_ID=558605
    // REVERB_APP_KEY=fyvzjkj9t1bixmq10abu
    // REVERB_APP_SECRET=dhwiev71fghcxfrybxbv
 //   REVERB_HOST="localhost"
  //  REVERB_PORT=8080
  //  REVERB_SCHEME=http

 //   VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
 //   VITE_REVERB_HOST="${REVERB_HOST}"
 //   VITE_REVERB_PORT="${REVERB_PORT}"
 //   VITE_REVERB_SCHEME="${REVERB_SCHEME}"

 //   key: config.VITE_REVERB_APP_KEY,
//    wsHost: import.meta.env.VITE_REVERB_HOST,
  //  wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
  //  wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
  //  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
};

export default config;