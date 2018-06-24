exports.getCatgoryById = id => {
    if (id === 1)
        return "DSLR"
    else if (id === 2)
        return "DuLich"
    else if (id === 3)
        return "LayLien"
    else
        return "Mirr"
}

exports.getNameCatgoryById = id => {
    if (id === 1)
        return "DSLR"
    else if (id === 2)
        return "Du Lịch"
    else if (id === 3)
        return "Lấy liền"
    else
        return "Mirr"
}

exports.getCatgoryByCatName = name =>{
    if (name=== 'DSLR'){
        return "DSLR"
    }     
    else if (name=== 'Travel')
    {
        return "DuLich"
    }
    else if (name=== 'snapshot')
    {
        return "LayLien"
    }
    else {
        return "Mirr"
    }
}

exports.getManufactureByName = name =>{
    if (name === 'Cannon') {
        return 1;
    }
    else if (name === 'Sony') {
        return 2;
    }
    else if (name === 'Nikon') {
        return 3;
    }
    else {
        return 4;
    }
}