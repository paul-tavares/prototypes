import { LoggerFactory } from '@kbn/logging';

interface PrototypesServerRuntimeStartOptions {
  logFactory: LoggerFactory;
}

class PrototypesServerRuntime {
  private startOptions: PrototypesServerRuntimeStartOptions | undefined = undefined;

  async start(options: PrototypesServerRuntimeStartOptions): Promise<void> {
    this.startOptions = options;
  }

  async stop(): Promise<void> {
    this.startOptions = undefined;
  }

  private throwStartedError(service?: keyof PrototypesServerRuntimeStartOptions): never {
    throw new Error(
      `PrototypesServerRuntime has not been start()'ed.${
        service ? ` Attempted to access [${service}]` : ''
      }`
    );
  }

  public get<T extends keyof PrototypesServerRuntimeStartOptions>(
    service: T
  ): PrototypesServerRuntimeStartOptions[T] {
    const { startOptions } = this;

    if (!startOptions || !startOptions[service]) {
      this.throwStartedError(service);
    }

    return startOptions[service];
  }
}

export const runtime = new PrototypesServerRuntime();
