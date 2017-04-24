import { expect } from 'chai';
import { spy, stub } from 'sinon';

import WelcomeController from './welcome-controller';

describe('WelcomeController', () => {
  var state, controller, popup;

  beforeEach(() => {
    state = {};
    popup = {};
    controller = new WelcomeController(state, popup);
  });

  it('is not initially loading', () => {
    expect(controller.isLoading).to.equal(false);
  });

  describe('.success', () => {
    it('redirects to users profile', () => {
      state.go = spy();

      controller.success();

      expect(state.go.calledWith('profile')).to.equal(true);
    });
  });

  describe('.error', () => {
    it('displays a popup with error details', () => {
      let response = {
        data: {
          error: 'Some message',
        }
      };

      popup.alert = stub().resolves();

      controller.error(response);

      expect(popup.alert.called).to.equal(true);
    });
  });

  describe('.signIn', () => {
    it('sets isLoading to true', () => {
      controller.signIn();

      expect(controller.isLoading).to.equal(true);
    });
  });
});
