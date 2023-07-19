export type ConcreteType<T> = {
    [P in keyof T]-?: T[P];
  };