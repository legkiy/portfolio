class RouterService {
  constructor() {}

  home = '/';

  homeSections = {
    home: '/#home',
    about: '/#about',
    skills: '/#skills',
    projects: '/#projects',
    contact: '/#contact',
  };

  signIn = '/sign-in';

  admin = {
    root: '/admin',
  };
}

const ROUTER_CONFIG = new RouterService();

export default ROUTER_CONFIG;
