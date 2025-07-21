import mixpanel from "mixpanel-browser";

declare global {
  interface Window {
    mixpanelConfig?: any;
    mixpanelToken?: string;
    mixpanelAutoTrack?: boolean;
    mixpanelGlobalProperties?: Record<string, any>;
    mixpanel?: typeof mixpanel;
  }
}

/**
 * Initialize Mixpanel with the configuration from the integration
 */
export function initMixpanel(): void {
  if (typeof window === "undefined") {
    return; // Skip on server-side
  }

  const token = window.mixpanelToken;
  const config = window.mixpanelConfig || {};
  const autoTrack = window.mixpanelAutoTrack !== false;
  const globalProperties = window.mixpanelGlobalProperties || {};

  if (!token) {
    console.warn("Mixpanel token not found. Make sure to configure the integration properly.");
    return;
  }

  // Initialize Mixpanel
  mixpanel.init(token, config);

  // Make mixpanel available globally
  window.mixpanel = mixpanel;

  // Register global properties if provided
  if (Object.keys(globalProperties).length > 0) {
    mixpanel.register(globalProperties);
  }

  // Auto-track page views if enabled
  if (autoTrack) {
    trackPageView();

    // Listen for navigation events (for SPA-like behavior)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      setTimeout(trackPageView, 0);
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      setTimeout(trackPageView, 0);
    };

    window.addEventListener("popstate", () => {
      setTimeout(trackPageView, 0);
    });
  }
}

/**
 * Track a page view event
 */
export function trackPageView(properties?: Record<string, any>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  const pageProperties = {
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title,
    ...properties,
  };

  window.mixpanel.track("Page View", pageProperties);
}

/**
 * Track a custom event
 */
export function track(eventName: string, properties?: Record<string, any>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.track(eventName, properties);
}

/**
 * Identify a user
 */
export function identify(userId: string, properties?: Record<string, any>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.identify(userId);

  if (properties) {
    window.mixpanel.people.set(properties);
  }
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.people.set(properties);
}

/**
 * Set user properties once (won't overwrite existing values)
 */
export function setUserPropertiesOnce(properties: Record<string, any>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.people.set_once(properties);
}

/**
 * Increment user properties
 */
export function incrementUserProperties(properties: Record<string, number>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.people.increment(properties);
}

/**
 * Register global properties for all events
 */
export function registerGlobalProperties(properties: Record<string, any>): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.register(properties);
}

/**
 * Unregister global properties
 */
export function unregisterGlobalProperties(propertyNames: string[]): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  propertyNames.forEach((name) => {
    window.mixpanel!.unregister(name);
  });
}

/**
 * Reset user data (useful for logout)
 */
export function reset(): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.reset();
}

/**
 * Get the distinct ID
 */
export function getDistinctId(): string | undefined {
  if (typeof window === "undefined" || !window.mixpanel) {
    return undefined;
  }

  return window.mixpanel.get_distinct_id();
}

/**
 * Alias a user (connect anonymous user to identified user)
 */
export function alias(alias: string, original?: string): void {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  window.mixpanel.alias(alias, original);
}

// Export the mixpanel instance for advanced usage
export { mixpanel };
