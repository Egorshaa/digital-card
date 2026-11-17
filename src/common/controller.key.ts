class _controller {
  constructor(private readonly prefix: string) {}

  generate = (path: string) => `${this.prefix}.${path}`;
}

class Ping extends _controller {
  status = 'ping';
}

class Controller {
  ping = new Ping(Ping.name.toLowerCase());
}

export const controllerKey = new Controller();
