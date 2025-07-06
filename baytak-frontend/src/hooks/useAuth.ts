"use client";

import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:3000/auth/login", { username, password });
      const token = data.access_token;

      // Save token to localStorage
      localStorage.setItem("token", token);
      message.success("Login successful");

      // Redirect or return token
      router.push("/admin/dashboard");
      return token;
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/auth/register", { username, password });
      message.success("Signup successful");
      router.push("/admin/login");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return {
    login,
    signup,
    logout,
    getToken,
    loading,
  };
}
