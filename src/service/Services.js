import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from "../utils/Constant"

export const CancelableToken = Axios.CancelToken.source();

const http = Axios.create({
  baseURL: Constant.urlApi,
  timeout: 30 * 1000,
});

const getHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  const pin = await AsyncStorage.getItem('pin');

  const header = {
    headers: {
      'Content-Type': 'application/json',
      'api-key': '12345678900987654321',
      'api-version': '1.0',
    },
    // cancelToken: CancelableToken.token,
  };

  if (token != null) {
    header.headers.token = JSON.parse(token);
  }

  if (pin != null) {
    header.headers.pin = pin;
  }

  return header;
};

const getJson = async (path = '', body = {}, callback) => {
  const header = await getHeader();
  for (let key in body) {
    path += path.indexOf('?') === -1 ? '?' : '&';
    path += `${key}=${body[key]}`;
  }

  if (__DEV__) {
    console.log(`Get JSON path : ${path}`, {
      path: Constant.urlApi + path,
      header,
    });
  }

  if (callback) {
    return await http
      .get(path, header)
      .then(res => callback(res, true))
      .catch(err => callback(err, false));
  } else {
    return await http.get(path, header);
  }
};

const postJson = async (path = '', body, callback) => {
  const header = await getHeader();

  if (__DEV__) {
    console.log(`Post JSON path : ${path}`, {
      path: Constant.urlApi + path,
      body,
      header,
    });
  }

  if (callback) {
    return await http
      .post(path, body, header)
      .then(res => callback(res, true))
      .catch(err => callback(err, false));
  } else {
    return await http.post(path, body, header);
  }
};

// eslint-disable-next-line no-unused-vars
const postForm = async (path = '', body, callback) => {
  const header = await getHeader();
  header.headers['Content-Type'] = 'multipart/form-data';
  // eslint-disable-next-line no-undef
  const form = new FormData();
  for (let key in body) {
    form.append(key, body[key]);
  }

  console.log('Post FORM', {
    path: Constant.urlApi + path,
    form,
    header,
  });

  if (callback) {
    return await http
      .post(path, form, header)
      .then(res => callback(res, true))
      .catch(err => callback(err, false));
  } else {
    return await http.post(path, form, header);
  }
};

export const authen = (body, callback) => postJson('/login', body, callback);

export const changePassword = (body, callback) =>
  postJson('/change-password', body, callback);

export const socialVerify = (body, callback) =>
  postJson('/social-verify', body, callback);

export const checkSocialVerify = (body, callback) =>
  postJson('/social-login', body, callback);

export const home = callback => getJson('/home', {}, callback);

export const news = callback => getJson('/news', {}, callback);

export const contact = callback => getJson('/contact', {}, callback);

export const privacyPolicy = callback =>
  getJson('/privacy-policy', {}, callback);

export const personalData = callback => getJson('/personal-data', {}, callback);

export const savemas = callback => getJson('/savemas', {}, callback);

export const savemas_Detail = (id, callback) =>
  getJson('/savemas-detail/' + id, {}, callback);

export const statement = (id, callback) =>
  getJson('/savemas-statement/' + id, {}, callback);

export const loanStatement = (id, callback) =>
  getJson('/loan-statement/' + id, {}, callback);

export const loan = callback => getJson('/loan', {}, callback);

export const loanDetail = (id, callback) =>
  getJson('/loan-detail/' + id, {}, callback);

export const netbill = callback => getJson('/net-bill', {}, callback);

export const cooperative_Detail = (id, callback) =>
  getJson('/net-bill-detail/' + id, {}, callback);

export const cremation = (cremation_type, callback) => getJson('/cremation', { cremation_type }, callback);
export const cremationType = callback => getJson('/cremation-type', {}, callback);

export const cremationDeduct = (cremation_type, callback) =>
  getJson('/cremation-deduct', { cremation_type }, callback);

export const cremation_Detail = (billno, type, callback) =>
  getJson(`/cremation-detail/${billno}?cremation_type=${type}`, {}, callback);

export const cremationDeductDetail = (billno, type, callback) =>
  getJson(`/cremation-deduct-detail/${billno}?cremation_type=${type}`, {}, callback);

export const stock = callback => getJson('/stock', {}, callback);

export const stock_Detail = (id, callback) =>
  getJson('/stock-detail/' + id, {}, callback);

export const warranteeMe = callback => getJson('/warrantee-me', {}, callback);

export const warranteeMe_Detail = (id, callback) =>
  getJson('/warrantee-me-detail/' + id, {}, callback);

export const warranteeWho = callback => getJson('/warrantee-who', {}, callback);

