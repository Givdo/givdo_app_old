# Givdo App

[![Build Status](https://semaphoreci.com/api/v1/projects/6e4dc645-8ccc-42af-8e79-720fa7afd1e2/654778/badge.svg)](https://semaphoreci.com/chjunior/givdo_app)

## Getting started
### Installation

**Before proceeding with the installation make sure that [givdo_api_server](https://github.com/Givdo/givdo_api_server) is correctly setup and running.**

1) Clone or update your working copy:

    $ git clone git@github.com:Givdo/givdo_app.git && cd givdo_app

2) Run the following commands to get your environment set up:

    $ npm install
    $ bower install
    $ ionic state reset

3) Edit `www/js/core/constants.js` to tune configurations for development. Update `getApiUrl` to return the address to your development server and switch `appID` to the correct Facebook APPID:

```javascript
function getApiUrl() {
  // change localhost to your machine IP when testing from a real device.
  return (DEBUG) ? 'http://localhost:3000/api/v1' : 'https://api.givdo.com/api/v1';
}
```

**Facebook IDs**

| Environment | ID |
| ------------ | ----------------- |
| Production | 536213639869188 |
| Development/Staging | 558889160934969 |


### Running on a simulator

To run the app on a simulator, make sure you have the [server](https://github.com/Givdo/givdo_api_server) running on `localhost:3000`. To start the simulator run:

    $ ionic run ios

### Running on a device

If you want to run on a device, make sure to update the configuration at `www/js/core/constants.js` as described in the section [Installation](#Installation). To start the on a device run:

    $ ionic run ios

### Running the tests

To run the specs, first install the `karma-cli` tool globally.

    $ npm install -g karma-cli

Depending on your setup, you might need to run the above with `sudo`.

Then running the specs should be as simple as:

    $ karma start karma.conf.js

### Troubleshooting

Ionic issues are usually solved by a simple state reset (`ionic state reset`). That's why it's so important to keep `platforms` git-ignored and any platform specific customization in `config.xml`.
