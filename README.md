# Astro.js Mixpanel Integration

A simple and easy-to-use Mixpanel integration for Astro.js with minimal configuration required.

## Features

- 🚀 **Easy Setup**: Add Mixpanel to your Astro.js project with just a few lines of code
- 📊 **Automatic Page Tracking**: Automatically tracks page views with SPA support
- 🎯 **Type-Safe**: Full TypeScript support with type definitions
- 🔧 **Configurable**: Extensive configuration options for advanced use cases
- 📱 **Client-Side**: Lightweight client-side integration
- 🌍 **Global Properties**: Set global properties for all events
- 👤 **User Management**: Built-in user identification and property management

## Installation

```bash
npm install astrojs-mixpanel
```

## Quick Start

1. **Add the integration to your `astro.config.mjs`:**

```javascript
import { defineConfig } from "astro/config";
import mixpanel from "astrojs-mixpanel";

export default defineConfig({
  integrations: [
    mixpanel({
      token: "YOUR_MIXPANEL_TOKEN",
    }),
  ],
});
```

2. **That's it!** Page views will be automatically tracked.

## Usage

### Basic Tracking

```javascript
import { track, identify, setUserProperties } from "astrojs-mixpanel/client";

// Track custom events
track("Button Clicked", {
  button_name: "Sign Up",
  page: "Landing",
});

// Identify users
identify("user123", {
  name: "John Doe",
  email: "john@example.com",
});

// Set user properties
setUserProperties({
  plan: "premium",
  signup_date: new Date().toISOString(),
});
```

### In Astro Components

```astro
---
// MyComponent.astro
---

<button id="signup-btn">Sign Up</button>

<script>
  import { track } from 'astrojs-mixpanel/client';

  document.getElementById('signup-btn')?.addEventListener('click', () => {
    track('Sign Up Button Clicked', {
      source: 'hero_section'
    });
  });
</script>
```

### Advanced Configuration

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import mixpanel from "astrojs-mixpanel";

export default defineConfig({
  integrations: [
    mixpanel({
      token: "YOUR_MIXPANEL_TOKEN",
      config: {
        track_pageview: true,
        persistence: "localStorage",
        batch_requests: true,
        debug: process.env.NODE_ENV === "development",
        api_host: "your-custom-host.com", // Optional
      },
      autoTrack: true, // Enable automatic page view tracking
      globalProperties: {
        app_version: "1.0.0",
        environment: process.env.NODE_ENV,
      },
    }),
  ],
});
```

## Configuration Options

### Integration Options

| Option             | Type      | Default      | Description                            |
| ------------------ | --------- | ------------ | -------------------------------------- |
| `token`            | `string`  | **Required** | Your Mixpanel project token            |
| `config`           | `object`  | `{}`         | Mixpanel configuration options         |
| `autoTrack`        | `boolean` | `true`       | Enable automatic page view tracking    |
| `globalProperties` | `object`  | `{}`         | Properties to include with every event |

### Mixpanel Config Options

| Option               | Type                                   | Default          | Description                  |
| -------------------- | -------------------------------------- | ---------------- | ---------------------------- |
| `track_pageview`     | `boolean`                              | `true`           | Enable page view tracking    |
| `persistence`        | `'localStorage' \| 'cookie' \| 'none'` | `'localStorage'` | Storage method for user data |
| `batch_requests`     | `boolean`                              | `true`           | Batch API requests           |
| `debug`              | `boolean`                              | `false`          | Enable debug mode            |
| `api_host`           | `string`                               | `undefined`      | Custom API host              |
| `disable_all_events` | `boolean`                              | `false`          | Disable all event tracking   |

## API Reference

### Client Functions

#### `track(eventName, properties?)`

Track a custom event with optional properties.

```javascript
import { track } from "astrojs-mixpanel/client";

track("Purchase Completed", {
  item_id: "SKU123",
  price: 29.99,
  currency: "USD",
});
```

#### `identify(userId, properties?)`

Identify a user and optionally set user properties.

```javascript
import { identify } from "astrojs-mixpanel/client";

