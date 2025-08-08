type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

export class EventEmitter<T extends EventMap> {
  private events: { [K in keyof T]?: Array<EventReceiver<T[K]>> } = {};

  public on<K extends EventKey<T>>(event: K, callback: EventReceiver<T[K]>): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]?.push(callback);
    return this;
  }

  public off<K extends EventKey<T>>(event: K, callback: EventReceiver<T[K]>): this {
    if (!this.events[event]) return this;

    this.events[event] = this.events[event]?.filter((cb) => cb !== callback);
    return this;
  }

  public emit<K extends EventKey<T>>(event: K, params: T[K]): this {
    this.events[event]?.forEach((callback) => {
      try {
        callback(params);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
    return this;
  }

  public removeAllListeners(event?: EventKey<T>): this {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }
}