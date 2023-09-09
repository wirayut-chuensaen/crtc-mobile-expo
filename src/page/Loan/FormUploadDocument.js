/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../../util/useNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import SizedBox from '../../component/SizedBox';
import AppButton, {AppButtonView} from '../../component/AppButton';
import UploadLabel from '../../component/UploadLabel';
import AppTextInput from '../../component/AppTextInput';
import AppImagePicker from '../../component/AppImagePicker';
import withSeparate from '../../util/withSeparate';
import {
  searchGuarantor,
  uploadLoanFile,
  saveLoanRequest,
} from '../../../actions/Service';
import AppPdfPicker from '../../component/AppPdfPicker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import withBlank from '../../util/withBlank';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FormUploadDocument = ({navigation, Actions, refresh, data, loan}) => {
  const [validate, setValidate] = useState(true);
  const [myMemberId, setMyMemberId] = useState('');
  const [guarantorList, setGuarantor] = useState(
    Array.from(Array(Number(loan.n_warr)).keys()).map(x => {
      return {
        memberId: '',
        name: '',
      };
    }),
  );

  useEffect(() => {
    AsyncStorage.getItem('mem_id').then(mem_id => {
      if (mem_id != null) {
        setMyMemberId(mem_id);
      }
    });
  }, []);

  useEffect(() => {
    setValidate(guarantorList.filter(x => x.memberId === '').length === 0);
  }, [guarantorList]);

  const [salary, setSalary] = useState([]);
  const [statement, setStatement] = useState([]);
  const [bookBank, setBookBank] = useState([]);
  const [slip, setSlip] = useState([]);

  const onSave = () => {
    if (salary.length === 0) {
      return Alert.alert(
        '',
        'กรุณาอัพโหลดรูปสลิปเงินเดือน หรือ E-Money เดือนล่าสุด',
      );
    }
    if (statement.length === 0) {
      return Alert.alert(
        '',
        'กรุณาอัพโหลด STATEMENT/รายการเดินบัญชีที่มีเงินเดือนเข้าล่าสุด',
      );
    }
    if (bookBank.length === 0) {
      return Alert.alert(
        '',
        'กรุณาอัพโหลดรูปถ่ายหน้าสมุดบัญชีธนาคารที่มีชื่อเจ้าของบัญชี',
      );
    }
    if (slip.length === 0) {
      return Alert.alert(
        '',
        'กรุณาอัพโหลดเอกสารรับรองสลิปเงินเดือน จาก สำนักงานเขตฯ',
      );
    }

    const saveData = {
      amount: loan.mx_loan,
      type: data.type,
      reason_id: '',
      reason_note: '',
      sal_wit1: data.sal_wit1,
      loan_pmt: loan.loan_pmt,
      reg_id: data.loan_reg_id,
      file_uploads: [...salary, ...statement, ...bookBank, ...slip].map(x => {
        return {
          image_type: x.file_type,
          image_name: x.file_name
        };
      }),
      guarantor: guarantorList.map(x => {
        let memberId = x.memberId + '';
        if (memberId.length == 5) {
          memberId = "0" + memberId;
        }
        return {mem_id: memberId};
      }),
    };

    console.log(JSON.stringify(saveData))

    saveLoanRequest(saveData, (res, done) => {
      console.log(res);
      if (done && res.data.status) {
        refresh();
        Actions.popCount(3);
      } else {
        failed(res.data.message);
      }
    });
  };

  const onCheck = index => {
    const {memberId} = guarantorList[index];
    if (memberId.length === 0) {
      return failed('กรุณากรอกรหัสสมาชิก');
    }
    if (memberId == myMemberId) {
      return failed('ไม่สามารถใช้เลขสมาชิกของตัวท่านเองได้');
    }
    const exist = guarantorList.filter(
      (x, i) => x.memberId === memberId && i !== index,
    );
    if (exist.length > 0) {
      return failed('รหัสสมาชิกซ้ำ');
    }

    searchGuarantor(
      {
        guarantor: memberId,
      },
      (res, done) => {
        if (done && res.data.status) {
          const newGuarantorList = [...guarantorList];
          newGuarantorList[index].name = res.data.guarantor.MNAME;
          setGuarantor(newGuarantorList);
        }
      },
    );
  };

  const success = () =>
    Toast.show({
      type: 'success',
      text1: 'อัพโหลดไฟล์สำเร็จ',
    });

  const failed = (message = 'อัพโหลดไฟล์ไม่สำเร็จ') =>
    Toast.show({
      type: 'error',
      text1: message,
    });

  const _renderGuarantor = () => {
    const viewList = guarantorList.map((member, index) => (
      <View>
        <Text>ชื่อผู้ค้ำประกันคนที่ {index + 1}</Text>
        <SizedBox height={10} />
        <View style={styles.checkGuarantor}>
          <AppTextInput
            placeholder="รหัสสมาชิกผู้ค้ำประกัน"
            style={styles.buttonFill}
            onChangeText={text => {
              const newGuarantorList = [...guarantorList];
              newGuarantorList[index].memberId = text;
              setGuarantor(newGuarantorList);
            }}
          />
          <SizedBox width={10} />
          <AppButton text="ตรวจสอบข้อมูล" onPress={() => onCheck(index)} />
        </View>
        {member.name !== '' && (
          <>
            <SizedBox height={10} />
            <Text>
              {member.name} เลขประจำตัว {member.memberId}
            </Text>
          </>
        )}
      </View>
    ));

    return withSeparate(viewList, <SizedBox height={10} />);
  };

  const onSalary = file => {
    uploadLoanFile(
      {file, img_desp: '1', loan_reg_id: data.loan_reg_id},
      (res, done) => {
        if (done && res.data.status) {
          const fileList = [...salary];
          fileList.push(res.data.data);
          setSalary(fileList);
          success();
        } else {
          failed();
        }
      },
    );
  };

  const onStatementImage = file => {
    uploadLoanFile(
      {file, img_desp: '2', loan_reg_id: data.loan_reg_id},
      (res, done) => {
        if (done && res.data.status) {
          const fileList = [...statement];
          fileList.push(res.data.data);
          setStatement(fileList);
          success();
        } else {
          failed();
        }
      },
    );
  };

  const onStatementPdf = file => {
    uploadLoanFile(
      {file, img_desp: '2', loan_reg_id: data.loan_reg_id},
      (res, done) => {
        console.log(res);
        if (done && res.data.status) {
          const fileList = [...statement];
          fileList.push(res.data.data);
          setStatement(fileList);
          success();
        } else {
          failed();
        }
      },
    );
  };

  const onBookBank = file => {
    uploadLoanFile(
      {file, img_desp: '3', loan_reg_id: data.loan_reg_id},
      (res, done) => {
        console.log(res);
        if (done && res.data.status) {
          const fileList = [...bookBank];
          fileList.push(res.data.data);
          setBookBank(fileList);
          success();
        } else {
          failed();
        }
      },
    );
  };

  const onSlip = file => {
    uploadLoanFile(
      {file, img_desp: '4', loan_reg_id: data.loan_reg_id},
      (res, done) => {
        console.log(res);
        if (done && res.data.status) {
          const fileList = [...slip];
          fileList.push(res.data.data);
          setSlip(fileList);
          success();
        } else {
          failed();
        }
      },
    );
  };

  const _renderAttachmentList = (file = []) => {
    const fileCount = file.length;
    let fileList = withBlank(file, 3, 'blank');
    return (
      <View>
        <Text>ไฟล์แนบ ({fileCount})</Text>
        <SizedBox height={10} />
        <View style={styles.flexWrap}>
          {fileList.map(file => {
            if (file === 'blank') {
              return <View style={styles.blankFile} />;
            }

            if (file.file_name.toLowerCase().endsWith('.pdf')) {
              return (
                <View style={styles.filePdf}>
                  <MaterialIcons
                    name="picture-as-pdf"
                    color={Constant.color.red}
                    size={50}
                  />
                </View>
              );
            }

            return (
              <View style={styles.fileItem}>
                <Image
                  source={{uri: file.full_url}}
                  resizeMode="cover"
                  style={{height: '100%'}}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      locations={[0, 0.4]}
      colors={[Constant.color.violetlight, Constant.color.darkPurple]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={{...StyleSheet.absoluteFillObject}}>
      <Header
        leftComponent={
          <Icon
            name="chevron-thin-left"
            type="entypo"
            color="#fff"
            iconStyle={{backgroundColor: Constant.color.violet}}
            onPress={navigation.goBack}
          />
        }
        centerComponent={{
          text: 'อัพโหลดเอกสาร',
          style: {color: '#fff'},
        }}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <UploadLabel
              key="salary_image"
              title="1. รูปสลิปเงินเดือน หรือ E-Money เดือนล่าสุด"
              labelList={[
                'สลิปเงินเดือนต้องมีลายเซ็นต์ ผู้บังคับบัญชา และการเงินรับรองด้วยนะคะ',
                'การถ่ายรูปขอให้อยู่ในแนวตั้งนะคะ',
                'หากอัพโหลดผิดหรือต้องการเปลี่ยนรูปเอกสาร สามารถอัพโหลดซ้ำไปได้เลยค่ะ',
              ]}
              footer={
                <>
                  {_renderAttachmentList(salary)}
                  <AppImagePicker onResult={onSalary}>
                    <AppButtonView text="อัพโหลดไฟล์หลักฐาน" />
                  </AppImagePicker>
                </>
              }
            />
            <SizedBox height={15} />
            <UploadLabel
              key="statement_image"
              title="2. STATEMENT/รายการเดินบัญชีที่มีเงินเดือนเข้าล่าสุด"
              labelList={[
                'สามารถส่งเป็นรูปถ่ายหรือไฟล์ PDF ได้ค่ะเลือกปุ่มตามประเภทของไฟล์',
                'การถ่ายรูปขอให้อยู่ในแนวตั้งนะคะ',
                'หากอัพโหลดผิดหรือต้องการเปลี่ยนรูปเอกสาร สามารถอัพโหลดซ้ำไปได้เลยค่ะ',
              ]}
              footer={
                <>
                  {_renderAttachmentList(statement)}
                  <View style={styles.groupButton}>
                    <View style={styles.buttonFill}>
                      <AppImagePicker onResult={onStatementImage}>
                        <AppButtonView text="ส่งไฟล์รูปภาพ" />
                      </AppImagePicker>
                    </View>
                    <SizedBox width={10} />
                    <View style={styles.buttonFill}>
                      <AppPdfPicker onResult={onStatementPdf}>
                        <AppButtonView text="ส่งไฟล์ PDF" />
                      </AppPdfPicker>
                    </View>
                  </View>
                </>
              }
            />
            <SizedBox height={15} />
            <UploadLabel
              key="book_bank_image"
              title="3. รูปถ่ายหน้าสมุดบัญชีธนาคารที่มีชื่อเจ้าของบัญชี"
              labelList={[
                'การถ่ายรูปขอให้อยู่ในแนวตั้งนะคะ',
                'หากอัพโหลดผิดหรือต้องการเปลี่ยนรูปเอกสาร สามารถอัพโหลดซ้ำไปได้เลยค่ะ',
              ]}
              footer={
                <>
                  {_renderAttachmentList(bookBank)}
                  <AppImagePicker onResult={onBookBank}>
                    <AppButtonView text="อัพโหลดไฟล์หลักฐาน" />
                  </AppImagePicker>
                </>
              }
            />
            <SizedBox height={15} />
            <UploadLabel
              key="slip_image"
              title="4. เอกสารรับรองสลิปเงินเดือน จาก สำนักงานเขตฯ"
              labelList={[
                'การถ่ายรูปขอให้อยู่ในแนวตั้งนะคะ',
                'หากอัพโหลดผิดหรือต้องการเปลี่ยนรูปเอกสาร สามารถอัพโหลดซ้ำไปได้เลยค่ะ',
              ]}
              footer={
                <>
                  {_renderAttachmentList(slip)}
                  <AppImagePicker onResult={onSlip}>
                    <AppButtonView text="อัพโหลดไฟล์หลักฐาน" />
                  </AppImagePicker>
                </>
              }
            />
            <SizedBox height={30} />
            {_renderGuarantor()}
            <SizedBox height={30} />
            <AppButton
              text="บันทึกข้อมูล"
              onPress={onSave}
              disabled={!validate}
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

FormUploadDocument.defaultProps = {};

export default useNavigator(FormUploadDocument);

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 15,
    flex: 1,
    padding: 10,
  },
  br: {
    backgroundColor: '#E1E1E1',
    height: 1,
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonFill: {flex: 1},
  checkGuarantor: {
    flexDirection: 'row',
  },
  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fileItem: {
    width: '30%',
    height: 120,
    backgroundColor: Constant.color.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: Constant.color.gray,
    borderWidth: 1,
    marginBottom: 10,
  },
  filePdf: {
    width: '30%',
    height: 120,
    backgroundColor: Constant.color.whitesmoke,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: Constant.color.gray,
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankFile: {
    width: '30%',
  },
});
