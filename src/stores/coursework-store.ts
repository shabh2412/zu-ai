import { CourseWorkWithFile } from "@/app/explore/interface";
import { getSavedFiles } from "@/app/result/utils";
import { createStore } from "zustand";

export type CourseworkState = {
  courseworks: CourseWorkWithFile[];
}

export type CourseworkActions = {
  addCoursework: (coursework: CourseWorkWithFile) => void;
  removeCoursework: (id: string) => void;
  initializeCourseworks: (courseworks: CourseWorkWithFile[]) => void;
}

export type CourseworkStore = CourseworkState & CourseworkActions;

export const initCourseworkStore = (): CourseworkState => {
  return {
    courseworks: [],
  }
}

export const defaultInitialState: CourseworkState = {
  courseworks: [],
}

export const createCourseworkStore = (initState: CourseworkState = defaultInitialState) => {
  return createStore<CourseworkStore>((set) => ({
    ...initState,
    addCoursework: (coursework) => set((state) => ({ courseworks: [...state.courseworks, coursework] })),
    removeCoursework: (id) => set((state) => ({ courseworks: state.courseworks.filter((coursework) => coursework.id !== id) })),
    // initialize courseworks takes courseworks in parameters and then initializes it.
    initializeCourseworks: (courseworks) => set((state) => ({ courseworks })),
  }))
}