const fetch = require("node-fetch");

// fetch("https://app.zoominfo.com/anura/zoominfo/hPeopleSearch", {
//     headers: {
//         accept: "application/json, text/plain, */*",
//         "accept-language": "en-US,en;q=0.9",
//         application: "DOZI",
//         "content-type": "application/json",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "session-token": "1",
//         user: "30990504",
//         "x-sourceid": "ZI_FOR_SALES",
//         "x-ziaccesstoken":
//             "eyJraWQiOiJONmswclE3ekcwOGZTd0w3OFpoQjg4MzRGY3p5MExoa1lMR1B1QVVRSUpBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjhiUVVyYV9vWWVhcktyR2NraC1GVGtyaVdMczBvRmdvY2hBT2JDT19QRTQiLCJpc3MiOiJodHRwczovL3pvb21pbmZvLWF1dGgub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjU3NzI0NDk4LCJleHAiOjE2NTc3NTMyOTgsImNpZCI6IjBvYTk5ZHNtYm5BeGxldkYzNjk2IiwidWlkIjoiMDB1MWptYXM2a3JYdVlpYVI2OTciLCJzY3AiOlsiZW1haWwiLCJwcm9maWxlIiwib3BlbmlkIl0sImF1dGhfdGltZSI6MTY1NzcyNDQ4OCwiemlVc2VybmFtZSI6InJ5YW5AcGVha2xlYWRzLmlvIiwic3ViIjoicnlhbkBwZWFrbGVhZHMuaW8iLCJmaXJzdE5hbWUiOiJSeWFuIiwibGFzdE5hbWUiOiJSb21hbiIsInppU2Vzc2lvblR5cGUiOi0zLCJ6aUdyb3VwSWQiOjAsInppVXNlcklkIjozMDk5MDUwNCwiemlUZW5hbnRJZCI6MjAyMTAwNzQsImVtYWlsIjoicnlhbkBwZWFrbGVhZHMuaW8iLCJzZkFjY291bnRJZCI6IjAwMTR5MDAwMDJnYndCTUFBWSIsInppTW9uZ29Vc2VySWQiOiIzMDk5MDUwNCIsInppUGxhdGZvcm1zIjpbIkRPWkkiLCJBRE1JTiJdfQ.LBTJr_J6_bmhZYtbOLSuzx-u0RkO4RvlthXoI6Mepch0WBZ7jWDARoy4Y_bq02SLXDhuWd9icotc1aDjJ3vmETEb0_Prqmki8qlKYRdJGzDfQen4nmJjyNZRsYI7rjYblyWT5MGXLxkAWBxYWE767-yYHw4JphDfAg99ivpqlU_NDfJp5CvA1hHw5RkYJyLxNoJGNSe3qN6FrS8VDUQbt3K_oste36B03fkXnNRGvrOoOnUtVQWGXKSSKCmK4NwINsBL4cpJ84GADXrtgujc72_wHJ6YxJRZo2OYnPPHEdfzMCFEUXL__aZmqLpmq3FxW9tclUy7OfV7WYKFDo2pbA",
//         "x-ziid":
//             "nHnwlNq22z4li5gixclf9TWV9Wii-e0hNycApQnekBljDNodhjYuaOL-fwlkyT3itFTuK8jquFf8C7FCdI7cdQ",
//         "x-zisession":
//             "nHnwlNq22z4li5gixclf9TWV9Wii-e0hNycApQnekBljDNodhjYuaOL-fwlkyT3itFTuK8jquFfmOQsvJyFO7w3SGGWHjsOYl99NwBHCtpB2U5zdJ_R5EabersyAvwk0",
//     },
//     referrer: "https://app.zoominfo.com/",
//     referrerPolicy: "same-origin",
//     body: '{"rpp":25,"sortBy":"Relevance,company_id","sortOrder":"desc,desc","personTitle":"\\"facilities\\"","metroRegion":"FL - Orlando","companyPastOrPresent":"1","excludeNoCompany":"true","excludeDefunctCompanies":true,"returnOnlyBoardMembers":false,"excludeBoardMembers":true,"contactRequirements":"","hasMobilePhone":"include","hasEmail":"include","hasPersonalEmail":"include","confidenceScoreMin":85,"confidenceScoreMax":99,"isCertified":"include","inputCurrencyCode":"USD","outputCurrencyCode":"USD","page":2,"buyingCommittee":"{\\"personas\\":[],\\"applyToSearchCriteria\\":false}","feature":"People Search - UI"}',
//     method: "POST",
//     mode: "cors",
//     credentials: "include",
// })
//     .then((res) => res.json())
//     .then(({ data }) => console.log(data));

// const ZoomInfo = require("./src/ZoomInfo");

