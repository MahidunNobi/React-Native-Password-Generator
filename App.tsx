import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import {Formik} from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 character')
    .max(12, 'Should be max of 12 character')
    .required('Length is  required'),
});

export default function App() {
  const [password, setPassword] = useState<string>('');
  const [isPassGenerated, setIsPassGenerated] = useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(false);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);

  const generatePassword = (passLength: number) => {
    let characterList = '';

    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBERS = '0123456789';
    const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:",.<>?/`~';

    if (uppercase) {
      characterList += UPPERCASE;
    }
    if (lowercase) {
      characterList += LOWERCASE;
    }
    if (numbers) {
      characterList += NUMBERS;
    }
    if (symbols) {
      characterList += SYMBOLS;
    }
    const passwordResult = createPassword(characterList, passLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passLength: number) => {
    let result = '';
    for (let i = 0; i < passLength; i++) {
      const index = Math.round(Math.random() * characters.length);
      result += characters.charAt(index);
    }
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowercase(false);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.mainTitle}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePassword(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.inputTilte}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder={'Ex. 8'}
                      keyboardType={'numeric'}
                    />
                  </View>
                </View>

                <View style={styles.inputColumn}>
                  <Text style={styles.label}> Include Lowercase </Text>
                  <BouncyCheckbox
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputColumn}>
                  <Text style={styles.label}> Include Uppercase </Text>
                  <BouncyCheckbox
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputColumn}>
                  <Text style={styles.label}> Include Number </Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputColumn}>
                  <Text style={styles.label}> Include Symbold </Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#29AB87"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.btnText}> Generate Password </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secoundryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.secoundryBtnText}> Reset </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          {isPassGenerated ? (
            <View>
              <Text> {password}</Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  inputColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginVertical: 8,
  },
  inputTilte: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 4,
    padding: 8,
    minWidth: 100,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 24,
  },
  primaryBtn: {
    flexGrow: 1,
    backgroundColor: '#13b02b',
    padding: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secoundryBtn: {
    flexGrow: 1,
    borderWidth: 2,
    borderColor: '#949494',
    padding: 16,
    borderRadius: 8,
  },
  secoundryBtnText: {
    color: '#949494',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
