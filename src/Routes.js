import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckingLogin from './CheckingLogin';
import Authen from "./page/Authen"
import Verify from './page/Verify';
import Launcher from './page/Launcher';
import TermAndCondition from './page/TermAndCondition';
import VerifyPin from './page/VerifyPin';
import Settings from './page/Settings';
import ForgotPin from './page/ForgotPin';
import NewPinOTP from './page/NewPinOTP';
import Contact from "./details/Contact"
import Notifications from './details/Notifications';
import PrivacyPolicy from './details/PrivacyPolicy';
import ChangePassword from './page/ChangePassword';

// import News from '../page/News';
// import NewsDetail from '../detail/NewsDetail';


// import Infomations from '../page/Infomations';
// import Share from '../page/Share';
// import Stock_Detail from '../detail/Stock_Detail';

// import Deposits from '../page/Deposits';
// import Savemas_Detail from '../detail/Savemas_Detail';
// import Statement from '../detail/Statement';

// import Loans from '../page/Loans';
// import Loan_Detail from '../detail/Loan_Detail';
// import Loan_Statement from '../detail/Loan_Statement';

// import Warrantee from '../page/Warrantee';
// import WarranteeMe_Detail from '../detail/WarranteeMe_Detail';
// import WarranteeWho_Detail from '../detail/WarranteeWho_Detail';

// import Cooperatives from '../page/Cooperatives';
// import Cooperative_Detail from '../detail/Cooperative_Detail';

// import Cremation from '../page/Cremation';
// import Cremations from '../page/Cremations';
// import Cremation_Detail from '../detail/Cremation_Detail';

// import Dividend from '../page/Dividend';
// import Dividend_Detail from '../detail/Dividend_Detail';


// import AddAccount from '../page/AddAccount';
// import AccountDetail from '../page/AccountDetail';
// import TransferAction from '../page/TransferAction';
// import TransferConfirm from '../page/TransferConfirm';
// import VerifyOTP from '../page/VerifyOTP';
// import TransferSuccess from '../page/TransferSuccess';
// import Beneficiary from '../page/Beneficiary';


// import NewPinDataVerify from '../page/NewPinDataVerify';
// import FormChangeStock from '../page/FormChangeStock';
// import FormChangeDeposit from '../page/FormChangeDeposit';
// import FormChangeLoan from '../page/FormChangeLoan';
// import FormChangeDividend from '../page/FormChangeDividend';
// import FormCreateBankAccount from '../page/FormCreateBankAccount';
// import FormRequestLoan from '../page/Loan/FormRequestLoan';
// import FormUploadDocument from '../page/Loan/FormUploadDocument';
// import FormCoopLoan from '../page/CoopLoan/FormCoopLoan';
// import CoopLoanConfirm from '../page/CoopLoan/CoopLoanConfirm';
// import CoopLoanSuccess from '../page/CoopLoan/CoopLoanSuccess';
// import FormCoopWithdraw from '../page/CoopWithdraw/FormCoopWithdraw';
// import CoopWithdrawConfirm from '../page/CoopWithdraw/CoopWithdrawConfirm';
// import CoopWithdrawSuccess from '../page/CoopWithdraw/CoopWithdrawSuccess';
// import LoanCalculate from '../page/Loan/LoanCalculate';
// import RequestLoanList from '../page/Loan/RequestLoanList';
// import CoopOtp from '../page/CoopOtp';
// import CoopLinkAccount from '../page/CoopLinkAccount';
// import CoopAccountNotLink from '../page/CoopAccountNotLink';
// import CoopDepositSuccess from '../page/CoopDeposit/CoopDepositSuccess';
// import FormCoopDeposit from '../page/CoopDeposit/FormCoopDeposit';
// import CoopDepositConfirm from '../page/CoopDeposit/CoopDepositConfirm';

// import CremationsList from '../page/CremationsList';

const Stack = createNativeStackNavigator();