// (async () => {
//     try {
//         const data = await ZoomInfo.viewContacts(
//             {
//                 accept: "application/json, text/plain, */*",
//                 "accept-language": "en-US,en;q=0.9",
//                 application: "DOZI",
//                 "content-type": "application/json",
//                 "sec-fetch-dest": "empty",
//                 "sec-fetch-mode": "cors",
//                 "sec-fetch-site": "same-origin",
//                 "session-token": "1",
//                 user: "30990504",
//                 "x-sourceid": "ZI_FOR_SALES",
//                 "x-ziaccesstoken":
//                     "eyJraWQiOiJONmswclE3ekcwOGZTd0w3OFpoQjg4MzRGY3p5MExoa1lMR1B1QVVRSUpBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjhiUVVyYV9vWWVhcktyR2NraC1GVGtyaVdMczBvRmdvY2hBT2JDT19QRTQiLCJpc3MiOiJodHRwczovL3pvb21pbmZvLWF1dGgub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjU3NzI0NDk4LCJleHAiOjE2NTc3NTMyOTgsImNpZCI6IjBvYTk5ZHNtYm5BeGxldkYzNjk2IiwidWlkIjoiMDB1MWptYXM2a3JYdVlpYVI2OTciLCJzY3AiOlsiZW1haWwiLCJwcm9maWxlIiwib3BlbmlkIl0sImF1dGhfdGltZSI6MTY1NzcyNDQ4OCwiemlVc2VybmFtZSI6InJ5YW5AcGVha2xlYWRzLmlvIiwic3ViIjoicnlhbkBwZWFrbGVhZHMuaW8iLCJmaXJzdE5hbWUiOiJSeWFuIiwibGFzdE5hbWUiOiJSb21hbiIsInppU2Vzc2lvblR5cGUiOi0zLCJ6aUdyb3VwSWQiOjAsInppVXNlcklkIjozMDk5MDUwNCwiemlUZW5hbnRJZCI6MjAyMTAwNzQsImVtYWlsIjoicnlhbkBwZWFrbGVhZHMuaW8iLCJzZkFjY291bnRJZCI6IjAwMTR5MDAwMDJnYndCTUFBWSIsInppTW9uZ29Vc2VySWQiOiIzMDk5MDUwNCIsInppUGxhdGZvcm1zIjpbIkRPWkkiLCJBRE1JTiJdfQ.LBTJr_J6_bmhZYtbOLSuzx-u0RkO4RvlthXoI6Mepch0WBZ7jWDARoy4Y_bq02SLXDhuWd9icotc1aDjJ3vmETEb0_Prqmki8qlKYRdJGzDfQen4nmJjyNZRsYI7rjYblyWT5MGXLxkAWBxYWE767-yYHw4JphDfAg99ivpqlU_NDfJp5CvA1hHw5RkYJyLxNoJGNSe3qN6FrS8VDUQbt3K_oste36B03fkXnNRGvrOoOnUtVQWGXKSSKCmK4NwINsBL4cpJ84GADXrtgujc72_wHJ6YxJRZo2OYnPPHEdfzMCFEUXL__aZmqLpmq3FxW9tclUy7OfV7WYKFDo2pbA",
//                 "x-ziid":
//                     "nHnwlNq22z4li5gixclf9TWV9Wii-e0hNycApQnekBljDNodhjYuaOL-fwlkyT3itFTuK8jquFf8C7FCdI7cdQ",
//                 "x-zisession":
//                     "nHnwlNq22z4li5gixclf9TWV9Wii-e0hNycApQnekBljDNodhjYuaOL-fwlkyT3itFTuK8jquFfmOQsvJyFO7w3SGGWHjsOYl99NwBHCtpB2U5zdJ_R5EabersyAvwk0",
//             },
//             '{"rpp":25,"sortBy":"Relevance,company_id","sortOrder":"desc,desc","personTitle":"\\"facilities\\"","metroRegion":"FL - Orlando","companyPastOrPresent":"1","excludeNoCompany":"true","excludeDefunctCompanies":true,"returnOnlyBoardMembers":false,"excludeBoardMembers":true,"contactRequirements":"","hasMobilePhone":"include","hasEmail":"include","hasPersonalEmail":"include","confidenceScoreMin":85,"confidenceScoreMax":99,"isCertified":"include","inputCurrencyCode":"USD","outputCurrencyCode":"USD","page":2,"buyingCommittee":"{\\"personas\\":[],\\"applyToSearchCriteria\\":false}","feature":"People Search - UI"}'
//         );

//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// })();

const personIds = [123, 345, 567, 8645];

const contacts = personIds.map((person) => ({ personId: person }));
console.log(JSON.stringify(contacts));
