import "./_select-with-search.scss";
import { ReactNode, useLayoutEffect, useState } from "react";
import { useWindowSize } from "../../use-window-size";
import { Loupe } from "../icons";

export interface DataShape {
  additionalInfo: string;
  decorator?: string;
  id: string;
  name: string;
}

interface SelectWithSearchProps {
  buttonRef: any;
  data: Array<DataShape> | undefined;
  filterBy: keyof DataShape;
  handleSelect: (value: any) => void;
  isOpen: boolean;
  openComponent: ReactNode;
}

export const SelectWithSearch = ({
  buttonRef,
  data,
  filterBy,
  handleSelect,
  isOpen,
  openComponent,
}: SelectWithSearchProps) => {
  const [search, setSearch] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState(data);
  const size = useWindowSize();
  const [adjustSelectPosition, setAdjustSelectPosition] = useState(0);

  const filterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    const inputValue = e.target.value;
    if (data) {
      const newData = data.filter((item: DataShape) =>
        item[filterBy]?.includes(inputValue)
      );

      setSearch(inputValue);
      setDataToDisplay(newData);
    }
  };

  useLayoutEffect(() => {
    const element = buttonRef.current;
    if (element) {
      setAdjustSelectPosition(element.getBoundingClientRect().bottom);
    }
  }, [isOpen, size, buttonRef]);

  return (
    <div>
      {openComponent}
      {isOpen && (
        <div className="options-wrapper" style={{ top: adjustSelectPosition }}>
          <>
            <div className="search-wrapper">
              <Loupe className="loupe"/>
              <input
                className="search"
                onChange={filterInput}
                placeholder="Search"
                type="text"
                value={search}
              />
            </div>
            {dataToDisplay?.map((item: DataShape) => (
              <button
                className="option"
                key={item.id}
                onClick={() => handleSelect(item)}
                value={item.id}
              >
                {item?.decorator && (
                  <div
                    className="decorator"
                    style={{
                      backgroundImage: `url(${item.decorator})`,
                    }}
                  />
                )}
                <span className="name">{item.name}</span>
                <span className="additional-info">{item.additionalInfo}</span>
              </button>
            ))}
          </>
        </div>
      )}
    </div>
  );
};
