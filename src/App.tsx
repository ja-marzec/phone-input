import { useRef, useState } from 'react';
import css from './app.module.scss';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { ConcreteType, writePhoneNumber } from './helpers';
import { DataShape, SelectWithSearch } from './ui/select-with-search';
import { fetchCountries } from './api/fetch-country';
import { Modal } from './ui/modal';
import { TriggerButton } from './trigger-button';

export interface Country {
  dialCode: string;
  flag: string;
  name: string;
}

const initalCountry: Country = {
  dialCode: '+48',
  flag: 'https://flagsapi.com/PL/flat/48.png',
  name: 'Poland',
};

export const App = () => {
  const { status, data } = useQuery(['countries'], fetchCountries, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(initalCountry);
  const [phoneNumber, setPhoneNumber] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleModalOpen = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const selectCountry = (country: ConcreteType<DataShape>): void => {
    setSelectedCountry({
      name: country.name,
      dialCode: country.additionalInfo,
      flag: country.decorator,
    });
    setIsCountryListOpen(false);
  };

  const closeList = (e: any): void => {
    if (!isCountryListOpen) {
      return;
    }
    if (
      !e.target.classList[0]?.includes('option') &&
      !e.target.classList[0]?.includes('search')
    ) {
      setIsCountryListOpen(false);
    }
  };

  const cancel = (): void => {
    setSelectedCountry(initalCountry);
    setPhoneNumber('');
  };

  const save = (): void => {
    setIsModalOpen(false);
  };

  const onModalClose = (): void => {
    setIsModalOpen(false);
    setIsCountryListOpen(false);
  };

  return (
    <div className={css.app}>
      <button className={css.modalOpen} onClick={toggleModalOpen}>
        Open modal
      </button>
      <Modal isOpen={isModalOpen} handleClose={onModalClose}>
        <div onClick={closeList}>
          <h3 className={css.title}>Change phone number</h3>
          <span className={css.label}>Provide new phone number</span>
          <div className={css.inputs}>
            <SelectWithSearch
              buttonRef={buttonRef}
              data={data?.map((item: Country) => ({
                name: item.name,
                decorator: item.flag,
                id: item.dialCode,
                additionalInfo: item.dialCode,
              }))}
              filterBy='name'
              handleSelect={selectCountry}
              isOpen={isCountryListOpen}
              openComponent={
                <TriggerButton
                  buttonRef={buttonRef}
                  isCountryListOpen={isCountryListOpen}
                  selectedCountry={selectedCountry}
                  status={status}
                  openSelect={
                    status === 'loading'
                      ? undefined
                      : () => setIsCountryListOpen(true)
                  }
                />
              }
            />
            <input
              className={css.numberInput}
              onChange={(e) => writePhoneNumber(e, setPhoneNumber)}
              placeholder='000-000-000'
              type='text'
              value={phoneNumber}
            />
          </div>

          <div className={css.actions}>
            <button
              className={classNames(css.button, css.cancel)}
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className={classNames(css.button, css.save)}
              type='submit'
              onClick={save}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
