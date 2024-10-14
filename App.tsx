import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import * as Yup from 'yup';

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
    <View>
      <Text>This is a React Native Password Generator</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
