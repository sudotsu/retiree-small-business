"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  isVisionMode: boolean;
  toggleVisionMode: () => void;
  isSimpleMode: boolean;
  toggleSimpleMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isVisionMode, setIsVisionMode] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  // Load preference from localStorage
  useEffect(() => {
    const storedVision = localStorage.getItem('vision-mode');
    if (storedVision === 'true') {
      setIsVisionMode(true);
      document.documentElement.classList.add('vision-mode');
    }

    const storedSimple = localStorage.getItem('simple-mode');
    if (storedSimple === 'true') {
      setIsSimpleMode(true);
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

  const toggleSimpleMode = () => {
    setIsSimpleMode((prev) => {
      const next = !prev;
      localStorage.setItem('simple-mode', String(next));
      return next;
    });
  };

  return (
    <AccessibilityContext.Provider value={{ isVisionMode, toggleVisionMode, isSimpleMode, toggleSimpleMode }}>
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
