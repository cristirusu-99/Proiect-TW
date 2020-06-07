
export function addObiecteDinAceiasiMarca(data, cuvant) {
    var obiect = new Map();
    data.forEach((valoare) => {
        if (obiect.has(valoare[cuvant])) {
            obiect.set(valoare[cuvant], obiect.get(valoare[cuvant]) + valoare.TOTALVEHICULE);
        } else {
            obiect.set(valoare[cuvant], valoare.TOTALVEHICULE);
        }
    })
    return obiect;
}

