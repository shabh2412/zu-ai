"use client";
import {
  CourseworkStore,
  createCourseworkStore,
} from "@/stores/coursework-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type CourseworkStoreApi = ReturnType<typeof createCourseworkStore>;

export const CourseworkStoreContext = createContext<
  CourseworkStoreApi | undefined
>(undefined);

export interface CourseworkStoreProviderProps {
  children: React.ReactNode;
}

export const CourseworkStoreProvider = ({
  children,
}: CourseworkStoreProviderProps) => {
  const storeRef = useRef<CourseworkStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCourseworkStore();
  }
  return (
    <CourseworkStoreContext.Provider value={storeRef.current}>
      {children}
    </CourseworkStoreContext.Provider>
  );
};

export const useCourseworkStore = <T,>(
  selector: (store: CourseworkStore) => T
): T => {
  const courseworkStoreContext = useContext(CourseworkStoreContext);
  if (!courseworkStoreContext) {
    throw new Error(
      "useCourseworkStore must be used within a CourseworkStoreProvider"
    );
  }
  return useStore(courseworkStoreContext, selector);
};

export const useCourseworks = () =>
  useCourseworkStore((state) => state.courseworks);
