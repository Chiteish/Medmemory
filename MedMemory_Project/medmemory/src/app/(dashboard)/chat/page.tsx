"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Plus,
  MessageSquare,
  Activity,
  Heart,
  Pill,
  ChevronRight,
  Bot
} from "lucide-react";
import { useHealthStore } from "@/store/healthStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const prompts = [
  { text: "Is my blood sugar increasing?", icon: <Activity size={12} className="text-amber-500" /> },
  { text: "Show my cholesterol history", icon: <Heart size={12} className="text-red-500" /> },
  { text: "What medicines have I taken?", icon: <Pill size={12} className="text-sky-500" /> }
];

export default function ChatPage() {
  const { chatHistory, sendChatMessage, isChatTyping } = useHealthStore();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isChatTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendChatMessage(text);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(inputValue);
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-6 max-w-6xl mx-auto">
      {/* Desktop History Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 space-y-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs justify-start gap-2 border-slate-100 dark:border-slate-800"
          leftIcon={<Plus size={14} />}
          onClick={() => alert("Starting a new conversation context (simulation only)")}
        >
          New Chat
        </Button>

        <div className="flex-1 space-y-2.5 overflow-y-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            Recent Conversations
          </span>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between text-xs font-semibold px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 text-left transition-colors">
              <span className="truncate flex items-center gap-2">
                <MessageSquare size={13} className="text-brand-500" /> Vitals review 2026
              </span>
              <ChevronRight size={12} className="text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between text-xs font-medium px-2.5 py-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:text-slate-400 hover:text-slate-700 text-left transition-colors">
              <span className="truncate flex items-center gap-2">
                <MessageSquare size={13} className="text-slate-400" /> Cholesterol trends
              </span>
              <ChevronRight size={12} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dialogue Box */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Chat Title Header */}
        <div className="p-4 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/35">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-brand-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-brand-500/10">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                AI Health Copilot <Sparkles size={12} className="text-brand-500 fill-brand-500" />
              </h3>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected to Alex Rivera&apos;s vault
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px]">Grounded Mode</Badge>
        </div>

        {/* Conversation flow */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatHistory.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2.5 max-w-[85%] sm:max-w-[75%] ${
                    isUser ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                      isUser
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        : "bg-brand-50 dark:bg-brand-950/20 text-brand"
                    }`}
                  >
                    {isUser ? "AR" : <Bot size={14} />}
                  </div>

                  {/* Bubble body */}
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed space-y-1 ${
                      isUser
                        ? "bg-brand text-white rounded-tr-none shadow-sm shadow-brand-100 dark:shadow-none"
                        : "bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100/50 dark:border-slate-800/40"
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.content}</p>
                    <span
                      className={`text-[9px] block text-right font-medium ${
                        isUser ? "text-brand-100" : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isChatTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2.5">
                  <div className="h-7 w-7 rounded-lg bg-brand-50 dark:bg-brand-950/20 text-brand flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl rounded-tl-none border border-slate-100/50 dark:border-slate-800/40 flex items-center space-x-1 h-8">
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Action input panel */}
        <div className="p-4 border-t border-slate-50 dark:border-slate-800/50 space-y-3">
          {/* Quick Prompts Suggestions */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.text)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors whitespace-nowrap active:scale-[0.98]"
              >
                {p.icon}
                <span>{p.text}</span>
              </button>
            ))}
          </div>

          <div className="flex space-x-2.5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask AI about glucose trends, lipids, checkups..."
              className="flex-1 h-10 px-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-850 dark:text-slate-100 transition-all placeholder:text-slate-400"
            />
            <Button
              size="icon"
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isChatTyping}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand hover:bg-brand-600 shadow-sm"
            >
              <Send size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
