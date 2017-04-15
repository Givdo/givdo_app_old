# Givdo App

[![CircleCI](https://circleci.com/gh/Givdo/givdo_app.svg?style=svg)](https://circleci.com/gh/Givdo/givdo_app)

## Getting started
### Installation

> Before proceeding with the installation make sure that [givdo_api_server](https://github.com/Givdo/givdo_api_server) is setup and running.

1) [Install yarn](https://yarnpkg.com/en/docs/install)

2) Clone or update your working copy:

```
$ git clone git@github.com:Givdo/givdo_app.git && cd givdo_app
```

3) Run the following commands to get your environment set up:

```
$ yarn
$ ionic state reset
```

4) Edit `config/development.js` to tune configurations for development.

**Facebook IDs**

| Environment | ID |
| ------------ | ----------------- |
| Production | 536213639869188 |
| Development/Staging | 558889160934969 |


### Running on a simulator

To run the app on a simulator, make sure you have the [server](https://github.com/Givdo/givdo_api_server) running on `localhost:3000`. To start the simulator run:

```
$ ionic run ios
```

### Running on a device

If you want to run on a device, make sure to update the configuration at `www/js/core/constants.js` as described in the section [Installation](#Installation). To start the on a device run:

```
$ ionic run ios
```

### Running the tests

To run the specs, first install the `karma-cli` tool globally.

```
$ npm install -g karma-cli
```

Depending on your setup, you might need to run the above with `sudo`.

Then running the specs should be as simple as:

```
$ karma start karma.conf.js
```

### Troubleshooting

In case of Ionic issues try `ionic state reset`.
