import config from 'config';

class WelcomeController {
  constructor($state, $ionicPopup) {
    this.$state = $state;
    this.$popup = $ionicPopup;
    this.isLoading = false;

    this.api = config.api;
  }

  success() {
    this.$state.go('profile');
  }

  error(response) {
    let options = {
      title: 'Oops!',
      template: 'There was an error while signing in. Try again later.',
    };

    if (response.data)
      options.template = error.data.error;

    this.popup
      .alert(options)
      .then(() => this.isLoading = true);
  }

  facebookSignIn() {
    this.isLoading = true;

    auth
      .facebookSignIn()
      .then(this.success)
      .catch(this.error)
  }
}

WelcomeController.$inject = ['$state', '$ionicPopup'];

export default WelcomeController;
