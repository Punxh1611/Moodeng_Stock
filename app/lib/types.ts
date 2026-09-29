export type Category = 'อาหาร' | 'เครื่องดื่ม' | 'ของใช้' | 'ยา' | 'อื่นๆ'

export const CATEGORIES: Category[] = ['อาหาร', 'เครื่องดื่ม', 'ของใช้', 'ยา', 'อื่นๆ']

export const UNITS = ['ชิ้น', 'ขวด', 'แพ็ค', 'กล่อง', 'ซอง', 'ม้วน', 'ถุง', 'อัน'] as const
export type Unit = (typeof UNITS)[number]

export interface Item {
  id: string
  name: string
  category: Category
  quantity: number
  unit: string
  low_threshold: number
  price_per_unit: number | null
  note: string | null
  created_at: string
  updated_at: string
}

export interface ShoppingTrip {
  id: string
  shopped_at: string
  total_cost: number | null
  note: string | null
}

export interface ShoppingTripItem {
  id: string
  trip_id: string
  item_id: string | null
  item_name: string
  quantity: number
  price_paid: number | null
}

export interface Note {
  id: string
  text: string
  is_done: boolean
  item_id: string | null
  created_at: string
}

// Local state for shopping cart (not persisted until "update stock")
export interface CartItem {
  item_id: string | null
  item_name: string
  quantity: number
  price_paid: number
  is_new: boolean
  category?: Category
  unit?: string
}
