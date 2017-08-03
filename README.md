# Givdo App

[![CircleCI](https://circleci.com/gh/Givdo/givdo_app.svg?style=svg)](https://circleci.com/gh/Givdo/givdo_app)

## Getting started
### Installation

> Before proceeding with the installation make sure that [givdo_api_server](https://github.com/Givdo/givdo_api_server) is setup and running.

1) Make sure you have all project dependencies installed.

- Git
- Node
- Ionic 2
- NPM

2) Clone the repository to your machine:

```
$ git clone git@github.com:Givdo/givdo_app.git && cd givdo_app
```

3) Install npm dependencies and reset ionic's state:

```
$ npm install
$ ionic state reset
```

### Running on a simulator

1) Make sure you have the [server](https://github.com/Givdo/givdo_api_server) running on `localhost:3000` and start the simulator:

```
# iOS simulator
$ ionic run ios

# Android simulator
$ ionic run android
```

### Troubleshooting

In case of Ionic issues try `ionic state reset`.
