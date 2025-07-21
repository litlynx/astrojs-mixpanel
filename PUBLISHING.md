# Publishing Guide

This guide explains how to publish the `astrojs-mixpanel` integration to NPM and get it featured in the Astro integrations library.

## Prerequisites

1. **NPM Account**: Make sure you have an NPM account and are logged in:

   ```bash
   npm login
   ```

2. **Build the Package**: Ensure the package is built and ready:

   ```bash
   npm run build
   ```

## Publishing to NPM

1. **Version Check**: Make sure the version in `package.json` is correct
2. **Build**: Run the build command to compile TypeScript
3. **Publish**: Publish to NPM

```bash
# Clean and build
npm run clean
npm run build

# Publish to NPM
npm publish
```

## Astro Integrations Library Compliance

Our package follows all the required guidelines for the Astro integrations library:

### ✅ Required Keywords

- `astro-component` ✅
- `withastro` ✅

### ✅ Category Keywords

- `analytics` ✅ (will categorize under "Analytics")

### ✅ Required package.json Fields

- `name` ✅
- `description` ✅
- `repository` ✅
- `homepage` ✅
- `bugs` ✅

### ✅ Additional Keywords for Discoverability

- `astro` ✅
- `astrojs` ✅
- `mixpanel` ✅
- `integration` ✅

## What Happens After Publishing

1. **Automatic Discovery**: The Astro integrations library automatically scans NPM weekly for packages with the required keywords
2. **Categorization**: Our package will appear in the "Analytics" category due to the `analytics` keyword
3. **Information Display**: The library will display:
   - Package name: `astrojs-mixpanel`
   - Description: "A simple and easy-to-use Mixpanel integration for Astro.js with minimal configuration"
   - Repository link: GitHub repository
   - Homepage link: README

## Optional: Adding a Custom Avatar

After publishing, you can add a custom avatar to make your integration stand out:

1. File a GitHub issue on the Astro repository
2. Attach your avatar image
3. The Astro team will add it to your listing

## Optional: Custom Information Override

If you need to override any information that the library reads from NPM:

1. File an issue on the Astro repository
2. Provide the updated information (custom name, description, or homepage)
3. The team will ensure the custom information is used

## Publishing Checklist

Before publishing, make sure:

- [ ] Version number is correct in `package.json`
- [ ] All required keywords are present
- [ ] Repository and homepage URLs are correct
- [ ] Package builds successfully (`npm run build`)
- [ ] README.md is comprehensive and up-to-date
- [ ] LICENSE file is present
- [ ] All TypeScript files compile without errors
- [ ] Example usage is documented

## Version Management

For future updates:

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major

# Then publish
npm publish
```

## Community Engagement

Consider joining the Astro Discord server:

- Channel: `#integrations`
- Get help building integrations
- Meet other integration builders
- Share your work with the community

## Monitoring

After publishing:

1. Monitor NPM download statistics
2. Watch for GitHub issues and feedback
3. Keep the integration updated with new Astro versions
4. Consider community feature requests

Your integration will appear in the Astro integrations library within a week of publishing to NPM!
