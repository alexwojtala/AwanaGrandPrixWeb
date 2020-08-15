import React from 'react';
import Select from 'react-select'

interface PlaceDropdownProps {
    onChangeCallback: Function
}

const PlaceDropdown = ({onChangeCallback}: PlaceDropdownProps) => {

    const options = [
        { value: 1, label: '1st Place' },
        { value: 2, label: '2nd Place' },
        { value: 3, label: '3rd Place' },
        { value: 4, label: '4th Place' }
    ]

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            width: 200,
        })
    }

    return (
        <Select 
            options={options} 
            isSearchable={true}
            autosize={true}
            onChange={(event: any) => onChangeCallback(event)}
            styles={customStyles}
        />
    )
}

export default PlaceDropdown;