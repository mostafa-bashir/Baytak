"use client";

import { Button, Form, Input, Typography, Card, message } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { signup, loading } = useAuth();

  const onFinish = async (values: { username: string; password: string; confirm: string }) => {
    if (values.password !== values.confirm) {
      message.error("Passwords do not match");
      return;
    }
    try {
      await signup(values.username, values.password);
      message.success("Sign up successful! Redirecting to login...");
      router.push("/admin/login");
    } catch (error) {
      message.error("Failed to sign up. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 24,
      }}
    >
      <Card
        className="backdrop-blur-md shadow-2xl rounded-xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          width: "100%",
          maxWidth: "400px",
        }}
        styles={{ body: { padding: "2rem" } }}
      >
        <Typography.Title level={3} style={{ textAlign: "center", color: "#1f2937" }}>
          Admin Sign Up
        </Typography.Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
            <Button
              block
              type="default"
              style={{ marginTop: 12 }}
              onClick={() => router.push("/admin/login")}
            >
              Back to Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
