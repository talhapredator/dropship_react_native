import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google Generative AI
import Markdown from "react-native-markdown-display"; // Import Markdown display
import { Color } from '../GlobalStyles';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const API_KEY = "AIzaSyDUpprMFxQxdqOIzrh8NDVyq5za_ttgLH0"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for Gemini response
  const flatListRef = useRef<FlatList>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(true); // State for welcome message
  const permanentPrompt = "Return answers in English only. Provide a Youtube video link if it exists.";

  const handleSend = async () => {
    if (text.trim()) {
      setWelcomeVisible(false);
      const userMessage: Message = { id: Date.now().toString(), text, isUser: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setText('');
      Keyboard.dismiss();
      setLoading(true); // Start loading animation
      // Fetch response from Gemini model using Google Generative AI
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `${permanentPrompt} ${text}`;

      try {
        const result = await model.generateContent(prompt); // Using your specified method
        const response = await result.response;
        const botResponseText = await response.text() || 'Sorry, I couldn’t understand that.';

        const youtubeLinkRegex = /(https?:\/\/(?:www\.)?youtube\.com\/[^\s]+|https?:\/\/(?:www\.)?youtu\.be\/[^\s]+)/;
        const youtubeLinkMatch = botResponseText.match(youtubeLinkRegex);
        
        if (youtubeLinkMatch) {
          const youtubeLink = youtubeLinkMatch[0];
          // Create a clickable message that opens the YouTube link
          const clickableMessage = `${botResponseText}\n\n[Click here to watch on YouTube](${youtubeLink})`;
          const botMessage: Message = { id: Date.now().toString(), text: clickableMessage, isUser: false };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } else {
          // If no YouTube link is found, just display the bot's response
          const botMessage: Message = { id: Date.now().toString(), text: botResponseText, isUser: false };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        }

        // // Create bot's message and add it to the chat
        // const botMessage: Message = { id: Date.now().toString(), text: botResponseText, isUser: false };
        // setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching response from Gemini API:', error);
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: 'Sorry, there was an issue connecting to the chatbot.',
          isUser: false,
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false); // End loading animation
      }
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
      {/* Directly use Markdown without wrapping in Text */}
      <Markdown style={{ body: { color: item.isUser ? '#fff' : '#fff' } }}>
        {item.text}
      </Markdown>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TechnoBuyer</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Color.colorRoyalblue_300} />
          <Text style={styles.loadingText}>Gemini is thinking...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          accessibilityLabel="Type your message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    backgroundColor: '#fff', // White background
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
   
    
    elevation: 2,
    maxWidth: '100%', // Adjust the max width to 80% of the screen width
    flexShrink: 1, // Allow the message to shrink if necessary
    flexWrap: 'wrap', // Ensure text wraps within the bubble
    
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: Color.colorRoyalblue_300,
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  messageText: {
    fontSize: 16,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#000',
    flexShrink: 1,
  
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: '#000',
  },
  sendButton: {
    backgroundColor: Color.colorRoyalblue_300,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: "15%",
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#888',
  },
});

export default Chatbot;
