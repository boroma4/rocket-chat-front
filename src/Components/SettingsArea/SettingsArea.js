import React from 'react';

const SettingsList = ['Sound','Volume'];

function SettingsArea({type}) {
    return (
        <ul>
            {SettingsList.map(option => (
                <li key={option}>{option}</li>
            ))}
        </ul>
    );
}
export default SettingsArea;