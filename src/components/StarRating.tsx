import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or you can use MaterialIcons

type StarRatingProps = {
  rating: number;
  size?: number;
  color?: string;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 24, color = '#FFD700' }) => {
  const MAX_STARS = 5;

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < MAX_STARS; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<Icon key={i} name="star" size={size} color={color} />);
      } else if (i < rating) {
        stars.push(<Icon key={i} name="star-half-o" size={size} color={color} />);
      } else {
        stars.push(<Icon key={i} name="star-o" size={size} color={color} />);
      }
    }
    return stars;
  };

  return <View style={styles.starContainer}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