export const warranteeWho_Detail = (id, callback) =>
  getJson('/warrantee-who-detail/' + id, {}, callback);

export const dividend = callback => getJson('/dividend', {}, callback);

export const dividend_Detail = (id, callback) =>
  getJson('/dividend-detail/' + id, {}, callback);

export const loginWithPin = (body, callback) =>
  postJson('/login-with-pin', body, callback);

export const accountDetail = (id, callback) =>
  postJson('/account-detail/' + id, {}, callback);

export const createUserPin = (body, callback) =>
  postJson('/create-userPin', body, callback);

export const previewTransaction = (body, callback) =>
  postJson('/transaction/preview', body, callback);

export const verifyTransaction = (body, callback) =>
  postJson('/transaction/verify', body, callback);

export const transfer = (id, body, callback) =>
  postJson('/transfer/' + id, body, callback);

export const account = callback => getJson('/account', {}, callback);

export const canTransfer = (body, callback) =>
  postJson('/can_transfer', body, callback);

export const smsDelay = callback => getJson('/sms_delay', {}, callback);

export const cremationTop = (cremation_type, callback) => getJson('/cremation-top', { cremation_type }, callback);

export const beneficiary = (cremation_type, callback) => getJson('/beneficiary', { cremation_type }, callback);

export const requestNewPinOTP = callback =>
  postJson('/send-otp-change-pin', {}, callback);

export const confirmNewPinOTP = (body, callback) =>
  postJson('/confirm-otp-change-pin', body, callback);

export const verifyNewPinData = (body, callback) =>
  postJson('/verify-identity', body, callback);

export const clearPin = callback => postJson('/reset-pin', {}, callback);

export const getStockRegist = callback =>
  getJson('/list-stock-regist', {}, callback);

export const getLoanRegist = callback =>
  getJson('/list-loan-regist', {}, callback);

export const getSavemasRegist = callback =>
  getJson('/list-savemas-regist', {}, callback);

export const updateSavemasRegist = (body, callback) =>
  postJson('/update-savemas-regist', body, callback);

export const updateLoanRegist = (body, callback) =>
  postJson('/update-loan-regist', body, callback);

export const updateStockRegist = (body, callback) =>
  postJson('/update-stock-regist', body, callback);

export const getBankList = callback => getJson('/bank', {}, callback);

export const getLoanTypeList = callback =>
  getJson('/type-loan-online', {}, callback);

export const getBankAccount = callback =>
  getJson('/bank-account', {}, callback);

export const addBankAccount = (body, callback) =>
  postForm('/add-bank-account', body, callback);

export const updateDividendAccount = (body, callback) =>
  postJson('/update-dividend-account', body, callback);

export const uploadLoanFile = (body, callback) =>
  postForm('/uplaod-file', body, callback);

export const searchGuarantor = (body, callback) =>
  postJson('/guarantor-search', body, callback);

export const saveLoanRequest = (body, callback) =>
  postJson('/save-loan-request-online', body, callback);

export const loanRequest = (body, callback) =>
  postJson('/loan-request-online', body, callback);

export const getRequestLoanList = callback =>
  getJson('/list-loan-request', {}, callback);

export const getTransferMemberInfo = callback =>
  getJson('/transfer-member-info', {}, callback);

export const getDepositMemberProfile = callback =>
  getJson('/deposit-member-profile', {}, callback);

export const transferDepositConfirm = (body, callback) =>
  postJson('/transfer-deposit-confirmation', body, callback);

export const transferDepositConfirmOtp = (body, callback) =>
  postJson('/transfer-deposit-confirmation-otp', body, callback);

export const getBorrowerMemberProfile = callback =>
  getJson('/borrower-member-profile', {}, callback);

export const transferWithdrawConfirm = (body, callback) =>
  postJson('/transfer-withdraw-confirmation', body, callback);

export const transferWithdrawConfirmOtp = (body, callback) =>
  postJson('/transfer-withdraw-confirmation-otp', body, callback);

export const transferBorrowConfirm = (body, callback) =>
  postJson('/transfer-borrower-confirmation', body, callback);

export const transferBorrowConfirmOtp = (body, callback) =>
  postJson('/transfer-borrower-confirmation-otp', body, callback);

export const linkAccountStatus = callback =>
  getJson('/link-account-status', {}, callback);

export const getCondition = callback =>
  getJson('/condition', {}, callback);

export const checkCondition = callback =>
  getJson('/check-condition', {}, callback);

export const confirmCondition = callback =>
  postJson('/confirm-condition', {
    confirm: true
  }, callback);