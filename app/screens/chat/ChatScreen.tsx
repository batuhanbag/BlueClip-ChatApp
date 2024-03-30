import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';
import { Loading, TextField } from '../../components';
import { MessageBubble } from './components/MessageBubble';
import { SendButton } from './components/SendButton';
import { ChatMessage, useGetChatMessages } from './hooks/useGetChatMessages';
import { generateSecureId } from '../../utils/generateId';
import { auth, database } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Header from '../../components/Header';

export const ChatScreen = () => {
  const { messages, pending } = useGetChatMessages();
  const [inputText, setInputText] = useState<string>('');
  const flatListRef = useRef<FlatList<ChatMessage> | null>(null);

  const handleSend = useCallback((msg: string) => {
    const body = {
      _id: generateSecureId(),
      text: msg,
      user: auth?.currentUser?.email,
      createdAt: new Date().toISOString()
    };

    setInputText('');
    addDoc(collection(database, 'chats'), body).then(() => {
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <MessageBubble
      message={item}
      currentUser={
        {
          email: auth.currentUser?.email,
          id: auth.currentUser?.uid
        } as { email: string; id: string }
      }
    />
  );

  if (pending) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={clasess.container}>
      <Header title='BlueClip Chat Group' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={clasess.keyboardAvoidingContainer}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `message-bubble-${item._id.toString()}`}
          contentContainerStyle={clasess.flatListContentContainer}
          ListFooterComponent={<View style={{ height: spacing.lg }} />}
        />

        <TextField
          value={inputText}
          onChangeText={setInputText}
          placeholder='Type your message...'
          RightAccessory={() => (
            <SendButton handleSend={handleSend} inputText={inputText} />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const clasess = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: colors.palette.neutral100
  },
  keyboardAvoidingContainer: {
    flex: 1
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%'
  },
  myMessageBubble: {
    backgroundColor: colors.palette.neutral500
  },
  otherMessageBubble: {
    backgroundColor: '#e5e5e5'
  },

  flatListContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});
