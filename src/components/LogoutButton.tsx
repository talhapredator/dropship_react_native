// import React, { useState } from 'react';
// import styled from 'styled-components/native';
// import axios from 'axios';
// import { Text, StyleSheet, Image, View, Pressable } from "react-native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { useNavigation, ParamListBase } from "@react-navigation/native";

// interface LogoutButtonProps {
//     onLogoutSuccess: () => void; 
//   }

// const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
//     const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
//     const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://192.168.18.5:8080/api/auth/logout'); // Replace with your API URL
//       navigation.navigate('StartScreen'); // Redirect user to login page after logout
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleShowConfirmation = () => {
//     setShowConfirmation(true); // Show confirmation options
//   };

//   const handleCancel = () => {
//     setShowConfirmation(false); // Hide confirmation options
//   };

//   return (
//     <StyledContainer>
//         {showConfirmation ? (
//             <StyledConfirmationBox>
//                 <ConfirmationText>Are you sure you want to logout?</ConfirmationText>
//                 <ButtonGroup>
//                     <StyledLogoutButton onPress={handleLogout}>
//                         <Text style={{ color: 'white' }}>Yes, Logout</Text>
//                     </StyledLogoutButton>
//                     <StyledBackButton onPress={handleCancel}>
//                         <Text style={{ color: 'black' }}>Back</Text>
//                     </StyledBackButton>
//                 </ButtonGroup>
//             </StyledConfirmationBox>
//         ) : (
//             <StyledLogoutButton onPress={handleShowConfirmation}>
//                 <Text style={{ color: 'white' }}>Logout</Text>
//             </StyledLogoutButton>
//         )}
//     </StyledContainer>
// );
// };

// // Styled components
// const StyledContainer = styled.View`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f4f6f8;
// `;

// const StyledLogoutButton = styled.TouchableOpacity`
//   background-color: #4169e1; /* Royal blue */
//   color: #fff;
//   padding: 12px 24px;
//   border: none;
//   border-radius: 30px;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #27408b; /* Darker royal blue */
//   }

//   &:active {
//     background-color: #1e3a8a; /* Even darker royal blue */
//   }
// `;

// const StyledBackButton = styled.TouchableOpacity`
//   background-color: #ffffff; /* White background */
//   color: #4169e1; /* Royal blue text */
//   padding: 12px 24px;
//   border: 2px solid #4169e1;
//   border-radius: 30px;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   margin-left: 16px;
//   transition: background-color 0.3s ease, color 0.3s ease;

//   &:hover {
//     background-color: #f0f0f0; /* Light gray on hover */
//   }

//   &:active {
//     background-color: #e0e0e0; /* Darker gray on click */
//   }
// `;

// const StyledConfirmationBox =  styled.View`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #ffffff; /* White box background */
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// `;

// const ConfirmationText =  styled.Text`
//   font-size: 1.2rem;
//   font-weight: 600;
//   color: #333333;
//   margin-bottom: 16px;
// `;

// const ButtonGroup = styled.View`
//   display: flex;
//   justify-content: center;
//   gap: 16px;
// `;

// export default LogoutButton;
