Thanks for your interest in contributing! If anything in here is unclear or outdated, please update it too 😄

# Development setup
1. Clone this repo
1. Open the [Chrome extension settings](chrome://extensions/)
1. Click `Load unpacked` and select this project

You should now be able to use the extension as described in the [README](README.md). You'll need to click the refresh button on the extension settings to reload the extension after code changes.

# Pull Requests
- *Document any change in behaviour.* Make sure the README and any other relevant documentation are kept up-to-date.
- *Create topic branches.* Don't ask us to pull from your master branch.
- *One pull request per feature.* If you want to do more than one thing, send multiple pull requests.
- *Send coherent history.* Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please squash them before sending them to us.

# How to release
Only needed for user-facing changes!
1. Bump the version in `manifest.json` and get changes merged to master
1. Create a new release on the Github repo, tagged with the new version (this triggers the deployment)

### Notes:
- If you don't bump the version in `manifest.json`, the upload to the Chrome Web Store will fail. It will look like everything passed in CircleCI until you dig into the logs of the "Publish" step.
- It can take up to an hour for the changes to be reflected in the Chrome Web Store.
- Your browser will automatically update the extension when ready, there's no need to re-download manually from the store.
