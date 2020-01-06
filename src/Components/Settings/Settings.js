import React from 'react';

const SettingsList = ['Audio','Account'];

function Settings() {
    return (
        <ul>
            {SettingsList.map(option => (
                <li key={option}>{option}</li>
            ))}
        </ul>
    );
}
export default Settings;