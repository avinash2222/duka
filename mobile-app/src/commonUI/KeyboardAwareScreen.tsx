import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@theme/tokens";

type KeyboardAwareScreenProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function KeyboardAwareScreen({
  children,
  contentContainerStyle,
}: KeyboardAwareScreenProps) {
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const dismissMode = Platform.OS === "ios" ? "interactive" : "on-drag";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={dismissMode}
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  keyboard: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  content: {
    flexGrow: 1,
    backgroundColor: tokens.colors.background,
  },
});

