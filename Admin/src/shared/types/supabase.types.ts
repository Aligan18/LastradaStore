export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          delivery_number: string | null
          id: number
          instagram_account: string | null
          name: string | null
          postal_code: string | null
          whats_app_account: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          delivery_number?: string | null
          id?: number
          instagram_account?: string | null
          name?: string | null
          postal_code?: string | null
          whats_app_account?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          delivery_number?: string | null
          id?: number
          instagram_account?: string | null
          name?: string | null
          postal_code?: string | null
          whats_app_account?: string | null
        }
        Relationships: []
      }
      colors: {
        Row: {
          hex: string | null
          id: number
          name: string | null
        }
        Insert: {
          hex?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          hex?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          color_id: number
          id: number
          product_id: number | null
          remaining: number | null
          size: Database["public"]["Enums"]["size"]
          sold: number
          total_purchased: number | null
        }
        Insert: {
          color_id: number
          id?: number
          product_id?: number | null
          remaining?: number | null
          size: Database["public"]["Enums"]["size"]
          sold?: number
          total_purchased?: number | null
        }
        Update: {
          color_id?: number
          id?: number
          product_id?: number | null
          remaining?: number | null
          size?: Database["public"]["Enums"]["size"]
          sold?: number
          total_purchased?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          images: Json | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          images?: Json | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          images?: Json | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      purchases: {
        Row: {
          arrival_date: string | null
          id: number
          is_arrived: boolean
          note: string | null
          product_variant_id: number | null
          purchase_date: string | null
          purchase_price: number
          quantity_added: number
          total_spent: number
        }
        Insert: {
          arrival_date?: string | null
          id?: number
          is_arrived?: boolean
          note?: string | null
          product_variant_id?: number | null
          purchase_date?: string | null
          purchase_price?: number
          quantity_added: number
          total_spent: number
        }
        Update: {
          arrival_date?: string | null
          id?: number
          is_arrived?: boolean
          note?: string | null
          product_variant_id?: number | null
          purchase_date?: string | null
          purchase_price?: number
          quantity_added?: number
          total_spent?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchases_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      realization_items: {
        Row: {
          cost_price: number | null
          earned: number
          id: number
          note: string | null
          product_id: number
          product_variant_id: number
          profit: number | null
          realization_id: number
          realization_price: number
          realization_quantity: number
        }
        Insert: {
          cost_price?: number | null
          earned?: number
          id?: number
          note?: string | null
          product_id: number
          product_variant_id: number
          profit?: number | null
          realization_id: number
          realization_price?: number
          realization_quantity: number
        }
        Update: {
          cost_price?: number | null
          earned?: number
          id?: number
          note?: string | null
          product_id?: number
          product_variant_id?: number
          profit?: number | null
          realization_id?: number
          realization_price?: number
          realization_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "realization_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realization_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realization_items_realization_id_fkey"
            columns: ["realization_id"]
            isOneToOne: false
            referencedRelation: "realizations"
            referencedColumns: ["id"]
          },
        ]
      }
      realization_role_salaries: {
        Row: {
          created_at: string | null
          id: number
          is_paid: boolean | null
          payment_id: number | null
          realization_id: number
          role: Database["public"]["Enums"]["app_role"]
          salary_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_paid?: boolean | null
          payment_id?: number | null
          realization_id: number
          role: Database["public"]["Enums"]["app_role"]
          salary_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_paid?: boolean | null
          payment_id?: number | null
          realization_id?: number
          role?: Database["public"]["Enums"]["app_role"]
          salary_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "realization_role_salaries_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "salary_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realization_role_salaries_realization_id_fkey"
            columns: ["realization_id"]
            isOneToOne: false
            referencedRelation: "realizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realization_role_salaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      realizations: {
        Row: {
          address: string | null
          city: string | null
          client_id: number | null
          client_name: string | null
          delivery_number: string | null
          id: number
          instagram_account: string | null
          messenger: Database["public"]["Enums"]["messenger_type"] | null
          note: string | null
          postal_code: string | null
          realization_date: string
          status: Database["public"]["Enums"]["realization_status"]
          steps: Database["public"]["Enums"]["realization_steps"]
          whats_app_account: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          client_id?: number | null
          client_name?: string | null
          delivery_number?: string | null
          id?: number
          instagram_account?: string | null
          messenger?: Database["public"]["Enums"]["messenger_type"] | null
          note?: string | null
          postal_code?: string | null
          realization_date?: string
          status?: Database["public"]["Enums"]["realization_status"]
          steps?: Database["public"]["Enums"]["realization_steps"]
          whats_app_account?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          client_id?: number | null
          client_name?: string | null
          delivery_number?: string | null
          id?: number
          instagram_account?: string | null
          messenger?: Database["public"]["Enums"]["messenger_type"] | null
          note?: string | null
          postal_code?: string | null
          realization_date?: string
          status?: Database["public"]["Enums"]["realization_status"]
          steps?: Database["public"]["Enums"]["realization_steps"]
          whats_app_account?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "realizations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salary_payments: {
        Row: {
          amount: number
          calculation_type: string
          calculation_value: number | null
          created_at: string | null
          id: number
          note: string | null
          payment_date: string
          period_from: string
          period_to: string
          realization_count: number
          user_id: string
        }
        Insert: {
          amount: number
          calculation_type: string
          calculation_value?: number | null
          created_at?: string | null
          id?: number
          note?: string | null
          payment_date?: string
          period_from: string
          period_to: string
          realization_count: number
          user_id: string
        }
        Update: {
          amount?: number
          calculation_type?: string
          calculation_value?: number | null
          created_at?: string | null
          id?: number
          note?: string | null
          payment_date?: string
          period_from?: string
          period_to?: string
          realization_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salary_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      salary_settings: {
        Row: {
          calculation_type: string
          created_at: string | null
          fixed_amount: number | null
          id: number
          is_active: boolean | null
          only_own_orders: boolean
          percentage: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calculation_type: string
          created_at?: string | null
          fixed_amount?: number | null
          id?: number
          is_active?: boolean | null
          only_own_orders?: boolean
          percentage?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calculation_type?: string
          created_at?: string | null
          fixed_amount?: number | null
          id?: number
          is_active?: boolean | null
          only_own_orders?: boolean
          percentage?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salary_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_roles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
          user_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
          user_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      realization_statistics: {
        Row: {
          client_id: number | null
          cost_price: number | null
          earned: number | null
          id: number | null
          margin_percent: number | null
          messenger: Database["public"]["Enums"]["messenger_type"] | null
          product_id: number | null
          product_variant_id: number | null
          profit: number | null
          realization_date: string | null
          realization_id: number | null
          realization_price: number | null
          realization_quantity: number | null
          status: Database["public"]["Enums"]["realization_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "realization_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realization_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realization_items_realization_id_fkey"
            columns: ["realization_id"]
            isOneToOne: false
            referencedRelation: "realizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realizations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_weighted_avg_cost: {
        Args: { variant_id: number }
        Returns: number
      }
      is_admin: { Args: never; Returns: boolean }
      recalculate_profit_for_variant: {
        Args: { variant_id: number }
        Returns: undefined
      }
      statistics_revenue:
        | {
            Args: never
            Returns: {
              period: string
              revenue: number
            }[]
          }
        | {
            Args: { p_from?: string; p_period: string; p_to?: string }
            Returns: {
              order_count: number
              period: string
              revenue: number
            }[]
          }
    }
    Enums: {
      app_role: "admin" | "manager" | "packer"
      messenger_type: "WhatsApp" | "Instagram"
      realization_status: "active" | "package" | "finished" | "delivery"
      realization_steps: "add_products" | "client_info" | "payment"
      size: "STD" | "S" | "M" | "L" | "XL" | "2XL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "packer"],
      messenger_type: ["WhatsApp", "Instagram"],
      realization_status: ["active", "package", "finished", "delivery"],
      realization_steps: ["add_products", "client_info", "payment"],
      size: ["STD", "S", "M", "L", "XL", "2XL"],
    },
  },
} as const
