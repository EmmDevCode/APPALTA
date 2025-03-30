import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token al iniciar
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("@auth_token");
        
        if (storedToken) {
          setUserToken(storedToken);
          router.replace("/(app)/home");
        } else {
          router.replace("/(auth)/welcome");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem("@auth_token", token);
      setUserToken(token);
      router.replace("/(app)/home");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@auth_token");
      setUserToken(null);
      router.replace("/(auth)/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const signUp = async (token: string) => {
    try {
      await AsyncStorage.setItem("@auth_token", token);
      setUserToken(token);
      router.replace("/(app)/home");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const authContext: AuthContextType = {
    userToken,
    isLoading,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};