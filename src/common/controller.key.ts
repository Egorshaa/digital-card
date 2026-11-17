class _controller {
  constructor(private readonly prefix: string) {}

  generate = (path: string) => `${this.prefix}/${path}`;
}

class Profile extends _controller {
  root = 'profile';
  links = this.generate('links');
  skills = this.generate('skills');
  experience = this.generate('experience');
  projects = this.generate('projects');
}

class Ping extends _controller {
  status = 'ping';
}

class Controller {
  profile = new Profile(Profile.name.toLowerCase());
  ping = new Ping(Ping.name.toLowerCase());
}

export const controllerKey = new Controller();
