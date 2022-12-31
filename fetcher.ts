import axios, { AxiosResponse } from "axios";
import z from "zod";
import fs from "fs";
import Exceljs from "exceljs";

const listOfCIKs = ["CIK0000320193", "320187", "350403"];
const date = getDateDDMMYYYY();

async function runTheApp() {
  const workbook = new Exceljs.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");
  //replace header name as you want, but do not rename the key, as thats how data is mapped. you can also adjust the width if you want
  worksheet.columns = [
    { header: "Date of report", key: "date", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "CIK", key: "cik", width: 15 },
    { header: "End", key: "end", width: 15 },
    { header: "Val", key: "val", width: 15 },
    { header: "Accn", key: "accn", width: 15 },
    { header: "Fy", key: "fy", width: 15 },
    { header: "Fp", key: "fp", width: 15 },
    { header: "Form", key: "form", width: 15 },
    { header: "Filled", key: "filled", width: 15 },
    { header: "Frame", key: "frame", width: 15 },
  ];

  listOfCIKs.forEach((address) => {
    const CIK = getCik(address);
    const URL = `https://data.sec.gov/api/xbrl/companyconcept/${CIK}/us-gaap/AccountsPayableCurrent.json`;
    console.log(URL);
    (async function writeResponseData() {
      const res = await axios.get(URL).then((d) => {
        const data = d.data;
        const arr = data.units["USD"];
        // console.log(arr);
        arr.forEach((entry: any) => {
          console.log("this runs");
          // console.log(entry);
          // const worksheetEntry = {
          //   date: date,
          //   name: data.entityName,
          //   cik: CIK,
          //   end: entry.end,
          //   val: entry.val,
          //   accn: entry.accn,
          //   fy: entry.fy,
          //   fp: entry.fp,
          //   form: entry.form,
          //   filled: entry.filed,
          //   frame: entry?.frame ?? null,
          // };
          worksheet.addRow({
            date: date,
            name: data.entityName,
            cik: CIK,
            end: entry.end,
            val: entry.val,
            accn: entry.accn,
            fy: entry.fy,
            fp: entry.fp,
            form: entry.form,
            filled: entry.filed,
            frame: entry?.frame ?? null,
            //
          });
          // console.log(worksheetEntry);
        });
        const dataString = JSON.stringify(d.data);
        fs.writeFile(
          `./json/${d.data.entityName}-data.json`,
          dataString,
          (e) => {
            console.log(e);
          }
        );
      });
    })();
  });

  setTimeout(async () => {
    await workbook.xlsx.writeFile(`${date}.xlsx`);
  }, 1 * 1000);
}

runTheApp();

type Params = {
  date?: String;
  name?: String;
  cik?: String;
  end?: String;
  val?: Number;
  accn?: String;
  fy?: Number;
  fp?: String;
  form?: String;
  filled?: String;
  frame?: String;
};
function getCik(address: string) {
  if (address.length == 13) {
    return address;
  } else if (address.length < 13) {
    const cikPrefix = `CIK`;
    const zeroPadding = "0".repeat(13 - cikPrefix.length - address.length);
    return `${cikPrefix}${zeroPadding}${address}`;
  } else {
    console.log("CIK that was provided was too long");
    //defaults to apple
    return "CIK0000320193";
  }
}
function getDateDDMMYYYY() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateFormatted = `${year}-${month}-${day}`;
  return dateFormatted;
}
