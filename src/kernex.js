import kernexClient from '@kernex/client';

// Replace with your own app endpoint
const kernex = kernexClient({
  appUrl: process.env.KERNEX_APP_URL,
  appApiKey: process.env.KERNEX_APP_API_KEY,
});

export default kernex;
