import { QueryStatus } from "react-query";
import css from "./trigger-button.module.scss";
import classNames from "classnames";
import { Country } from "../App";
import { QuertyStatusHandler } from "../api/query-status-handler";
import { Loader } from "../ui/loader";
import { Arrow } from "../ui/icons";

interface TriggerButtonProps {
  buttonRef: any;
  isCountryListOpen: boolean;
  openSelect: (() => void) | undefined;
  selectedCountry: Country;
  status: QueryStatus;
}

export const TriggerButton = ({
  buttonRef,
  isCountryListOpen,
  openSelect,
  selectedCountry,
  status,
}: TriggerButtonProps) => {
  return (
    <button
      className={classNames(
        css.selectCountry,
        isCountryListOpen && css.selectCountryActive
      )}
      ref={buttonRef}
      onClick={openSelect}
      value={selectedCountry.dialCode}
    >
      <QuertyStatusHandler
        errorComponent={<span> Try again later</span>}
        loaderComponent={<Loader />}
        status={status}
        successComponent={
          <>
            <span
              className={css.flag}
              style={{
                backgroundImage: `url(${selectedCountry.flag})`,
              }}
            />
            <span className={css.dialCode}>{selectedCountry.dialCode}</span>
            <Arrow
              className={classNames(
                css.buttonArrow,
                isCountryListOpen && css.buttonArrowRotate
              )}
            />
          </>
        }
      />
    </button>
  );
};
