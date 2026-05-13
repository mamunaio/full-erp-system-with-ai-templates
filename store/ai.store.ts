import { create } from "zustand";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: any;
  type: "text" | "table" | "chart" | "insight" | "mixed";
  timestamp: Date;
}

interface AIStore {
  messages: Message[];
  activeModule: string;
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setActiveModule: (module: string) => void;
  setLoading: (loading: boolean) => void;
  clearHistory: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  messages: [],
  activeModule: "ALL",
  isLoading: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setActiveModule: (module) => set({ activeModule: module }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearHistory: () => set({ messages: [] }),
}));
