import { createClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { Database } from "../../database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

interface LogsState {
  logID: string;
  setLogId: (by: string) => void;
}

export const useLogsState = create<LogsState>()((set) => ({
  logID: "",
  setLogId: (selectedID) => set((state) => ({ logID: selectedID })),
}));
