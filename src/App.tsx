import "./_app.scss";
import { Country, fetchCountries } from "./api/fetch-country";
import { DataShape, SelectWithSearch  } from "./ui/select-with-search";
import { Loader } from "./ui";
import { Modal } from "./ui/modal";
import { QuertyStatusHandler, writePhoneNumber } from "./helpers";
import { QueryStatus, useQuery } from "react-query";
import { useRef, useState } from "react";
import { Arrow } from "./ui/icons";

interface TriggerButtonProps {
  buttonRef: any;
  isCountryListOpen: boolean;
  openSelect: (() => void) | undefined;
  selectedCountry: Country;
  status: QueryStatus;
}

const TriggerButton = ({
  buttonRef,
  isCountryListOpen,
  openSelect,
  selectedCountry,
  status,
}: TriggerButtonProps) => {
  return (
    <button
    className={`select-country ${
      isCountryListOpen && "select-country--active"
    }`}
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
              className="flag"
              style={{
                backgroundImage: `url(${selectedCountry.flag})`,
              }}
            />
            <span className="dial-code">{selectedCountry.dialCode}</span>
            <Arrow className={`button-arrow ${isCountryListOpen && 'button-arrow--rotate'}`} />
          </>
        }
      />
    </button>
  );
};

const initalCountry: Country = {
  dialCode: "+48",
  flag: "https://flagsapi.com/PL/flat/48.png",
  name: "Poland",
};

export const App = () => {
  const { status, data } = useQuery(["countries"], fetchCountries, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(initalCountry);
  const [phoneNumber, setPhoneNumber] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleModalOpen = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const selectCountry = (country: DataShape): void => {
    setSelectedCountry({
      name: country.name,
      dialCode: country.additionalInfo,
      flag: country.decorator,
    });
    setIsCountryListOpen(false);
  };

  const closeOnClickOutside = (target: HTMLDivElement): void => {
    if (!isCountryListOpen) {
      return;
    }
    if (
      !target.classList.contains("option") &&
      !target.classList.contains("search")
    ) {
      setIsCountryListOpen(false);
    }
  };

  const cancel = (): void => {
    setSelectedCountry(initalCountry);
    setPhoneNumber("");
  };

  const save = (): void => {
    setIsModalOpen(false);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setIsCountryListOpen(false);
  };

  return (
    <div className="app">
      <button className="modal-open" onClick={toggleModalOpen}>
        Open modal
      </button>
      <Modal isOpen={isModalOpen} handleClose={onModalClose}>
        <div onClick={(e) => closeOnClickOutside(e.target as HTMLDivElement)}>
          <h3 className="title">Change phone number</h3>
          <span className="label">Provide new phone number</span>
          <div className="inputs">
            <SelectWithSearch
              buttonRef={buttonRef}
              data={data?.map((item) => ({
                name: item.name,
                decorator: item.flag,
                id: item.dialCode,
                additionalInfo: item.dialCode,
              }))}
              filterBy="name"
              handleSelect={selectCountry}
              isOpen={isCountryListOpen}
              openComponent={
                <TriggerButton
                  buttonRef={buttonRef}
                  isCountryListOpen={isCountryListOpen}
                  selectedCountry={selectedCountry}
                  status={status}
                  openSelect={
                    status === "loading"
                      ? undefined
                      : () => setIsCountryListOpen(true)
                  }
                />
              }
            />
            <input
              className="number-input"
              onChange={(e) => writePhoneNumber(e, setPhoneNumber)}
              placeholder="000-000-000"
              type="text"
              value={phoneNumber}
            />
          </div>

          <div className="actions">
            <button className="button cancel" onClick={cancel}>
              Cancel
            </button>
            <button className="button save" type="submit" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
