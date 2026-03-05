import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


// ================= LOGIN SCREEN =================
function LoginScreen({ navigation }) {

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePhone = (number) => {
    const regex = /^0\d{9}$/;
    return regex.test(number);
  };

  const formatPhone = (text) => {

    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = cleaned.slice(0,3) + " " + cleaned.slice(3);
    }
    else if (cleaned.length > 6) {
      formatted =
        cleaned.slice(0,3) +
        " " +
        cleaned.slice(3,6) +
        " " +
        cleaned.slice(6,10);
    }

    setPhone(formatted);

    if(cleaned.length > 0 && !validatePhone(cleaned)){
      setError("Số điện thoại không đúng định dạng");
    }else{
      setError("");
    }
  };

  const handleSubmit = () => {

    const cleaned = phone.replace(/\s/g, "");

    if (!validatePhone(cleaned)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại không đúng định dạng"
      );
      return;
    }

    navigation.navigate("Home", { phone: cleaned });
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Số điện thoại</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={formatPhone}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


// ================= HOME SCREEN =================
function HomeScreen({ route, navigation }) {

  const { phone } = route.params;

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.homeTitle}>Trang chủ</Text>

        <Text style={styles.label}>Số điện thoại đăng nhập</Text>

        <Text style={styles.phone}>{phone}</Text>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


// ================= APP =================
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Đăng nhập" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


// ================= STYLE =================
const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f2f2f2"
  },

  card:{
    width:"85%",
    backgroundColor:"#fff",
    padding:25,
    borderRadius:15,
    elevation:5
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:"center"
  },

  homeTitle:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:"center"
  },

  label:{
    fontSize:16,
    color:"#555",
    marginBottom:5
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:12,
    borderRadius:8,
    marginBottom:10
  },

  error:{
    color:"red",
    marginBottom:10
  },

  button:{
    backgroundColor:"#007AFF",
    padding:12,
    borderRadius:8,
    alignItems:"center",
    marginTop:10
  },

  logout:{
    backgroundColor:"#e53935",
    padding:12,
    borderRadius:8,
    alignItems:"center",
    marginTop:20
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },

  phone:{
    fontSize:22,
    fontWeight:"bold",
    color:"#2e7d32"
  }

});