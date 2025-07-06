"use client";

import React from "react";
import { Layout, Typography, Spin } from "antd";
import UnitCard from "@/components/UnitCard";
import { useProjects } from "@/hooks/useProjects";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Baytak
      </Header>
      <Content style={{ padding: "24px", overflowY: "auto" }}>
        {loading ? (
          <Spin />
        ) : error ? (
          <p style={{ color: "red" }}>Error loading projects: {error}</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} style={{ marginBottom: 40 }}>
              <Title level={3}>{project.name}</Title>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",     
                  gap: 16,
                  paddingBottom: 8,
                }}
              >
                {project.units.map((unit) => (
                  <div
                    key={unit.id}
                    style={{
                      flex: "1 1 350px", 
                      maxWidth: 350,   
                      minWidth: 250,      
                    }}
                  >
                    <UnitCard
                      name={unit.unitName}
                      category={unit.category.name}
                      imageUrl={unit.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </Content>
    </Layout>
  );
}
