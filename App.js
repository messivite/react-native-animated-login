import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView,
  Image, 
  Dimensions,
  ImageBackground,
  TextInput, 
  TouchableOpacity,
  Animated,
Keyboard, 
Easing} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

console.disableYellowBox = true;
export default function App() {
  const initialLogo = {x:200,y:185}
  const {height} = Dimensions.get('window');
  const [offset]= useState(new Animated.ValueXY({x:20,y:10}));
  const [opacity]= useState(new Animated.Value(0));
  const [logo]= useState(new Animated.ValueXY({...initialLogo}));
  
  useEffect(()=>{
    KeyboardDidShowListener=Keyboard.addListener('keyboardDidShow',keyboardDidShow);
    KeyboardDidHideListener=Keyboard.addListener('keyboardDidHide',keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y,{
        toValue:0,
        speed:1,
        bounciness:25
      
      }),

      Animated.timing(opacity,{
        toValue:1,
        duration:100,
   
      })
      
    ]).start();

  },[]);

const keyboardDidShow = () =>{
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:100,
        duration:40,
        easing:Easing.ease
      
      }),
      Animated.timing(logo.y,{
        toValue:115,
        duration:40,
        easing:Easing.ease
    
      }),
      Animated.timing(offset.y,{
        toValue: -height * 0.30,
        duration:600,
        easing:Easing.linear
       
      })
    
    ]).start();
  }
 const keyboardDidHide = () =>{
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:130,
        duration:100,
       
      }),
      Animated.timing(logo.y,{
        toValue:155,
        duration:100,
    
      }),
      Animated.timing(offset.y,{
        toValue:10,
        duration:100,
     
      })
   
    ]).start();
  }

  return (

   
    <ImageBackground 
    style={{
      flex:1,
      backgroundColor:'rgba(0,0,0,0.4)'
    }}
      source={require('./assets/bg.jpeg')}
  
    >
 <StatusBar style="light" />
<LinearGradient
    // Background Linear Gradient
    colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.3)','rgba(0,0,0,0.2)']}
    style={styles.linearGradient} />
  
    <KeyboardAvoidingView 
   onStartShouldSetResponder={()=>{
    Keyboard.dismiss();
   }}
    style={styles.background}>




      <View style={styles.containerLogo}>
        <Animated.Image 
        style={{width:logo.x, height:logo.y}}
        source={require('./assets/logo2.png')} />
      </View>

      <Animated.View 
      style={[
        styles.container,
        {
          opacity: opacity,
          transform:[
          {
            translateY:offset.y,
          
          },
         
          ]
        }
      ]}
      >
        <TextInput
        style={styles.input}
        placeholder='Email'
        autoCorrect={false}
        onChangeText={()=>{}}
        />
        <TextInput
        style={styles.input}
        placeholder='Şifre'
        autoCorrect={false}
        onChangeText={()=>{}}
        />

       
          <LinearGradient
          colors={['rgba(41,168,66,1)','rgba(23,132,45,1)']}
          start={{ y: 0.0, x: 0.0 }} 
          end={{ y: 0.0, x: 1.0 }}
          style={styles.btnSubmit}
          >
            <TouchableOpacity >
              <Text style={styles.submitText}>Giriş yap</Text>
            </TouchableOpacity>
          </LinearGradient>
          
     
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Henüz Üye değil misin? Üye ol</Text>
        </TouchableOpacity>
      </Animated.View>

  
       
     

    </KeyboardAvoidingView>
    </ImageBackground>
  
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient:{
    position: 'absolute',
    left: 0,
    right: 0,
    flex:1,
    top: 0,
    height: '100%'
  },
  containerLogo:{
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input:{
    backgroundColor:'#fff',
    color: '#222',
    width: '90%',
    marginBottom:15,
    padding: 15,
    borderRadius:20,
    fontSize:17,
  },
  btnSubmit:{
   
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height:45,
    borderRadius:20,
  },
  submitText:{
    fontSize:17,
    color: '#fff',
  },
  btnRegister:{
    marginTop:10,
  },
  registerText:{
    color: '#fff',
  },
});