identify("user_123", {
  name: "John Doe",
  email: "john@example.com",
});
```

#### `setUserProperties(properties)`

Set user properties.

```javascript
import { setUserProperties } from "astrojs-mixpanel/client";

setUserProperties({
  subscription_tier: "premium",
  last_login: new Date().toISOString(),
});
```

#### `trackPageView(properties?)`

Manually track a page view with optional properties.

```javascript
import { trackPageView } from "astrojs-mixpanel/client";

trackPageView({
  section: "blog",
  category: "technology",
});
```

#### `registerGlobalProperties(properties)`

Register properties that will be sent with every event.

```javascript
import { registerGlobalProperties } from "astrojs-mixpanel/client";

registerGlobalProperties({
  app_version: "2.0.0",
  user_type: "premium",
});
```

#### `reset()`

Reset user data (useful for logout).

```javascript
import { reset } from "astrojs-mixpanel/client";

reset();
```

#### `getDistinctId()`

Get the current user's distinct ID.

```javascript
import { getDistinctId } from "astrojs-mixpanel/client";

const userId = getDistinctId();
```

## Examples

### E-commerce Tracking

```javascript
import { track, identify, setUserProperties } from "astrojs-mixpanel/client";

// Track product views
track("Product Viewed", {
  product_id: "SKU123",
  product_name: "Awesome T-Shirt",
  category: "Clothing",
  price: 29.99,
});

// Track purchases
track("Purchase Completed", {
  order_id: "ORDER456",
  total: 59.98,
  items: ["SKU123", "SKU456"],
  payment_method: "credit_card",
});

// Track user registration
identify("user_789", {
  name: "Jane Smith",
  email: "jane@example.com",
  signup_method: "google",
});
```

### Blog/Content Tracking

```javascript
import { track, registerGlobalProperties } from "astrojs-mixpanel/client";

// Set global context
registerGlobalProperties({
  site_section: "blog",
  content_type: "article",
});

// Track article engagement
track("Article Read", {
  article_title: "Getting Started with Astro.js",
  author: "John Doe",
  reading_time: "5 min",
  scroll_depth: 75,
});
```

### SPA Navigation Tracking

The integration automatically tracks page views in single-page application scenarios, but you can also manually track navigation:

```javascript
import { trackPageView } from "astrojs-mixpanel/client";

// Custom navigation tracking
function navigateToPage(page) {
  // Your navigation logic
  window.history.pushState({}, "", page);

  // Track the navigation
  trackPageView({
    navigation_type: "manual",
    previous_page: document.referrer,
  });
}
```

## Environment Variables

You can use environment variables for your Mixpanel token:

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import mixpanel from "astrojs-mixpanel";

export default defineConfig({
  integrations: [
    mixpanel({
      token: import.meta.env.MIXPANEL_TOKEN || process.env.MIXPANEL_TOKEN,
      config: {
        debug: import.meta.env.DEV,
      },
    }),
  ],
});
```

Then create a `.env` file:

```env
MIXPANEL_TOKEN=your_mixpanel_token_here
```

## TypeScript Support

This package includes full TypeScript support. All functions are properly typed, and you'll get intellisense and type checking out of the box.

```typescript
import { track, identify } from "astrojs-mixpanel/client";

// TypeScript will enforce proper types
track("Event Name", {
  string_prop: "value",
  number_prop: 42,
  boolean_prop: true,
});

identify("user_id", {
  name: "John Doe",
  age: 30,
});
```

## Browser Support

This integration works in all modern browsers that support ES2022. The Mixpanel browser library handles older browser compatibility internally.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License. See [LICENSE](./LICENSE) for more information.

## Support

- [Mixpanel Documentation](https://docs.mixpanel.com/)
- [Astro.js Documentation](https://docs.astro.build/)

## Changelog

### 1.0.0

- Initial release
- Basic Mixpanel integration
- Automatic page view tracking
- TypeScript support
- Full API coverage
