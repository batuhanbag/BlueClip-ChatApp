import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components';
import { ChatMessage } from '../hooks/useGetChatMessages';
import { colors, spacing } from '../../../theme';

interface Props {
  message: ChatMessage;
  currentUser: { email: string; id: string };
}

export const MessageBubble: React.FC<Props> = ({ message, currentUser }) => {
  const isCurrentUserMessage = React.useMemo(
    () => message.user === currentUser.email,
    [message, currentUser]
  );

  const renderTimestamp = () => {
    const date = new Date(message.createdAt);
    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  };

  return (
    <View style={classes.container}>
      <View
        style={[
          classes.messageContainer,
          isCurrentUserMessage
            ? classes.currentUserMessageContainer
            : classes.otherMessageContainer
        ]}
      >
        <Text style={classes.usernameText} size='xxs' color='#888888'>
          {message.user}
        </Text>

        <View
          style={[
            classes.messageBubble,
            isCurrentUserMessage
              ? classes.currentUserMessageBubble
              : classes.otherMessageBubble
          ]}
        >
          <Text
            style={isCurrentUserMessage ? classes.right : classes.left}
            size='sm'
          >
            {message.text}
          </Text>
        </View>
        <View
          style={[
            classes.bottomContainer,
            isCurrentUserMessage ? classes.right : classes.left
          ]}
        >
          <Text size='xxs' color='#888888'>
            {renderTimestamp()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const classes = StyleSheet.create({
  container: {
    marginBottom: spacing.sm
  },
  usernameText: {
    marginBottom: spacing.xs
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: spacing.xs
  },
  currentUserMessageContainer: {
    alignSelf: 'flex-end'
  },
  otherMessageContainer: {
    alignSelf: 'flex-start'
  },
  messageBubble: {
    padding: spacing.sm,
    borderRadius: spacing.sm
  },
  currentUserMessageBubble: {
    backgroundColor: colors.palette.primary200
  },
  otherMessageBubble: {
    backgroundColor: colors.palette.neutral300
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xxs
  },
  left: {
    alignSelf: 'flex-start'
  },
  right: {
    alignSelf: 'flex-end'
  }
});
