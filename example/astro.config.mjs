import { defineConfig } from "astro/config";
import mixpanel from "astrojs-mixpanel";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mixpanel({
      // Your Mixpanel project token
      token: "YOUR_MIXPANEL_TOKEN", // Replace with your actual token

      // Optional: Mixpanel configuration
      config: {
        track_pageview: true,
        persistence: "localStorage",
        batch_requests: true,
        debug: false, // Set to true for development
      },

      // Optional: Enable automatic page view tracking (default: true)
      autoTrack: true,

      // Optional: Global properties to include with every event
      globalProperties: {
        app_version: "1.0.0",
        environment: "production",
      },
    }),
  ],
});
