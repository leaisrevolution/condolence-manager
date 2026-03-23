import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export type 지출목록 = {
  id: string;
  구분: string;
  금액: string;
};

type ExpenseState = {
  지출목록: 지출목록[];
  isLoading: boolean;
  error: string | null;
  fetch목록: () => Promise<void>;
  추가: (item: Omit<지출목록, "id">) => Promise<void>;
  삭제: (id: string) => Promise<void>;
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  지출목록: [],
  isLoading: true,
  error: null,

  fetch목록: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from("expense_entries")
        .select("id, 구분, 금액")
        .order("created_at", { ascending: true });

      if (error) throw error;
      set({
        지출목록: (data ?? []) as unknown as 지출목록[],
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "지출 데이터를 불러오는데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  추가: async (item) => {
    try {
      const { error } = await supabase.from("expense_entries").insert({
        구분: item.구분,
        금액: item.금액,
      });

      if (error) throw error;
      await get().fetch목록();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "저장에 실패했습니다.",
      });
    }
  },

  삭제: async (id) => {
    try {
      const { error } = await supabase
        .from("expense_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await get().fetch목록();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "삭제에 실패했습니다.",
      });
    }
  },
}));
