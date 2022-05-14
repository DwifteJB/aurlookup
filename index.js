import fetch from 'node-fetch';
import * as fs from 'fs';
let workingversion = 5; // current version, that has been checked
// Searches for the package results

export async function search(lookup, type, verbose) {

    type = (type == undefined) ? "package" : type;
    verbose = (type == undefined) ? false : verbose;
    (verbose == true) ? console.log(`Info for this lookup\nWhat to search: ${lookup}\nWhat to lookup in AUR: ${type}`)  : null;
    let lookupURL;
    switch (type) {
        case "package" || "pkg":
            lookupURL = `https://aur.archlinux.org/rpc/?v=5&type=search&arg=${lookup}`;
            break;
        case "maintainer" || "author" || "maker":
            lookupURL = `https://aur.archlinux.org/rpc/?v=5&type=search&by=maintainer&arg=${lookup}`;
            break;
        case "makedepends":
            lookupURL = `https://aur.archlinux.org/rpc/?v=5&type=search&by=makedepends&arg=${lookup}`;
            break;
        case "depends":
            lookupURL = `https://aur.archlinux.org/rpc/?v=5&type=search&by=depends&arg=${lookup}`;
            break;
        default:
            console.error("Error from: search.js\nThis isn't a correct type to lookup");
    }
    // return data
    (verbose == true) ? console.log(`Found lookup URL: ${lookupURL}`)  : null;
    (verbose == true) ? console.log(`Searching for ${lookup} in ${type}...`) : null;
    const response = await fetch(lookupURL);
    const data = await response.json();
    (verbose == true) ? console.log(`Found ${lookup}(s) in AUR`) : null;
    if (workingversion != data.version) {
        data.warning = `This database is on version ${data.version} whereas this database is only updated to version ${workingversion}`;
    }
    data.type = type;
    (verbose == true) ? console.log(`Found ${lookup}(s) in AUR. Finished action search.`) : null;
    return data;
}