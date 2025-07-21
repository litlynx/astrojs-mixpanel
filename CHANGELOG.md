# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-21

### Added

- Initial release of astrojs-mixpanel integration
- Astro.js integration with minimal configuration required
- Automatic page view tracking with SPA support
- Complete TypeScript support with type definitions
- Client-side tracking functions:
  - `track()` - Track custom events
  - `identify()` - Identify users
  - `trackPageView()` - Manual page view tracking
  - `setUserProperties()` - Set user properties
  - `setUserPropertiesOnce()` - Set user properties once
  - `incrementUserProperties()` - Increment user properties
  - `registerGlobalProperties()` - Register global properties
  - `unregisterGlobalProperties()` - Unregister global properties
  - `reset()` - Reset user data
  - `getDistinctId()` - Get distinct ID
  - `alias()` - Alias users
- Comprehensive configuration options
- Global properties support
- Environment variable support
- Example implementation
- Complete documentation

### Features

- **Easy Setup**: Add Mixpanel to Astro.js with minimal configuration
- **Auto Tracking**: Automatic page view tracking with SPA navigation support
- **Type Safety**: Full TypeScript support with intellisense
- **Flexible Config**: Extensive configuration options for advanced use cases
- **Global Properties**: Set properties that are sent with every event
- **User Management**: Complete user identification and property management
- **Environment Support**: Works with environment variables for token management

### Documentation

- Comprehensive README with examples
- API reference documentation
- Configuration guide
- TypeScript usage examples
- E-commerce tracking examples
- Blog/content tracking examples
- Environment variable setup guide
