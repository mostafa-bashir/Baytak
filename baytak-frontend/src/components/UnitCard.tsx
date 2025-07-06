import { Card, Typography } from 'antd';
import Image from 'next/image';

const { Title, Text } = Typography;

interface UnitCardProps {
  name: string;
  category: string;
  imageUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function UnitCard({
  name,
  category,
  imageUrl,
  isSelected = false,
  onClick,
}: UnitCardProps) {

  console.log(imageUrl)
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        margin: 12,
        borderColor: isSelected ? '#1890ff' : undefined,
        borderWidth: isSelected ? 2 : 1,
        cursor: 'pointer',
      }}
      cover={
        imageUrl ? (
          <Image
  alt={`${name} image`}
  src={imageUrl}
  width={150}
  height={150}
  style={{ objectFit: 'cover' }}
  unoptimized={true} 
/>
        ) : null
      }
    >
      <Title level={5}>{name}</Title>
      <Text type="secondary">{category}</Text>
    </Card>
  );
}
