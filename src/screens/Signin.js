import { Text, TextInput, View, Alert, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyCustomButton from '../components/MyCustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../api/auth';
import { AuthStyles as styles } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { resetTempValues } from '../../redux/features/authSlice';

import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { CUSTOM_MARGIN } from '../constants';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
import { APP_SCREENS } from '../constants';

export const LogInPerson = (props) => {
  return (
    <Svg
      width={WIDTH}
      height={(WIDTH * 187) / 310}
      viewBox="0 0 310 187"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_2_702)">
        <Path
          d="M237.343 184.885c-3.969-3.383-6.379-8.729-5.747-13.932.632-5.204 4.548-9.988 9.627-11.093 5.079-1.105 10.869 1.954 12.412 6.96.849-9.652 1.828-19.708 6.914-27.927 4.605-7.443 12.581-12.768 21.225-13.721 8.645-.952 17.746 2.646 23.137 9.53 5.391 6.884 6.711 16.892 2.935 24.796-2.781 5.822-7.906 10.155-13.275 13.68-17.35 11.295-38.159 15.888-58.598 12.935l1.37-1.228z"
          fill="#F2F2F2"
        />
        <Path
          d="M296.363 128.017a140.836 140.836 0 00-19.536 19.573 142.14 142.14 0 00-22.004 37.101c-.396.979 1.181 1.406 1.573.437 8.856-21.824 22.993-41.06 41.12-55.947.814-.669-.346-1.827-1.153-1.164z"
          fill="#fff"
        />
        <Path
          d="M99.794 183.966c5.451-4.648 8.762-11.989 7.894-19.137-.868-7.147-6.247-13.717-13.223-15.235-6.976-1.518-14.929 2.683-17.048 9.56-1.166-13.257-2.51-27.069-9.495-38.359-6.325-10.222-17.28-17.536-29.154-18.845-11.873-1.308-24.374 3.634-31.778 13.089-7.405 9.455-9.218 23.202-4.032 34.057 3.82 7.997 10.859 13.948 18.234 18.79 23.527 15.447 52.714 21.889 80.485 17.766"
          fill="#F2F2F2"
        />
        <Path
          d="M18.73 105.858a193.373 193.373 0 0126.833 26.883 197.137 197.137 0 0121.16 31.599 196.897 196.897 0 019.062 19.359c.544 1.345-1.621 1.931-2.16.6a193.43 193.43 0 00-17.462-33.337 193.683 193.683 0 00-23.42-29.192 192.461 192.461 0 00-15.596-14.315c-1.118-.918.475-2.508 1.584-1.597z"
          fill="#fff"
        />
        <Path
          d="M222.523 186.591H92.465V51.951C92.465 23.305 115.563 0 143.954 0h27.081c28.39 0 51.488 23.305 51.488 51.95v134.641z"
          fill="#F2F2F2"
        />
        <Path
          d="M195.443 186.591H92.465V51.951a51.864 51.864 0 0110.549-31.503 51.686 51.686 0 0110.959-10.732c.235-.173.471-.342.71-.512a51.217 51.217 0 0111.929-6.184A50.953 50.953 0 01138.413.3a51.66 51.66 0 0111.083 0c.24.025.481.05.718.083a50.943 50.943 0 0111.082 2.637c.239.086.479.177.715.267a51.07 51.07 0 0111.799 6.335 51.829 51.829 0 0111.085 10.827 51.863 51.863 0 0110.548 31.502v134.64z"
          fill="#CCC"
        />
        <Path
          d="M187.069 126.371c3.149 0 5.701-2.575 5.701-5.752 0-3.177-2.552-5.752-5.701-5.752-3.149 0-5.701 2.575-5.701 5.752 0 3.177 2.552 5.752 5.701 5.752z"
          fill="#6C63FF"
        />
        <Path
          d="M211.869 182.558H207.5l-2.078-17.001h6.447v17.001z"
          fill="#FFB8B8"
        />
        <Path
          d="M204.38 181.298h8.424v5.353h-13.729a5.392 5.392 0 011.554-3.785 5.291 5.291 0 013.751-1.568z"
          fill="#2F2E41"
        />
        <Path
          d="M233.604 182.558h-4.368l-2.079-17.001h6.448l-.001 17.001z"
          fill="#FFB8B8"
        />
        <Path
          d="M226.115 181.298h8.425v5.353h-13.729a5.392 5.392 0 011.553-3.785 5.312 5.312 0 011.721-1.16 5.268 5.268 0 012.03-.408z"
          fill="#2F2E41"
        />
        <Path
          d="M189.954 121.758a3.887 3.887 0 01.275-4.698 3.846 3.846 0 011.333-.998l14.85-41.296 7.307 4.023-16.956 39.465a3.918 3.918 0 01-.026 2.759 3.87 3.87 0 01-1.836 2.045 3.814 3.814 0 01-2.718.298 3.847 3.847 0 01-2.229-1.598zM231.373 129.518a3.83 3.83 0 01-1.226-1.127 3.881 3.881 0 01-.569-3.217 3.877 3.877 0 01.764-1.486l-4.6-43.685 8.315.383 1.912 42.97a3.895 3.895 0 011.175 2.491 3.906 3.906 0 01-.76 2.65 3.843 3.843 0 01-2.314 1.471 3.814 3.814 0 01-2.697-.45zM218.107 67.116c4.833 0 8.751-3.953 8.751-8.83 0-4.877-3.918-8.83-8.751-8.83-4.834 0-8.752 3.953-8.752 8.83 0 4.877 3.918 8.83 8.752 8.83z"
          fill="#FFB8B8"
        />
        <Path
          d="M231.317 119.583h-26.385l.032-.207c.048-.31 4.702-31.077 1.269-41.142a4.287 4.287 0 01.085-3.04 4.236 4.236 0 012.078-2.203c4.907-2.332 14.327-5.203 22.277 1.765a10.15 10.15 0 012.669 3.804c.585 1.46.825 3.037.702 4.607l-2.727 36.416z"
          fill="#2C2E3A"
        />
        <Path
          d="M210 92.846l-11.879-2.431 5.568-13.313a5.028 5.028 0 012.298-3.069 4.95 4.95 0 013.775-.534 4.995 4.995 0 013.047 2.311 5.072 5.072 0 01.539 3.807L210 92.847zM225.213 97.36l-.714-16.516c-.541-3.105 1.22-6.04 3.93-6.52 2.71-.478 5.356 1.676 5.9 4.803l2.684 15.434-11.8 2.8z"
          fill="#2C2E3A"
        />
        <Path
          d="M230.439 117.606c4.245 16.313 4.709 37.055 3.563 59.68l-5.701-.719-10.333-43.143-5.701 43.862-6.414-.36c-1.916-23.739-3.782-44.118-.713-57.523l25.299-1.797z"
          fill="#5F5E76"
        />
        <Path
          d="M223.873 65.11c-1.633 1.755-4.665.813-4.877-1.584a2.903 2.903 0 01.003-.56c.11-1.061.718-2.025.572-3.146a1.652 1.652 0 00-.299-.773c-1.301-1.758-4.355.786-5.583-.805-.753-.976.132-2.512-.445-3.603-.763-1.439-3.022-.729-4.438-1.517-1.576-.877-1.482-3.317-.444-4.8 1.265-1.81 3.483-2.776 5.674-2.915 2.19-.14 4.366.458 6.411 1.262 2.323.914 4.627 2.177 6.057 4.238 1.739 2.507 1.907 5.877 1.037 8.809-.529 1.783-2.335 3.962-3.668 5.394z"
          fill="#2F2E41"
        />
        <Path
          d="M299.304 186.822H36.234a.43.43 0 010-.856h263.07c.112 0 .22.045.299.126a.431.431 0 010 .604.422.422 0 01-.299.126z"
          fill="#3F3D56"
        />
        <Path
          d="M167.115 147.583h-46.322a2.298 2.298 0 01-1.631-.67 2.338 2.338 0 01-.685-1.637V40.955a2.336 2.336 0 01.685-1.637 2.295 2.295 0 011.631-.67h46.322a2.295 2.295 0 011.631.67c.434.433.68 1.021.685 1.637v104.321a2.338 2.338 0 01-.685 1.637 2.298 2.298 0 01-1.631.67z"
          fill="#fff"
        />
        <Path
          d="M169.431 72.403h-50.954v.72h50.954v-.72zM169.609 113.428h-50.954v.719h50.954v-.719z"
          fill="#CCC"
        />
        <Path
          d="M135.224 38.648h-.713v109.294h.713V38.648zM153.04 38.648h-.712v109.294h.712V38.648z"
          fill="#CCC"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_702">
          <Path fill="#fff" d="M0 0H310V187H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const Signin = ({ navigation }) => {

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // hooks
  const dispatch = useDispatch();
  const { isLoading, isSuccess, userVerified } = useSelector(state => state.auth);
  const { value } = useSelector(state => state.hostname);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      dispatch(resetTempValues())
    }
    )
  }, [navigation])


  useEffect(() => {
    if (isSuccess && !userVerified) {
      // Alert.alert("Signup success verify OTP")
      navigation.navigate(APP_SCREENS.OTPVERIFY, { source: APP_SCREENS.SIGNUP, email: email });
    }
  }, [isSuccess])
  // functions
  const handleSignin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('error', 'enter_credentials');
      return;
    }
    const params = {
      username: email,
      password: password,
      hostname: value
    };
    //console.log('~ file: signinin.js:32 ~ signin ~ params:', params);
    dispatch(signin(params));
  };

  return (
    <View style={styles.container}>
      <LogInPerson />
      <Text style={styles.title}>{"signin"}</Text>
      <TextInput
        value={email}
        placeholder={"enter_email"}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <View style={styles.input}>
        <TextInput
          value={password}
          placeholder={"enter_password"}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          placeholderTextColor="grey"
          style={{ width: '90%' }}

        />
        <Pressable onPress={() => { setHidePassword(!hidePassword) }} style={{ justifyContent: 'center' }}>
          <MaterialCommunityIcons name={hidePassword ? "eye-off" : "eye"} color={"black"} size={26} />
        </Pressable>
      </View>
      <MyCustomButton isLoading={isLoading} title={"signin"} onPress={handleSignin} BtnStyle={styles.BtnStyle} TextStyle={styles.TextStyle} />

      <Pressable onPress={() => navigation.navigate(APP_SCREENS.SIGNUP)}>
        <Text style={[styles.TextStyle, { color: 'black' }]}>
          {"not_have_account_Sign_Up"}
        </Text>
      </Pressable>

    </View>
  );
};


export default Signin;
