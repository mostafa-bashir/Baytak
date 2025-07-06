"use client";

import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";

export default function LandingPage() {
  const router = useRouter();

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
      <div style={{ width: 320 }}>
        <Card
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ textAlign: "center", padding: "32px 24px" }}>
            <h1
              style={{
                fontWeight: "800",
                fontSize: 32,
                color: "#1E40AF",
              }}
            >
              Welcome to Baytak
            </h1>
            <p
              style={{
                color: "#4B5563",
                fontSize: 16,
                marginBottom: 32,
              }}
            >
              Your gateway to premium real estate listings and management.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Button
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                onClick={() => router.push("/admin/login")}
              >
                Login as Admin
              </Button>
              <Button
                type="default"
                size="large"
                icon={<HomeOutlined />}
                onClick={() => router.push("/showroom")}
              >
                Enter the Showroom
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
