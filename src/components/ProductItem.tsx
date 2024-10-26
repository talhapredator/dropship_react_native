import React, { useState, useEffect } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

interface ProductItemProps {
  productId: number;
  productName: string;
  productImageUri: string[]; // This is now an array of st
  productPrice: number;
  quantity: number; // Directly use the quantity from cart
  onCartUpdate: (updatedCart: any) => void; // Notify the parent when cart updates
}

// Function to update the cart item quantity
const updateCartItemQuantity = async (productId: number, quantity: number, onCartUpdate: (cart: any) => void) => {
  try {
    const response = await axios.put(`http://192.168.18.5:8080/api/cart/update/${productId}`, null, {
      params: { quantity },
    });

    if (response.status === 200) {
      const updatedCart = response.data; // Updated cart from server (including cartTotal)
      onCartUpdate(updatedCart); // Pass updated cart to parent (includes cartTotal)
    } else {
      console.log('Failed to update cart item');
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  productName,
  productImageUri,
  productPrice,
  quantity, // Use the quantity from server
  onCartUpdate,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  useEffect(() => {
    setCurrentQuantity(quantity); // Update the state when quantity from parent changes
  }, [quantity]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 0) return; // Prevent negative quantity
    setCurrentQuantity(newQuantity);

    // Update the quantity on the server and fetch the updated cart
    await updateCartItemQuantity(productId, newQuantity, onCartUpdate);
  };

  const formattedPrice = productPrice ? productPrice.toFixed(2) : '0.00';

  return (
    <ProductContainer>
       <ProductImage source={{ uri: productImageUri[0] }} /> 
      <ProductDetails>
        <ProductName>{productName}</ProductName>
        <ProductPrice>PKR {formattedPrice}/-</ProductPrice>
        <ButtonContainer>
          <QuantityButton
            onPress={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 0}
            activeOpacity={quantity > 0 ? 0.7 : 1} // Controls opacity for disabled state
          >
            <QuantityButtonText style={{ color: quantity > 0 ? 'royalblue' : 'grey' }}>-</QuantityButtonText>
          </QuantityButton>
          <QuantityText>{quantity}</QuantityText>
          <QuantityButton onPress={() => handleQuantityChange(quantity + 1)} activeOpacity={0.7}>
            <QuantityButtonText>+</QuantityButtonText>
          </QuantityButton>
        </ButtonContainer>
      </ProductDetails>
    </ProductContainer>
  );
};



const ProductContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  elevation: 3;
  margin: 10px;
`;

const ProductImage = styled.Image`
  width: 30%;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
`;

const ProductDetails = styled.View`
  flex: 1;
`;

const ProductName = styled.Text`
  font-family: 'DM Sans';
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const ProductPrice = styled.Text`
  font-family: 'DM Sans';
  font-size: 12px;
  color: black;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const QuantityButton = styled(TouchableOpacity)`
  background-color: lightgrey;
  padding: 0px 12px;
  border-radius: 40px;
  margin: 0 0px;
`;

const QuantityButtonText = styled.Text`
  font-family: 'DM Sans';
  font-size: 20px;
  color: royalblue;
`;

const QuantityText = styled.Text`
  font-family: 'DM Sans';
  font-size: 16px;
  color: #333;
  margin: 0 10px;
`;

// const updateCartItemQuantity = async (productId: number, quantity: number) => {
//   try {
//     await axios.put(`http://192.168.18.5:8080/api/cart/update/${productId}`, null, {
//       params: { quantity }
//     });
//   } catch (error) {
//     console.error('Error updating cart item quantity:', error);
//   }
// };

// const ProductItem: React.FC<ProductItemProps> = ({ productId, productName, productImageUri, productPrice, initialQuantity }) => {
//   const [quantity, setQuantity] = useState<number>(initialQuantity);

//   useEffect(() => {
//     setQuantity(initialQuantity); // Reset quantity when initialQuantity changes
//   }, [initialQuantity]);

//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity < 0) return; // Prevent negative quantities
//     setQuantity(newQuantity);
//     updateCartItemQuantity(productId, newQuantity); // Update quantity in backend
//   };

//   const formattedPrice = productPrice ? productPrice.toFixed(2) : '0.00';

//   return (
//     <ProductContainer>
//       <ProductImage source={productImageUri} />
//       <ProductDetails>
//         <ProductName>{productName}</ProductName>
//         <ProductPrice>${formattedPrice}</ProductPrice>
//         <ButtonContainer>
//           <QuantityButton onPress={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 0}>
//             <QuantityButtonText style={{ color: quantity > 0 ? 'white' : 'grey' }}>-</QuantityButtonText>
//           </QuantityButton>
//           <QuantityText>{quantity}</QuantityText>
//           <QuantityButton onPress={() => handleQuantityChange(quantity + 1)}>
//             <QuantityButtonText>+</QuantityButtonText>
//           </QuantityButton>
//         </ButtonContainer>
//       </ProductDetails>
//     </ProductContainer>
//   );
// };

export default ProductItem;
