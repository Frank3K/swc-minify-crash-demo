import swc from "@swc/core";
import fs from 'fs';
 
const src = fs.readFileSync("./vendor-4d35fc8b803beec7d53591943a61d748.js", "utf-8");
const options = JSON.parse(fs.readFileSync("./vendor-4d35fc8b803beec7d53591943a61d748.json", "utf-8"));

const { code, map } = await swc.minify(
  src,
  options,
);

console.log({code, map});