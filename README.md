# Givdo App

[![Build Status](https://semaphoreci.com/api/v1/projects/6e4dc645-8ccc-42af-8e79-720fa7afd1e2/654778/badge.svg)](https://semaphoreci.com/chjunior/givdo_app)

## Work Flow

After cloning or updating your working copy, run the following to get your environment up to date:

```
$ npm install
$ ionic state reset
```

## Running on a simulator

To run the app on a simulator, make sure you have the backend (https://github.com/Givdo/givdo_api_server) running on localhost, port 3000, then run the following:

```bash
$ ionic run ios
```

## Running on a device

If you want to run on a device, make sure to update the `givdo.config.js` file with the IP host where the backend will be running, then plug your device and run:

```bash
$ ionic run ios
```

## Running the tests

To run the specs, first install the `karma-cli` tool globally.

```bash
$ npm install -g karma-cli
```

Depending on your setup, you might need to run the above with `sudo`.

Then running the specs should be as siple as:

```bash
$ karma start karma.conf.js
```

## Troubleshooting

Ionic issues are usually solved by a simple state reset (`ionic state reset`). That's why it's so important to keep `platforms` git-ignored and any platform specific customization in `config.xml`.
