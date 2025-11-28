
export interface RawMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit?: number;
}

export interface Machine {
  id: string;
  name: string;
  dailyHours: number;
  status: string; // 'ทำงาน', 'ว่าง', 'เสีย', etc.
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  materialId: string;
  machineId: string;
  consumptionRate: number; // material needed per unit
  throughput: number; // units produced per hour (calculated from cycleTime)
  priority: number; // allocation percentage (0-100)
  cycleTimeSeconds?: number;
  salePrice?: number; // From packing_orders/products
}

export interface Order {
  id: string;
  productName: string;
  quantity: number;
  dueDate: string;
  customerName: string;
  salePrice: number;
  status: string;
  color: string;
}

export interface FactorySettings {
  overheadRatePerHour: number; // Power, Maintenance, etc.
  laborCostPerDay: number; // Average
  depreciationPerHour: number;
}

export interface ProductionPlan {
  productId: string;
  productName: string;
  machineName: string;
  materialName: string;
  totalUnits: number;
  materialUsed: number;
  totalHours: number;
  totalDays: number;
  machineStatus: string;
  // Financials
  costs: {
    material: number;
    labor: number;
    overhead: number;
    total: number;
  };
  revenue: number;
  profit: number;
}
