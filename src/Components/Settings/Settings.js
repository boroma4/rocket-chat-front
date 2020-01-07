import React from 'react';

const SettingsList = ['Audio','Account'];

function Settings({onSelectOpt}) {
    const clickHandler = () => {
      onSelectOpt('a');
    };
    return (
        <ul>
            {SettingsList.map(option => (
                <li onClick={clickHandler} key={option}>{option}</li>
            ))}
        </ul>
    );
}
export default Settings;