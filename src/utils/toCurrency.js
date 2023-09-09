import NumberHelper from "./NumberHelper";

const toCurrency = value => NumberHelper.numberFormat(value) + ' บาท';

export default toCurrency;