"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Input,
  Typography,
  Spin,
  Image,
  List,
  Button,
  Modal,
} from "antd";
import type { InputRef } from "antd";
import { useUnits } from "@/hooks/useUnits";
import { useUnitDetails } from "@/hooks/useUnitDetails";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import UnitCard from "@/components/UnitCard";
import { useRouter } from "next/navigation";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function Home() {
  const [search, setSearch] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [pendingSearch, setPendingSearch] = useState<string | null>(null);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { units, loading: unitsLoading, error: unitsError } = useUnits(search);
  const [selectedUnitId, setSelectedUnitId] = useState<number | undefined>(
    undefined
  );
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    unit: selectedUnit,
    loading: detailsLoading,
    error: detailsError,
  } = useUnitDetails(selectedUnitId);

  const {
    history: searchHistory,
    loading: historyLoading,
    error: historyError,
    addSearchTerm,
  } = useSearchHistory();

  const onSearch = (val: string) => {
    setSearch(val);
    addSearchTerm(val);
    setShowHistory(false);
    setMobileSearchVisible(false);
  };

  const searchInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (units.length > 0) setSelectedUnitId(units[0].id);
  }, [units]);

  useEffect(() => {
    if (pendingSearch !== null) {
      onSearch(pendingSearch);
      setPendingSearch(null);
    }
  }, [pendingSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchInputRef.current?.input &&
        !searchInputRef.current.input.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }
    if (showHistory) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHistory]);

  // New handler for mobile unit click
  const onMobileUnitClick = (id: number) => {
    setSelectedUnitId(id);
    setModalVisible(true);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          color: "#fff",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#001529",
          flexWrap: "wrap",
          gap: 12,
          minHeight: 56,
        }}
      >
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flex: 1,
            justifyContent: mobileSearchVisible && isMobile ? "center" : "flex-start",
          }}
        >
          {!mobileSearchVisible && (
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
              Baytak
            </Title>
          )}

          {(!isMobile || mobileSearchVisible) && (
            <div
              style={{
                position: "relative",
                width: isMobile ? "100%" : 300,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search
                placeholder="Search units or projects"
                value={search}
                ref={searchInputRef}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={onSearch}
                onFocus={() => setShowHistory(true)}
                allowClear
                enterButton
                style={{ width: "100%", marginTop: 0 }}
              />
              {showHistory && searchHistory.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    background: "#fff",
                    border: "1px solid #d9d9d9",
                    borderRadius: 4,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                >
                  <List
                    size="small"
                    dataSource={searchHistory}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSearch(item.searchText);
                          setShowHistory(false);
                          onSearch(item.searchText);
                        }}
                      >
                        {item.searchText}
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {!isMobile && (
            <Button
              type="primary"
              onClick={() => router.push("/projects")}
              style={{ height: 32 }}
            >
              Go to Projects
            </Button>
          )}

          {isMobile && !mobileSearchVisible && (
            <>
              <Button
                type="default"
                onClick={() => router.push("/projects")}
                style={{ marginRight: 12, height: 32 }}
              >
                Go to Projects
              </Button>
              <Button
                icon={<SearchOutlined />}
                onClick={() => setMobileSearchVisible(true)}
                style={{ height: 32 }}
              />
            </>
          )}

          {isMobile && mobileSearchVisible && (
            <Button
              icon={<CloseOutlined />}
              onClick={() => setMobileSearchVisible(false)}
              style={{ height: 32 }}
            />
          )}
        </div>
      </Header>

      <Layout>
        <Sider
          width={isMobile ? '100vw' : 400} // fixed width on mobile only
          style={{
            overflowY: "auto",
            background: "#fff",
            padding: 16,
            flexShrink: 0,
          }}
        >
          {unitsLoading ? (
            <Spin />
          ) : unitsError ? (
            <div style={{ padding: 16, color: "red" }}>
              Error loading units: {unitsError}
            </div>
          ) : (
            units.map((unit) => (
              <UnitCard
                key={unit.id}
                name={unit.unitName}
                category={unit.category.name}
                imageUrl={unit.image}
                isSelected={selectedUnitId === unit.id}
                onClick={() =>
                  isMobile ? onMobileUnitClick(unit.id) : setSelectedUnitId(unit.id)
                }
              />
            ))
          )}
        </Sider>

        {/* On desktop/tablet show content normally */}
        {!isMobile && (
          <Content
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {detailsLoading ? (
              <Spin />
            ) : detailsError ? (
              <p style={{ color: "red" }}>
                Error loading unit details: {detailsError}
              </p>
            ) : selectedUnit ? (
              <>
                <div style={{ marginBottom: 24 }}>
                  <Title level={2}>{selectedUnit.unitName}</Title>
                  <p>
                    <strong>Number:</strong> {selectedUnit.unitNumber}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedUnit.category.name}
                  </p>
                  <p>
                    <strong>Project:</strong> {selectedUnit.project.name}
                  </p>
                  {selectedUnit.description && (
                    <p>
                      <strong>Description:</strong> {selectedUnit.description}
                    </p>
                  )}
                  <p>
                    <strong>Price:</strong> {selectedUnit.price.toLocaleString()} EGP
                  </p>
                  <p>
                    <strong>Area:</strong> {selectedUnit.area} m²
                  </p>
                </div>

                {selectedUnit.image && (
                  <div style={{ flexGrow: 1, overflow: "hidden" }}>
                    <Image
                      src={selectedUnit.image}
                      alt={selectedUnit.unitName}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <p>Select a unit to view details.</p>
            )}
          </Content>
        )}

        {/* Modal for mobile unit details */}
        {isMobile && selectedUnit && (
          <Modal
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            width="90%"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            centered
          >
            <Title level={2}>{selectedUnit.unitName}</Title>
            <p>
              <strong>Number:</strong> {selectedUnit.unitNumber}
            </p>
            <p>
              <strong>Category:</strong> {selectedUnit.category.name}
            </p>
            <p>
              <strong>Project:</strong> {selectedUnit.project.name}
            </p>
            {selectedUnit.description && (
              <p>
                <strong>Description:</strong> {selectedUnit.description}
              </p>
            )}
            <p>
              <strong>Price:</strong> {selectedUnit.price.toLocaleString()} EGP
            </p>
            <p>
              <strong>Area:</strong> {selectedUnit.area} m²
            </p>

            {selectedUnit.image && (
              <Image
                src={selectedUnit.image}
                alt={selectedUnit.unitName}
                style={{ objectFit: "cover", width: "100%", borderRadius: 8 }}
              />
            )}
          </Modal>
        )}
      </Layout>
    </Layout>
  );
}
