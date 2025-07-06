"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Card,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProjects } from "@/hooks/useProjects";
import { useCategories } from "@/hooks/useCategories";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useAuth } from "@/hooks/useAuth";

const { Option } = Select;

export default function Dashboard() {
  const router = useRouter();

  // Redirect to /admin/login if token is not found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  const { projects, loading: projectsLoading } = useProjects();
  const { categories, loading: categoriesLoading } = useCategories();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { logout } = useAuth();

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("unitName", values.unitName);
      formData.append("unitNumber", values.unitNumber);
      formData.append("price", values.price.toString());
      formData.append("area", values.area.toString());
      formData.append("projectId", values.project);
      formData.append("categoryId", values.category);
      if (values.description) formData.append("description", values.description);
      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj as Blob);
      }

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/units", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to create unit");

      message.success("Unit created successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error: any) {
      message.error("Error creating unit: " + error.message);
    }
  };

  const onFileChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList.slice(-1)); 
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        backgroundImage: 'url("/bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logout button aligned to the right */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button type="primary" danger onClick={logout}>
          Logout
        </Button>
      </div>

      {/* Centered Card container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          className="backdrop-blur-md shadow-2xl rounded-xl"
          style={{
            width: "100%",
            maxWidth: 600,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: "center", color: "#1f2937" }}
          >
            Create New Unit
          </Typography.Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ price: 0, area: 0 }}
          >
            <Form.Item
              label="Unit Name"
              name="unitName"
              rules={[{ required: true, message: "Please enter the unit name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Unit Number"
              name="unitNumber"
              rules={[{ required: true, message: "Please enter the unit number" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Area"
              name="area"
              rules={[{ required: true, message: "Please enter the area" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Project"
              name="project"
              rules={[{ required: true, message: "Please select a project" }]}
            >
              <Select loading={projectsLoading} placeholder="Select a project" allowClear>
                {projects.map((proj: any) => (
                  <Option key={proj.id} value={proj.id}>
                    {proj.name || proj.projectName || `Project #${proj.id}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select loading={categoriesLoading} placeholder="Select a category" allowClear>
                {categories.map((cat: any) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name || cat.categoryName || `Category #${cat.id}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item label="Image">
              <Upload
                accept="image/*"
                fileList={fileList}
                beforeUpload={() => false} 
                onChange={onFileChange}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Unit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
