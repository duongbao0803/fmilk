// Notification.tsx
import React, { useState, useEffect } from "react";
import { Modal, List } from "antd";
import axios from "axios";

interface NotificationProps {
  visible: boolean;
  onClose: () => void;
}

interface NotificationItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

const Notification: React.FC<NotificationProps> = ({ visible, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (visible) {
      axios.get("https://fmilk-server.onrender.com/api/v1/post/").then((response) => {
        setNotifications(response.data.posts);
      });
    }
  }, [visible]);

  return (
    <Modal
      title="Notifications"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={
                <>
                  <p>{item.description}</p>
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                </>
              }
              avatar={<img src={item.image} alt={item.title} style={{ width: 50 }} />}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default Notification;
