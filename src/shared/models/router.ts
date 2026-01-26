class RouterService {
  constructor() {}

  home = '/';

  homeSections = {
    about: '#about',
    skills: '#skills',
    projects: '#projects',
    contact: '#contact',
  };
}

const ROUTER_CONFIG = new RouterService();

export default ROUTER_CONFIG;
