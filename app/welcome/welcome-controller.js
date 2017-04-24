export default class WelcomeController {
  constructor($state, $ionicPopup) {
    this.state = $state;
    this.popup = $ionicPopup;
    this.isLoading = false;
  }

  success() {
    this.state.go('profile');
  }

  error(response) {
    let options = {
      title: 'Oops!',
      template: 'There was an error while signing in. Try again later.',
    };

    if (response.data)
      options.template = response.data.error;

    this.popup
      .alert(options)
      .then(() => this.isLoading = true);
  }

  signIn() {
    this.isLoading = true;
  }
};
