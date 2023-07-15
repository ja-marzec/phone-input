import { createPortal } from "react-dom";
import { ReactNode, useLayoutEffect, useState } from "react";

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const Portal = ({
  children,
  wrapperId = "portal-wrapper",
}: {
  children: ReactNode;
  wrapperId?: string;
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );
  useLayoutEffect(() => {
    let systemCreated = false;
    let element = document.getElementById(wrapperId);

    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element!.parentNode) {
        element!.parentNode.removeChild(element as HTMLElement);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
