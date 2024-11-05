import { supabase } from "@/app";
import { useState } from "react";

export const useSupabaseData = () => {
  const [supabaseDataESP32, setSupabaseDataESP32] = useState<any[]>([]);
  const [supabaseDataCONFIG, setSupabaseDataCONFIG] = useState<any>();
  const [formData, setFormData] = useState<any>();

  const getSupabaseDataESP32 = async () => {
    let { data, error } = await supabase
      .from("ESP32")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setSupabaseDataESP32(data);
    }
  };

  const getSupabaseDataCONFIG = async () => {
    let { data, error } = await supabase
      .from("CONFIG")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    if (data) {
      setSupabaseDataCONFIG(data);
    }
  };

  const insertSupbaseDataCONFIG = async (jsonConfig: any) => {
    const { data, error } = await supabase
      .from("CONFIG")
      .insert([{ config_json: jsonConfig }])
      .select();
  };

  return {
    supabaseDataESP32,
    getSupabaseDataESP32,
    supabaseDataCONFIG,
    getSupabaseDataCONFIG,
    insertSupbaseDataCONFIG,
  };
};
