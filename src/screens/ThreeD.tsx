// view/screens/ThreeD.tsx

import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Suspense, useState} from 'react';
import {Canvas} from '@react-three/fiber/native';
import Model from '../components/Model';
import useControls from 'r3f-native-orbitcontrols';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Trigger from '../components/Trigger';
import Loader from '../components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const ThreeD = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [OrbitControls, events] = useControls();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modelContainer} {...events}>
        {loading && <Loader />}
        <Canvas>
          <OrbitControls enablePan={false} />
          <directionalLight position={[1, 0, 0]} args={['white', 5]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 5]} />
          <directionalLight position={[0, 0, 1]} args={['white', 5]} />
          <directionalLight position={[0, 0, -1]} args={['white', 5]} />
          <directionalLight position={[0, 1, 0]} args={['white', 5]} />
          <directionalLight position={[0, -1, 0]} args={['white', 5]} />
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
            <Model />
          </Suspense>
        </Canvas>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>NVIDIA RTX 4070</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.textButton}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThreeD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  modelContainer: {
    flex: 1,
    top: "-10%"
  },
  bottomContainer: {
    
    height: "30%",
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    margin: 20,
    marginBottom: 0,
  },
  textTitle: {
    fontSize: 28,
    color: '#051E47',
    fontWeight: 'bold',
  },
  textPrice: {
    fontSize: 28,
    color: '#3F6900',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
    marginVertical: 10,
  },
  buttonContainer: {
    marginHorizontal: 90,
    marginBottom: "10%",
  },
  button: {
    backgroundColor: Color.colorRoyalblue_300,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
