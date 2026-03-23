import { create } from "zustand";
import { persist } from "zustand/middleware";

export type 지출목록 = {
  id: number;
  구분: string;
  금액: string;
};

type ExpenseState = {
  지출목록: 지출목록[];
  idCounter: number;
  추가: (item: Omit<지출목록, "id">) => void;
  삭제: (id: number) => void;
};

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      지출목록: [],
      idCounter: 0,
      추가: (item) =>
        set((state) => ({
          지출목록: [...state.지출목록, { ...item, id: state.idCounter }],
          idCounter: state.idCounter + 1,
        })),
      삭제: (id) =>
        set((state) => ({
          지출목록: state.지출목록.filter((item) => item.id !== id),
        })),
    }),
    { name: "expense-storage" }
  )
);
