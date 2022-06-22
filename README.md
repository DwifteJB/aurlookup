# AUR Lookup
**A light lookup tool for the arch user repository.**

1.1.0: Added gitURL

1.0: Initial Release


## Usage:

### Search for packages by name

    import * as aur from 'aurlookup';
    const aurJSON = await aur.search("packagetosearchfor", "package");

### Search for packages by maintainer name

    import * as aur from 'aurlookup';
    const aurJSON = await aur.search("maintainersname", "maintainer");

### Search for packages by make depends

    import * as aur from 'aurlookup';
    const aurJSON = await aur.search("dependtolookfor", "makedepends");

### Search for package by what it depends on

    import * as aur from 'aurlookup';
    const aurJSON = await aur.search("dependtolookfor", "depend");

### Additional Use

**You can end any of the search commands with a true, to enable verbose mode.**


    import * as aur from 'aurlookup';
    const aurJSON = await aur.search("spot", "package", true);


## JSON Example:

**Open the examples/ folder to see an example of what json files you can get/**
