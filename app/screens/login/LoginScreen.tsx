import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text, TextField } from '../../components';
import { colors, spacing } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { validateEmail } from '../../utils/validateEmail';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../config/firebase';

const DUMMY_PASSWORD = 'Password.!1BlueClipChatApp';
const ALREADY_IN_USE_ERROR = 'auth/email-already-in-use';

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [pending, setPending] = useState(false);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');

  const handleEmailChange = (text: string) => {
    setSubmitted(false);
    setEmail(text);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const error = validateEmail(email);
    if (error === '') {
      setPending(true);
      try {
        setEmailError('');
        await createUserWithEmailAndPassword(auth, email, DUMMY_PASSWORD);
      } catch (error) {
        //@NOTE - There is no register page in the requests that's why I handled login and register like this.
        if ((error as { code: string }).code === ALREADY_IN_USE_ERROR) {
          await signInWithEmailAndPassword(auth, email, DUMMY_PASSWORD);
        }
      } finally {
        setPending(false);
      }
    }
    setEmailError(error);
  };

  return (
    <SafeAreaView style={classes.container}>
      <KeyboardAvoidingView
        style={classes.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={classes.content}>
          <View>
            <Text preset='heading' text='Welcome,' style={classes.titleText} />
            <Text preset='heading' text='Log In' style={classes.titleText} />
          </View>
          <View style={classes.fieldContainer}>
            <TextField
              onChangeText={handleEmailChange}
              helper={isSubmitted ? emailError : ''}
              status={
                isSubmitted
                  ? emailError === ''
                    ? undefined
                    : 'error'
                  : undefined
              }
              label='Email'
            />
            <Button
              preset='primary'
              text='Log In'
              style={classes.button}
              loading={pending}
              disabled={pending}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.palette.neutral100
  },
  content: {
    padding: spacing.md,
    width: '100%'
  },
  titleText: {
    marginBottom: spacing.sm
  },
  fieldContainer: {
    marginVertical: spacing.xxl
  },
  button: {
    marginTop: spacing.xl
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.palette.neutral100
  }
});
