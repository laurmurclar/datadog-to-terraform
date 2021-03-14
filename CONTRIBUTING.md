Thanks for your interest in contributing! If anything in here is unclear or outdated, please update it too 😄

# Development setup

First, fork this repo

## Chrome

1. Open the [Chrome extension settings](chrome://extensions/)
1. Click `Load unpacked` and select this project

## Firefox

1. Open the [tempory extension settings](about:debugging#/runtime/this-firefox)
1. Click `Load temporary add-on` and select the manifest.json for this project

You should now be able to use the extension as described in the [README](README.md). You'll need to click the refresh button on the extension settings to reload the extension after code changes.

## Testing locally

You can run the tests with

```
yarn test
```

We use Jest. To update the snapshots after making changes, you can run

```
yarn test -u
```

Don't forget to review the updates and make sure only intended changes are included!

# Pull Requests

- _Document any change in behaviour._ Make sure the README and any other relevant documentation are kept up-to-date.
- _Create topic branches._ Don't ask us to pull from your master branch.
- _One pull request per feature._ If you want to do more than one thing, send multiple pull requests.
- _Send coherent history._ Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please squash them before sending them to us.

# How to release (Admin-only)

Only needed for user-facing changes!

1. Bump the version in `manifest.json` and get changes merged to master
1. Create a .zip (`rm app.zip && zip -j app app/*`)
1. Upload it to the Chrome and Firefox stores

### Notes:

- It can take up to an hour for the changes to be reflected in the Chrome Web Store.
- Your browser will automatically update the extension when ready, there's no need to re-download manually from the store.
