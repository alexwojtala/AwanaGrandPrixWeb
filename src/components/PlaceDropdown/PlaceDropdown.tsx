import React from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: number;
}

interface PlaceDropdownProps {
  onChangeCallback: (place: number) => void;
}

const PlaceDropdown = ({
  onChangeCallback,
}: PlaceDropdownProps): JSX.Element => {
  const options = [
    { value: 1, label: "1st Place" },
    { value: 2, label: "2nd Place" },
    { value: 3, label: "3rd Place" },
    { value: 4, label: "4th Place" },
  ];

  const customStyles = {
    // eslint-disable-next-line
    control: (provided: any) => ({
      ...provided,
      width: 200,
    }),
  };

  return (
    <Select
      options={options}
      isSearchable={true}
      autosize={true}
      onChange={(e) => onChangeCallback((e as Option).value)}
      styles={customStyles}
    />
  );
};

export default PlaceDropdown;
