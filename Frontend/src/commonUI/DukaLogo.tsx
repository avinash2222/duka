import { Image as ExpoImage } from "expo-image";
import { StyleSheet, View } from "react-native";

type DukaLogoProps = {
  width?: number;
  height?: number;
};

export function DukaLogo({ width = 220, height = 240 }: DukaLogoProps) {
  return (
    <View style={[styles.wrapper, { width, height }]}>
      <ExpoImage
        source={require("../../assets/duka_logo.svg")}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

