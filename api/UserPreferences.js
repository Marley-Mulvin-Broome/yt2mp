const storage = require('electron-json-storage');
const { app } = require('electron');
const path = require('path');

const dataPath = path.join(app.getPath('userData'), 'ytmp');

const setupStorage = () => {
    storage.setDataPath(dataPath);
}

const getUserPreferences = () => {
    return new Promise((resolve, reject) => {
        storage.get('userPreferences', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

const userPreferenceExists = (key) => {
    return new Promise((resolve, reject) => {
        storage.has('userPreferences', (error, hasKey) => {
            if (error) {
                reject(error);
            } else {
                resolve(hasKey);
            }
        });
    });
};

const getUserPreference = (key) => {
    return new Promise((resolve, reject) => {
        storage.get('userPreferences', (error, data) => {
            if (error) {
                reject(error);
            } else {
                console.log(data);;
                resolve(data[key]);
            }
        });
    });
}

const setUserPreference = (key, value) => {
    return new Promise((resolve, reject) => {
        storage.set('userPreferences', { [key]: value }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    setupStorage,
    getUserPreferences,
    userPreferenceExists,
    getUserPreference,
    setUserPreference
}