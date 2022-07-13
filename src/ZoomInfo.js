const fetch = require("node-fetch");

class ZoomInfo {
    hPeopleSearch = async (headers, body) => {
        const res = await fetch("https://app.zoominfo.com/anura/zoominfo/hPeopleSearch", {
            headers,
            referrer: "https://app.zoominfo.com/",
            referrerPolicy: "same-origin",
            body,
            method: "POST",
            mode: "cors",
            credentials: "include",
        });

        const data = await res.json();
        return data;
    };

    viewContacts = async (headers, contacts) => {
        const res = await fetch("https://app.zoominfo.com/anura/userData/viewContacts", {
            headers,
            referrer: "https://app.zoominfo.com/",
            referrerPolicy: "same-origin",
            body: `{"contacts":${contacts},"creditSource":"GROW"}`,
            method: "POST",
            mode: "cors",
            credentials: "include",
        });

        const data = await res.json();
        return data;
    };
}

module.exports = new ZoomInfo();
