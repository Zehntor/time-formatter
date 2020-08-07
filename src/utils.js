const getHumanReadableList = (list, glue = 'and') => {
    const listClone = list.slice();
    const lastElement = listClone.pop();
    if (listClone.length === 0) {
        return lastElement || '';
    }
    return [listClone.join(', '), lastElement].join(` ${glue} `);
};

const pluralise = (number, singular, plural = singular + 's') =>
    number === 1 ? `1 ${singular}` : `${number} ${plural}`;

module.exports = {
    getHumanReadableList,
    pluralise
};
