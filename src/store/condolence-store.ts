import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export type 조의금목록 = {
  id: string;
  상주이름: string;
  지인이름: string;
  액수: string;
};

type CondolenceState = {
  저장목록: 조의금목록[];
  isLoading: boolean;
  error: string | null;
  fetch목록: () => Promise<void>;
  추가: (item: Omit<조의금목록, "id">) => Promise<void>;
  삭제: (id: string) => Promise<void>;
};

export const useCondolenceStore = create<CondolenceState>((set, get) => ({
  저장목록: [],
  isLoading: true,
  error: null,

  fetch목록: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from("condolence_entries")
        .select("id, 상주이름, 지인이름, 액수")
        .order("created_at", { ascending: true });

      if (error) throw error;
      set({ 저장목록: data ?? [], isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  추가: async (item) => {
    try {
      const { error } = await supabase.from("condolence_entries").insert({
        상주이름: item.상주이름,
        지인이름: item.지인이름,
        액수: item.액수,
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
        .from("condolence_entries")
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
