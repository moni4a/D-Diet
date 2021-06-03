import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const domain = 'https://d-diet.herokuapp.com';

const options = {
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
    }
}

function getFileUri(path) {
    return FileSystem.documentDirectory + path;
}

export default class API {
    static login(credentials, success, failure) {
        fetch(`${domain}/auth/login`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(({ email, token, role }) => {
                options.headers['Authorization'] = 'Bearer ' + token;
                success({ email, role });
            })
            .catch(({ message }) => failure(message))
    }

    static registerDoctor(values, success, failure) {
        fetch(`${domain}/auth/registerDoctor`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(({ email, token, role }) => {
                options.headers['Authorization'] = 'Bearer ' + token;
                success({ email, role });
            })
            .catch(({ message }) => failure(message))
    }

    static registerPatient(values, success, failure) {
        fetch(`${domain}/auth/registerPatient`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(({ email, token, role }) => {
                options.headers['Authorization'] = 'Bearer ' + token;
                success({ email, role });
            })
            .catch(({ message }) => failure(message))
    }

    static logout(success, failure) {
        fetch(`${domain}/auth/logout`, {
            ...options,
            method: 'POST'
        })
            .then(() => {
                delete options.headers['Authorization'];
                success();
            })
            .catch(({ message }) => failure(message))
    }

    static getProducts(success, failure) {
        fetch(`${domain}/product`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getPatients(search, success, failure) {
        fetch(`${domain}/userInfo/getPatients` + (!!search ? `?search=${search}` : ''), options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getPatientsRequests(success, failure) {
        fetch(`${domain}/userInfo/getPatientsRequests`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getUserInfo(success, failure) {
        fetch(`${domain}/userInfo/getUserInfo`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getDoctorsInfo(search, success, failure) {
        fetch(`${domain}/userInfo/getDoctorsInfo` + (!!search ? `?search=${search}` : ''), options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getMyDoctorsInfo(success, failure) {
        fetch(`${domain}/userInfo/getMyDoctorsInfo`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getPatientsRequests(success, failure) {
        fetch(`${domain}/userInfo/getPatientsRequests`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getAllInfo(success, failure) {
        fetch(`${domain}/userInfo/getAllInfo`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static saveMeal(body, success, failure) {
        fetch(`${domain}/mealReport/addMeal`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static addGlycemiaResult(body, success, failure) {
        fetch(`${domain}/glycemiaReport/addGlycemiaResult`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getDayRecords(success, failure) {
        fetch(`${domain}/mealReport/today`, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getDayGlycemia(success, failure) {
        fetch(`${domain}/glycemiaReport/today`, options)
            .then(res => res.json())
            .then(({ glycemiaRecords }) => success(glycemiaRecords))
            .catch(({ message }) => failure(message))
    }

    static generateReport({ dateFrom, dateTo }, success, failure) {
        fetch(`${domain}/report/generateReport?from=${dateFrom}&to=${dateTo}`, options)
            .then((res) => res.json())
            .then(async ({ filename, content }) => {
                const fileUri = getFileUri(filename);
                await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
                await Sharing.shareAsync(fileUri);
                success('O.K.');
            })
            .catch(({ message }) => failure(message))
    }

    static createDoctorPermissionAccess(body, success, failure) {
        fetch(`${domain}/patientDoctorAccess/create`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static grantPatientDoctorAccess(body, success, failure) {
        fetch(`${domain}/patientDoctorAccess/authorize`, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static cancelDoctorPermissionAccess(body, success, failure) {
        fetch(`${domain}/patientDoctorAccess/delete`, {
            ...options,
            method: 'DELETE',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static deletePatientRequest(body, success, failure) {
        fetch(`${domain}/patientDoctorAccess/deletePatientRequest`, {
            ...options,
            method: 'DELETE',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static getPatientInfo(id, success, failure) {
        fetch(`${domain}/userInfo/getPatientInfo/` + id, options)
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }

    static generatePatientsReport({ dateFrom, dateTo, email }, success, failure) {
        fetch(`${domain}/report/generatePatientsReport?from=${dateFrom}&to=${dateTo}&email=${email}`, options)
            .then((res) => res.json())
            .then(async ({ filename, content }) => {
                const fileUri = getFileUri(filename);
                await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
                await Sharing.shareAsync(fileUri);
                success('O.K.');
            })
            .catch(({ message }) => failure(message))
    }

    static updateUserInfo(body, success, failure) {
        fetch(`${domain}/userInfo/updateUserInfo`, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(success)
            .catch(({ message }) => failure(message))
    }
}