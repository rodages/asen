import axios, { AxiosResponse } from "axios";
import z from "zod";
import fs from "fs";

const addreses = ["CIK0000320193"];
// change the things inside the quotation marks to get data from another place
const URL =
  "https://data.sec.gov/api/xbrl/companyconcept/CIK0000320193/us-gaap/AccountsPayableCurrent.json";

addreses.forEach((address) => {
  const URL = `https://data.sec.gov/api/xbrl/companyconcept/${address}/us-gaap/AccountsPayableCurrent.json`;
  const res = axios.get(URL);
  res.then((d) => {
    const data = JSON.stringify(d.data);
    fs.writeFile(`./json/${address}-data.json`, data, (e) => {
      console.log(e);
    });
    console.log("done");
  });
});
console.log("update");

// const data = (() => {
//   const res = axios.get(URL);
//   res.then((d) => {
//     const data = JSON.stringify(d.data);
//     fs.writeFile("data1.json", data, (e) => {
//       console.log(e);
//     });
//     console.log(data);
//   });
//   console.log("hi");
// })();
