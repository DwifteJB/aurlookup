import fetch from 'node-fetch';
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
        case "makedepends" || "makedependants":
            lookupURL = `https://aur.archlinux.org/rpc/?v=5&type=search&by=makedepends&arg=${lookup}`;
            break;
        case "depends" || "dependants":
            lookupURL = `https://aur.archlinux.org/rpc/?v=5&type=search&by=depends&arg=${lookup}`;
            break;
        default:
            console.error(`Error from: aurlookup\nThis isn't a correct type to lookup.\nYou selected: ${type} where you can only have: package,maintainer,makedepends and depends.`);
    }
    // return data
    (verbose == true) ? console.log(`Found lookup URL: ${lookupURL}`)  : null;
    (verbose == true) ? console.log(`Searching for ${lookup} in ${type}...`) : null;
    const response = await fetch(lookupURL);
    const data = await response.json();
    (verbose == true) ? console.log(`Found ${lookup}(s) in AUR`) : null;
    // add the git clone url to data
    (verbose == true) ? console.log(`Adding git-clone URLs to response data.`) : null;
    for (var index in data["results"]) {
        data.results[index].gitURL = `https://aur.archlinux.org/` + data.results[index].Name + `.git`; 
    }
    if (workingversion != data.version) {
        data.warning = `This database is on version ${data.version} whereas this database is only updated to version ${workingversion}`;
    }
    data.type = type;
    (verbose == true) ? console.log(`Found ${lookup}(s) in AUR. Finished action search.`) : null;
    return data;
}