const Routes = () => {
	return (
		<NavigationContainer
			linking={{
				prefixes: "crtc://"
			}}
		>
			<Stack.Navigator
				initialRouteName="CheckingLogin"
				screenOptions={{ headerShown: false, gestureEnabled: false }}>
				<Stack.Screen name='CheckingLogin' component={CheckingLogin} />
				<Stack.Screen name="Authen" component={Authen} />
				<Stack.Screen name="Verify" component={Verify} />
				<Stack.Screen name="VerifyPin" component={VerifyPin} />
				<Stack.Screen name="Launcher" component={Launcher} />
				<Stack.Screen name="TermAndCondition" component={TermAndCondition} />
				<Stack.Screen name="Settings" component={Settings} />
				<Stack.Screen name="ForgotPin" component={ForgotPin} />
				<Stack.Screen name="NewPinOTP" component={NewPinOTP} />
				<Stack.Screen name="Contact" component={Contact} />
				<Stack.Screen name="Notifications" component={Notifications} />
				<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
				<Stack.Screen name="ChangePassword" component={ChangePassword} />

				{/*
        
        
        <Stack.Screen name="Infomations" component={Infomations} />

        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />

        <Stack.Screen name="Share" component={Share} />
        <Stack.Screen name="Stock_Detail" component={Stock_Detail} />

        <Stack.Screen name="Deposits" component={Deposits} />
        <Stack.Screen name="Savemas_Detail" component={Savemas_Detail} />
        <Stack.Screen name="Statement" component={Statement} />

        <Stack.Screen name="Loans" component={Loans} />
        <Stack.Screen name="Loan_Detail" component={Loan_Detail} />
        <Stack.Screen name="Loan_Statement" component={Loan_Statement} />

        <Stack.Screen name="Cooperatives" component={Cooperatives} />
        <Stack.Screen
          name="Cooperative_Detail"
          component={Cooperative_Detail}
        /> */}

				{/*<Stack.Screen name="Cremations" component={Cremations} />
        <Stack.Screen name="Cremations" component={Cremation} />
        <Stack.Screen name="CremationsList" component={CremationsList} />

        <Stack.Screen name="Cremation_Detail" component={Cremation_Detail} />

        <Stack.Screen name="Warrantee" component={Warrantee} />
        <Stack.Screen
          name="WarranteeMe_Detail"
          component={WarranteeMe_Detail}
        />
        <Stack.Screen
          name="WarranteeWho_Detail"
          component={WarranteeWho_Detail}
        />

        <Stack.Screen name="Dividend" component={Dividend} />
        <Stack.Screen name="Dividend_Detail" component={Dividend_Detail} />
       
        <Stack.Screen name="AddAccount" component={AddAccount} />
        <Stack.Screen name="AccountDetail" component={AccountDetail} />
        <Stack.Screen name="TransferAction" component={TransferAction} />
        <Stack.Screen name="TransferConfirm" component={TransferConfirm} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="TransferSuccess" component={TransferSuccess} />
        <Stack.Screen name="Beneficiary" component={Beneficiary} />
        
        <Stack.Screen name="NewPinOTP" component={NewPinOTP} />
        <Stack.Screen name="NewPinDataVerify" component={NewPinDataVerify} />
        <Stack.Screen name="FormChangeStock" component={FormChangeStock} />
        <Stack.Screen name="FormChangeDeposit" component={FormChangeDeposit} />
        <Stack.Screen name="FormChangeLoan" component={FormChangeLoan} />
        <Stack.Screen
          name="FormChangeDividend"
          component={FormChangeDividend}
        />
        <Stack.Screen
          name="FormCreateBankAccount"
          component={FormCreateBankAccount}
        />
        <Stack.Screen name="FormRequestLoan" component={FormRequestLoan} />
        <Stack.Screen
          name="FormUploadDocument"
          component={FormUploadDocument}
        />


        <Stack.Screen name="FormCoopWithdraw" component={FormCoopWithdraw} />
        <Stack.Screen
          name="CoopWithdrawConfirm"
          component={CoopWithdrawConfirm}
        />
        <Stack.Screen
          name="CoopWithdrawSuccess"
          component={CoopWithdrawSuccess}
        />

        <Stack.Screen name="FormCoopDeposit" component={FormCoopDeposit} />
        <Stack.Screen name="CoopDepositConfirm" component={CoopDepositConfirm} />
        <Stack.Screen
          name="CoopDepositSuccess"
          component={CoopDepositSuccess}
        />

        <Stack.Screen name="FormCoopLoan" component={FormCoopLoan} />
        <Stack.Screen name="CoopLoanConfirm" component={CoopLoanConfirm} />
        <Stack.Screen name="CoopLoanSuccess" component={CoopLoanSuccess} />



        <Stack.Screen name="LoanCalculate" component={LoanCalculate} />
        <Stack.Screen name="RequestLoanList" component={RequestLoanList} />
        <Stack.Screen name="CoopOtp" component={CoopOtp} />
        <Stack.Screen name="CoopLinkAccount" component={CoopLinkAccount} />
        <Stack.Screen name="CoopAccountNotLink" component={CoopAccountNotLink} />

         */}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
