const getHumanReadableList = (list = [], glue = 'and') =>
    list.length > 1
        ? [list.slice(0, -1).join(', '), list.slice(-1)].join(` ${glue} `)
        : list[0] || '';

const pluralise = (number, singular, plural = singular + 's') =>
    number === 1 ? `1 ${singular}` : `${number} ${plural}`;

module.exports = {
    getHumanReadableList,
    pluralise
};
