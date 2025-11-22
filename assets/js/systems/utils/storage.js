export class LocalStorage {
    static deviceId = null;

    static get = (key) => localStorage.getItem(key);
    static set = (key, data) => localStorage.setItem(key, data);

    static getOrAddDeviceId = () => {
        if (this.deviceId == null) this.deviceId = this.get("deviceId");
        if (this.deviceId == null) {
            this.deviceId = crypto.randomUUID();
            this.set("deviceId", this.deviceId);
        }
        return this.deviceId;
    }
}

export class SessionStorage {
    static get = (key) => sessionStorage.getItem(key);
    static set = (key, data) => sessionStorage.setItem(key, data);
}
