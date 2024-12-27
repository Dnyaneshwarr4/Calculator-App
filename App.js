import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
function App() {
  const [input, setInput] = useState("");
  
  // Background animation setup
  const backgroundColor = new Animated.Value(0);
  
  // Animation logic for background color change
  Animated.loop(
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    })
  ).start();

  // Handle button press
  const handlePress = (value) => {
    setInput(input + value);
  };

  // Handle all clear
  const handleAC = () => {
    setInput(""); // Clears the entire screen
  };

  // Handle clear (delete last character)
  const handleClear = () => {
    setInput(input.slice(0, -1)); // Removes last character
  };

  // Handle evaluation
  const handleEvaluate = () => {
    try {
      setInput(eval(input).toString());
    } catch (e) {
      setInput("Error");
    }
  };

  // Interpolating background color for the animation effect
  const backgroundColorInterpolation = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000000", "#FFFFFF"], // Black to white transition
  });

  return (
    <View style={styles.app}>
      <Animated.View
        style={[
          styles.background,
          { backgroundColor: backgroundColorInterpolation },
        ]}
      >
        {/* Display Input */}
        <Text style={styles.input}>{input}</Text>

        {/* Calculator buttons */}
        <View style={styles.buttonContainer}>
          {["7", "8", "9", "/"].map((item, index) => (
            <Pressable
              key={index}
              style={styles.button}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </Pressable>
          ))}
          {["4", "5", "6", "*"].map((item, index) => (
            <Pressable
              key={index}
              style={styles.button}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </Pressable>
          ))}
          {["1", "2", "3", "-"].map((item, index) => (
            <Pressable
              key={index}
              style={styles.button}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </Pressable>
          ))}
          {["0", ".", "=", "+"].map((item, index) => (
            <Pressable
              key={index}
              style={[styles.button, item === "=" && styles.equalsButton]}
              onPress={item === "=" ? handleEvaluate : () => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        {/* AC and Clear Buttons */}
        <View style={styles.clearContainer}>
          <Pressable onPress={handleAC} style={styles.acButton}>
            <Text style={styles.acButtonText}>AC</Text>
          </Pressable>
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>C</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>Calc by Dnyaneshwar</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  input: {
    fontSize: 48,
    textAlign: "right",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 80,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "22%",
    padding: 20,
    margin: 5,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
  },
  equalsButton: {
    backgroundColor: "green",
  },
  clearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  acButton: {
    backgroundColor: "#f44336", // Red for AC
    padding: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  acButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#FF9800", // Orange for C
    padding: 20,
    borderRadius: 5,
    flex: 1,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default App;
