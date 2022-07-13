class Helpers {
    formatContact = (prospect) => ({
        "Full Name": prospect.name,
        "First Name": prospect.firstName,
        "Last Name": prospect.lastName,
        Title: prospect.title,
        Street: prospect.location.Street,
        City: prospect.location.City,
        State: prospect.location.State,
        Zip: prospect.location.Zip,
        "Phone Number": prospect.mobilePhone,
        Email: prospect.personalEmail,
        "Company Name": prospect.companyName,
        Url: `https://app.zoominfo.com/#/apps/profile/person/${prospect.personID}/contact-profile`,
        Source: "ZoomInfo",
    });
}

module.exports = new Helpers();
