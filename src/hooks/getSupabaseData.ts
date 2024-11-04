import { supabase } from "@/app";
import { useState } from "react";

export const useSupabaseData = () => {
  const [supabaseData, setSupabaseData] = useState<any[]>([]);

  const getSupabaseData = async () => {
    let { data, error } = await supabase
      .from("ESP32")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setSupabaseData(data);
    }
  };

  return {
    supabaseData,
    getSupabaseData,
  };
};
