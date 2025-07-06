"use client";

import { Button, Form, Input, Typography, Card } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function LoginPage() {

      const router = useRouter();

  const { login, loading } = useAuth();

  const onFinish = (values: { username: string; password: string }) => {
    login(values.username, values.password);
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
          Admin Login
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
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
  <Button block type="primary" htmlType="submit" loading={loading}>
    Login
  </Button>
  <Button
    block
    type="default"
    style={{ marginTop: 12 }}
    onClick={() => router.push("/admin/signup")}
  >
    Sign Up
  </Button>
</Form.Item>
        </Form>
      </Card>
    </div>
  );
}
