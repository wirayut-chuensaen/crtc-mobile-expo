export default class NumberHelper {
  static numberFormat(num, precision = 2) {
    try {
      if (typeof num === 'string' && !/^\d+$|^\d+(\.\d+)?$/g.test(num)) {
        return num;
      }
      let pw = Math.pow(10, precision);
      let str = '';
      if (typeof num === 'number') {
        str = num.toString();
      } else {
        str = num;
      }
      let v = Math.round(parseFloat(str) * pw) / pw;

      let x = v.toString().split('.');
      let y = '';

      let x0 = x[0];

      const rgx = /(\d+)(\d{3})/;

      while (rgx.test(x0)) {
        x0 = x0.replace(rgx, '$1' + ',' + '$2');
      }

      y = x0;

      if (x.length > 1) {
        let x1 = x[1];

        for (let i = x1.length; i < precision; i++) {
          x1 += '0';
        }

        y += '.' + x1;
      } else if (precision > 0) {
        y += '.';

        for (let i = 0; i < precision; i++) {
          y += '0';
        }
      } else {
        y = x0;
      }

      return y;
    } catch (error) {
      console.log(error);
      return num;
    }
  }

  static isNumber(data) {
    if (data === undefined || data === null) {
      return false;
    } else if (data === '') {
      return true;
    } else {
      const test = /^[0-9]*(\.[0-9]{0,2})?$/;
      let res = test.test(String(data));
      return res;
    }
  }
}
