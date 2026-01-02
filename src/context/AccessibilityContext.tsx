"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  isVisionMode: boolean;
  toggleVisionMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isVisionMode, setIsVisionMode] = useState(false);

  // Load preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('vision-mode');
    if (stored === 'true') {
      setIsVisionMode(true);
      document.documentElement.classList.add('vision-mode');
    }
  }, []);

  const toggleVisionMode = () => {
    setIsVisionMode((prev) => {
      const next = !prev;
      localStorage.setItem('vision-mode', String(next));
      if (next) {
        document.documentElement.classList.add('vision-mode');
      } else {
        document.documentElement.classList.remove('vision-mode');
      }
      return next;
    });
  };

  return (
    <AccessibilityContext.Provider value={{ isVisionMode, toggleVisionMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
