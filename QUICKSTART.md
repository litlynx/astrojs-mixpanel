# Quick Start Guide

Get up and running with `astrojs-mixpanel` in less than 5 minutes!

## Installation

```bash
npm install astrojs-mixpanel
```

## Basic Setup

1. **Get your Mixpanel token** from your [Mixpanel project settings](https://mixpanel.com/settings/project)

2. **Add the integration to your `astro.config.mjs`:**

```javascript
import { defineConfig } from "astro/config";
import mixpanel from "astrojs-mixpanel";

export default defineConfig({
  integrations: [
    mixpanel({
      token: "YOUR_MIXPANEL_TOKEN", // Replace with your actual token
    }),
  ],
});
```

3. **That's it!** Page views are now automatically tracked.

## Basic Usage

### Track Custom Events

```javascript
import { track } from "astrojs-mixpanel/client";

// Track button clicks
track("Button Clicked", {
  button_name: "Sign Up",
  page: "Landing",
});

// Track form submissions
track("Form Submitted", {
  form_name: "Contact",
  fields_completed: 5,
});
```

### Identify Users

```javascript
import { identify } from "astrojs-mixpanel/client";

// When user logs in
identify("user_123", {
  name: "John Doe",
  email: "john@example.com",
  plan: "premium",
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
    track('Signup Button Clicked');
  });
</script>
```

## Environment Variables

Use environment variables for your token:

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    mixpanel({
      token: import.meta.env.MIXPANEL_TOKEN,
    }),
  ],
});
```

Create a `.env` file:

```env
MIXPANEL_TOKEN=your_mixpanel_token_here
```

## Common Use Cases

### E-commerce Tracking

```javascript
import { track, identify } from "astrojs-mixpanel/client";

// Product page view
track("Product Viewed", {
  product_id: "SKU123",
  product_name: "T-Shirt",
  price: 29.99,
});

// Purchase
track("Purchase Completed", {
  order_id: "ORDER456",
  total: 59.98,
  items: ["SKU123", "SKU456"],
});
```

### User Registration

```javascript
// After successful registration
identify("new_user_id", {
  name: "Jane Smith",
  email: "jane@example.com",
  signup_method: "email",
  plan: "free",
});

track("User Registered", {
  method: "email",
  referrer: document.referrer,
});
```

### Content Engagement

```javascript
// Blog post engagement
track("Article Read", {
  article_title: "Getting Started with Astro",
  reading_time: "5 min",
  scroll_depth: 75,
});
```

## Advanced Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    mixpanel({
      token: "YOUR_TOKEN",
      config: {
        debug: true, // Enable debug mode
        track_pageview: true, // Auto-track page views
        persistence: "localStorage", // Storage method
      },
      autoTrack: true, // Enable auto page tracking
      globalProperties: {
        app_version: "1.0.0",
        environment: "production",
      },
    }),
  ],
});
```

## Troubleshooting

### Events not showing up?

1. Check your Mixpanel token is correct
2. Enable debug mode: `config: { debug: true }`
3. Check browser console for errors
4. Verify events in Mixpanel's Live View

### TypeScript errors?

Make sure you have the correct imports:

```typescript
import { track, identify } from "astrojs-mixpanel/client";
```

### Server-side rendering issues?

All client functions are designed to work safely on both client and server. They automatically detect the environment and only execute on the client.

## Next Steps

- Read the [full documentation](./README.md)
- Check out [examples](./example/)
- Join the [Astro Discord](https://astro.build/chat) `#integrations` channel
- Explore [Mixpanel's documentation](https://docs.mixpanel.com/)

## Support

- 📚 [Full Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/litlynx/astrojs-mixpanel/issues)
- 💬 [Astro Discord](https://astro.build/chat) - `#integrations` channel
