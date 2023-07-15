type EmptyObj = Record<string, never>;
type BaseType = string | (() => string);

type NonEmptyObject<T> = {
  [K in keyof T]-?: T[K] | NonEmptyObject<T[K]>;
};

type LeafValue<T> = {
  [key: string]: T | LeafValue<T> ;
};

export function typedFreeze<T extends LeafValue<BaseType>>(obj: NonEmptyObject<T>): Readonly<T> {
  const recursivelyFreeze = (obj: any) => {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      return obj;
    }
    const frozenObj: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      frozenObj[key] = recursivelyFreeze(obj[key]);
    });

    return Object.freeze(frozenObj);
  };

  return recursivelyFreeze(obj) as Readonly<T>;
}

const a = typedFreeze({
  asd: "uno",
  dupa: {},
  tres: {
    asd: "uno",
    uno: () => "",
    dos: {
      asd: () => "asd",
    },
  },
} as const);
