import type { AstroIntegration } from "astro";

export interface MixpanelOptions {
  /**
   * Your Mixpanel project token
   */
  token: string;

  /**
   * Configuration options for Mixpanel
   */
  config?: {
    /**
     * Enable/disable tracking (default: true)
     */
    track_pageview?: boolean;

    /**
     * Enable/disable persistence (default: true)
     */
    persistence?: "localStorage" | "cookie" | "none";

    /**
     * Cookie name for persistence (default: 'mp_' + token)
     */
    persistence_name?: string;

    /**
     * Enable/disable batch requests (default: true)
     */
    batch_requests?: boolean;

    /**
     * Custom API host (optional)
     */
    api_host?: string;

    /**
     * Enable debug mode (default: false)
     */
    debug?: boolean;

    /**
     * Disable all events (default: false)
     */
    disable_all_events?: boolean;

    /**
     * Disable notifications (default: false)
     */
    disable_notifications?: boolean;
  };

  /**
   * Enable automatic page view tracking (default: true)
   */
  autoTrack?: boolean;

  /**
   * Custom properties to include with every event
   */
  globalProperties?: Record<string, any>;
}

export default function mixpanel(options: MixpanelOptions): AstroIntegration {
  if (!options.token) {
    throw new Error("Mixpanel token is required");
  }

  return {
    name: "astrojs-mixpanel",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        // Inject the Mixpanel initialization script
        const mixpanelConfig = {
          track_pageview: true,
          persistence: "localStorage",
          batch_requests: true,
          debug: false,
          disable_all_events: false,
          disable_notifications: false,
          ...options.config,
        };

        const globalProps = options.globalProperties ? JSON.stringify(options.globalProperties) : "{}";
        const autoTrack = options.autoTrack !== false;

        injectScript(
          "head-inline",
          `
          window.mixpanelConfig = ${JSON.stringify(mixpanelConfig)};
          window.mixpanelToken = "${options.token}";
          window.mixpanelAutoTrack = ${autoTrack};
          window.mixpanelGlobalProperties = ${globalProps};
        `
        );

        // Inject the main Mixpanel client script
        injectScript(
          "page",
          `
          import { initMixpanel } from 'astrojs-mixpanel/client';
          initMixpanel();
        `
        );
      },
    },
  };
}

export { mixpanel };
