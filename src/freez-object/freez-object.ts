type BaseType = string | (() => string);

type LeafValue<T> = {
  [key: string]: T | LeafValue<T>
};

export function typedFreeze<T extends LeafValue<BaseType>>(obj: T): Readonly<T> {
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
  // number: 1,
  empty: {},
  uno: "1",
  tres: {
    asd: "uno",
    uno: () => "",
    dos: {
      asd: () => "asd",
    },
  },
} as const);
