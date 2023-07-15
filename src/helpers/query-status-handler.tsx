import { QueryStatus } from "react-query";


interface QuertyStatusHandlerProps {
  errorComponent: JSX.Element;
  loaderComponent: JSX.Element;
  status: QueryStatus;
  successComponent: JSX.Element;
}

export const QuertyStatusHandler = ({
  errorComponent,
  loaderComponent,
  status,
  successComponent,
}: QuertyStatusHandlerProps) :  JSX.Element | null => {
  switch (status) {
    case "loading":
      return loaderComponent;
    case "error":
      return errorComponent;
    case "success":
      return successComponent;
    default:
      return null;
  }
};
