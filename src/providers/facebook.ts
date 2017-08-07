import { Facebook as NativeFacebook } from '@ionic-native/facebook';
import { FacebookService as BrowserFacebook } from 'ngx-facebook';

const switchClass = (mock, native) => {
  const browser = (document.URL.includes('https://') || document.URL.includes('http://'));

  return (browser ? mock : native);
}

export const FacebookProvider = {
  provide: NativeFacebook,
  useClass: switchClass(BrowserFacebook, NativeFacebook),
}
