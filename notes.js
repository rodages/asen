import axios, { AxiosResponse } from "axios";
import z from "zod";
import fs from "fs";
import Exceljs from "exceljs";

const listOfCIKs = ["CIK00003201934"];
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const dateFormatted = `${year}-${month}-${day}`;

async function runTheApp() {
  // const workbook = new Exceljs.Workbook();
  // const worksheet = workbook.addWorksheet("My Sheet");

  // listOfCIKs.forEach((address) => {
  //   const CIK = () => {
  //     console.log(address);
  //     // if (address.length === 13) {
  //     //   return address;
  //     // } else if (address.length < 13) {
  //     //   const cikPrefix = `CIK`;
  //     //   const zeroPadding = "0".repeat(13 - cikPrefix.length - address.length);
  //     //   return `${cikPrefix}${zeroPadding}${address}`;
  //     // } else {
  //     //   console.log("CIK that was provided was too long");
  //     // }
  //   };
  //   const URL = `https://data.sec.gov/api/xbrl/companyconcept/${CIK}/us-gaap/AccountsPayableCurrent.json`;
  //   console.log(URL);
  //   // const res = axios.get(URL);
  //   // res.then((d) => {
  //   //   const data = d.data;

  //   //   const dataString = JSON.stringify(d.data);
  //   //   fs.writeFile(`./json/${d.data.entityName}-data.json`, dataString, (e) => {
  //   //     console.log(e);
  //   //   });
  //   // });
  // });

  //replace header name as you want, but do not rename the key, as thats how data is mapped. you can also adjust the width if you want
  // worksheet.columns = [
  //   { header: "date", key: "date", width: 10 },
  //   { header: "Name", key: "name", width: 32 },
  //   { header: "CIK", key: "cik", width: 15 },
  //   { header: "end", key: "end", width: 15 },
  //   { header: "val", key: "val", width: 15 },
  //   { header: "accn", key: "accn", width: 15 },
  //   { header: "fy", key: "fy", width: 15 },
  //   { header: "fp", key: "fp", width: 15 },
  //   { header: "form", key: "form", width: 15 },
  //   { header: "filled", key: "filled", width: 15 },
  //   { header: "frame", key: "frame", width: 15 },
  // ];

  // worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
  // worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) });

  // worksheet.addRow({
  //   date: dateFormatted,
  //   name: "test",
  //   cik: "01111",
  //   end: "123",
  //   val: "11",
  //   accn: "22",
  //   fy: "33",
  //   fp: "44",
  //   form: "55",
  //   filled: "66",
  //   frame: "77",
  // });

  // await workbook.xlsx.writeFile(`${dateFormatted}.xlsx`);

  // //load a copy of export.xlsx
  // const newWorkbook = new Exceljs.Workbook();
  // await newWorkbook.xlsx.readFile("export.xlsx");

  // const newworksheet = newWorkbook.getWorksheet("My Sheet");
  // newworksheet.columns = [
  //   { header: "Id", key: "id", width: 10 },
  //   { header: "Name", key: "name", width: 32 },
  //   { header: "D.O.B.", key: "dob", width: 15 },
  // ];
  // await newworksheet.addRow({
  //   id: 3,
  //   name: "New Guy",
  //   dob: new Date(2000, 1, 1),
  // });

  // await newWorkbook.xlsx.writeFile("export2.xlsx");

  console.log("File is written");
}

runTheApp();

// change the things inside the quotation marks to get data from another place
const URL =
  "https://data.sec.gov/api/xbrl/companyconcept/CIK0000320193/us-gaap/AccountsPayableCurrent.json";

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
type Params = {
  date?: String,
  name?: String,
  cik?: String,
  end?: String,
  val?: Number,
  accn?: String,
  fy?: Number,
  fp?: String,
  form?: String,
  filled?: String,
  frame?: String,
};
