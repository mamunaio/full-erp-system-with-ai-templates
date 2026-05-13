"use client";

import { useEffect, useState, useCallback } from "react";

export function useRealtime() {
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    try {
      const eventSource = new EventSource("/api/notifications/stream");

      eventSource.onopen = () => {
        setIsConnected(true);
        console.log("SSE Connected");
      };

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "notification") {
           // Handle new notification
           console.log("New Notification Received:", data);
        }
      };

      eventSource.onerror = (error) => {
        setIsConnected(false);
        eventSource.close();
        // Reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      return () => {
        eventSource.close();
      };
    } catch (error) {
      console.error("SSE Connection Error:", error);
    }
  }, []);

  useEffect(() => {
    return connect();
  }, [connect]);

  return { isConnected };
}
