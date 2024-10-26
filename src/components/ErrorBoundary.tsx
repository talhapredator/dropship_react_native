// ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorBoundaryProps {
    children: React.ReactNode;
  }
  
  interface ErrorBoundaryState {
    hasError: boolean;
  }
  
  class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error("Error occurred in ErrorBoundary:", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Something went wrong. Please try again later.</Text>
          </View>
        );
      }
  
      return this.props.children;
    }
  }

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ErrorBoundary;
