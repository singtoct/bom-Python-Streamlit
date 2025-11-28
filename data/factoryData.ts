

import { Machine, RawMaterial, Product, Order, FactorySettings } from '../types';

// Extracted from factory_settings & packing_employees (Averaged)
export const factorySettings: FactorySettings = {
  overheadRatePerHour: 52.5, // From overheadItems sum
  depreciationPerHour: 11, // From depreciationItems
  laborCostPerDay: 380, // Approx avg from employees list
};

// Extracted from packing_orders (Subset of Open/Pending orders)
export const initialOrders: Order[] = [
  {
    id: "4GXObOkTDiVtZSDMJa5j",
    productName: "ฝาหน้ากาก CT A-101",
    color: "สีขาว",
    quantity: 20160,
    dueDate: "2025-09-30",
    customerName: "จีโนลกรุ๊ป",
    salePrice: 3.77,
    status: "Open"
  },
  {
    id: "I2Y0XJTdC4Rj1akc423R",
    productName: "CPS-113 ฝาครอบด้านหลัง",
    color: "สีเขียว",
    quantity: 30000,
    dueDate: "2025-09-30",
    customerName: "ซีที อิเล็คทริค",
    salePrice: 1.02,
    status: "Open"
  },
  {
    id: "s2JR3yA9FFa9UEAB5QzE",
    productName: "CPS-116B ฝาครอบด้านหน้า",
    color: "สีดำ",
    quantity: 3500,
    dueDate: "2025-10-09",
    customerName: "ซีที อิเล็คทริค",
    salePrice: 2.13,
    status: "Open"
  },
  {
    id: "jVX03tkq5a8PMzAbgLQc",
    productName: "บล็อคลอย CT 4x4B",
    color: "สีดำ",
    quantity: 4000,
    dueDate: "2025-09-30",
    customerName: "จีโนลกรุ๊ป",
    salePrice: 5.2,
    status: "Open"
  },
  {
    id: "rybKecf7iFs9J21zD77M",
    productName: "ฝาหน้ากาก CT A-103",
    color: "สีขาว",
    quantity: 50160,
    dueDate: "2025-09-30",
    customerName: "จีโนลกรุ๊ป",
    salePrice: 3.57,
    status: "Open"
  }
];

// Extracted from factory_machines
export const initialMachines: Machine[] = [
  {
    id: "727010df-ade2-435a-bf1e-6f32707722b2",
    status: "ทำงาน",
    dailyHours: 18,
    location: "โซน A",
    name: "เครื่องฉีด 1"
  },
  {
    id: "3f4e3612-5861-4e89-bc80-30b592277c2f",
    status: "ว่าง",
    dailyHours: 18,
    name: "เครื่องฉีด 2",
    location: "โซน A"
  },
  {
    id: "55c790e0-7589-46e7-b6af-c030d43b8f04",
    dailyHours: 19,
    name: "เครื่องฉีด 3",
    location: "โซน A",
    status: "ว่าง"
  },
  {
    id: "6d14dac3-4c87-40b8-bcf2-27ba7622a738",
    dailyHours: 18,
    status: "ทำงาน",
    name: "เครื่องฉีด 4",
    location: "โซน A"
  },
  {
    id: "1e02fd8e-e9d0-4897-8b99-71c0b1eed4df",
    dailyHours: 8,
    name: "เครื่องฉีด 5",
    status: "ทดสอบงาน",
    location: "โซน A"
  },
  {
    id: "0a3cf318-fe9f-44d7-a423-a34865ecbf91",
    status: "ทำงาน",
    name: "เครื่องฉีด 6",
    location: "โซน A",
    dailyHours: 8
  },
  {
    id: "1a1c89e9-8302-4002-a3de-c8a634cfbcb0",
    name: "เครื่องฉีด 7",
    location: "โซน A",
    dailyHours: 18,
    status: "ทำงาน"
  },
  {
    id: "d50e868a-ba36-4287-83fe-c1ec6101d8b7",
    name: "เครื่องฉีด 8",
    status: "ทำงาน",
    dailyHours: 8,
    location: "โซน A"
  }
];

// Extracted from packing_raw_materials (Focusing on main plastics/resins)
export const initialMaterials: RawMaterial[] = [
  {
    id: "k5m0l2n6-n6k5-4lg-i-681k-1n0l3927n3l9",
    quantity: 779,
    unit: "kg",
    costPerUnit: 31,
    name: "เม็ด ABS ดำ"
  },
  {
    id: "l6n1m3o7-o7l6-4mh-j-692l-2o1m4038o4m0",
    name: "เม็ด PC ใส BP15",
    costPerUnit: 52,
    unit: "kg",
    quantity: 574
  },
  {
    id: "c9e4d6f0-f0c9-4dy-a-125c-5f4d7361f7d3",
    unit: "kg",
    quantity: 624.04,
    name: "เม็ด PP สีดำ",
    costPerUnit: 15
  },
  {
    id: "I4WB7jJD111dA6T6ML5l",
    name: "เม็ด PP สีส้ม",
    unit: "kg",
    quantity: 724,
    costPerUnit: 22
  },
  {
    id: "c3e8d0f4-f4c3-4dy-a-869c-9f8d1705f1d7",
    quantity: 360,
    unit: "kg",
    name: "เม็ด PC ดำบด",
    costPerUnit: 52
  },
  {
    id: "r2t7s9u3-u3r2-4sn-p-758r-8u7s0694u0s6",
    costPerUnit: 52,
    name: "เม็ด PC ครีม",
    unit: "kg",
    quantity: 50
  },
  {
    id: "t4v9u1w5-w5t4-4up-r-770t-0w9u2816w2u8",
    quantity: 120,
    unit: "kg",
    costPerUnit: 26,
    name: "เม็ด HIPS ดำ"
  },
  {
    id: "w7y2x4z8-z8w7-4xs-u-803w-3z2x5149z5x1",
    unit: "kg",
    costPerUnit: 43.5,
    quantity: 79,
    name: "เม็ดพุก"
  },
  {
    id: "aEZOIiZKUNcd8lw3zd1k",
    name: "เม็ดบด ของ เม็ด PC ใส BP15",
    quantity: 1800,
    costPerUnit: 52,
    unit: "kg"
  }
];

// Extracted from factory_products & packing_boms
export const initialProducts: Product[] = [
  {
    id: "x1y2z3a4-b5c6-d7e8-f9g0-h1i2j3k4l5m6",
    name: "บล็อคฝัง 4x4 (สีดำ)",
    cycleTimeSeconds: 21,
    throughput: 171, // 3600 / 21
    machineId: "1a1c89e9-8302-4002-a3de-c8a634cfbcb0", // เครื่อง 7
    materialId: "c9e4d6f0-f0c9-4dy-a-125c-5f4d7361f7d3", // เม็ด PP สีดำ
    consumptionRate: 0.04,
    priority: 100,
    salePrice: 1.8
  },
  {
    id: "z3a4b5c6-d7e8-f9g0-h1i2-j3k4l5m6n7o8",
    name: "บล็อคฝัง 4x4 (สีส้ม)",
    cycleTimeSeconds: 21,
    throughput: 171,
    machineId: "1a1c89e9-8302-4002-a3de-c8a634cfbcb0", // เครื่อง 7
    materialId: "I4WB7jJD111dA6T6ML5l", // เม็ด PP สีส้ม
    consumptionRate: 0.04,
    priority: 100,
    salePrice: 1.2
  },
  {
    id: "w0x1y2z3-a4b5-c6d7-e8f9-g0h1i2j3k4l5",
    name: "บล็อคฝัง 2x4 (สีดำ)",
    cycleTimeSeconds: 9,
    throughput: 400,
    machineId: "1a1c89e9-8302-4002-a3de-c8a634cfbcb0", // เครื่อง 7
    materialId: "c9e4d6f0-f0c9-4dy-a-125c-5f4d7361f7d3", // เม็ด PP สีดำ
    consumptionRate: 0.025,
    priority: 100,
    salePrice: 1.0
  },
  {
    id: "g6h7i8j9-k0l1-m2n3-o4p5-q6r7s8t9u0v1",
    name: "บล็อคลอย CT 2x4B (สีดำ)",
    cycleTimeSeconds: 12,
    throughput: 300,
    machineId: "d50e868a-ba36-4287-83fe-c1ec6101d8b7", // เครื่อง 8
    materialId: "t4v9u1w5-w5t4-4up-r-770t-0w9u2816w2u8", // เม็ด HIPS ดำ
    consumptionRate: 0.046,
    priority: 100,
    salePrice: 3.7
  },
  {
    id: "jVX03tkq5a8PMzAbgLQc",
    name: "บล็อคลอย CT 4x4B (สีดำ)",
    cycleTimeSeconds: 24,
    throughput: 150,
    machineId: "d50e868a-ba36-4287-83fe-c1ec6101d8b7", // เครื่อง 8
    materialId: "t4v9u1w5-w5t4-4up-r-770t-0w9u2816w2u8", // เม็ด HIPS ดำ
    consumptionRate: 0.052,
    priority: 100,
    salePrice: 5.2
  },
  {
    id: "991e27b5-4fa9-4f5f-a8bf-08fc085314f6",
    name: "พุก (สีขาว)",
    cycleTimeSeconds: 3,
    throughput: 1200,
    machineId: "0a3cf318-fe9f-44d7-a423-a34865ecbf91", // เครื่อง 6
    materialId: "w7y2x4z8-z8w7-4xs-u-803w-3z2x5149z5x1", // เม็ดพุก
    consumptionRate: 0.0005,
    priority: 100,
    salePrice: 0.12
  },
  {
    id: "4GXObOkTDiVtZSDMJa5j",
    name: "ฝาหน้ากาก CT A-101 (สีขาว)",
    cycleTimeSeconds: 15,
    throughput: 240,
    machineId: "0a3cf318-fe9f-44d7-a423-a34865ecbf91", // เครื่อง 6
    materialId: "l6n1m3o7-o7l6-4mh-j-692l-2o1m4038o4m0", // เม็ด PC ใส
    consumptionRate: 0.023,
    priority: 100,
    salePrice: 3.77
  },
  {
    id: "I2Y0XJTdC4Rj1akc423R",
    name: "CPS-113 ฝาครอบด้านหลัง (สีเขียว)",
    cycleTimeSeconds: 17,
    throughput: 211,
    machineId: "1a1c89e9-8302-4002-a3de-c8a634cfbcb0", // เครื่อง 7
    materialId: "l6n1m3o7-o7l6-4mh-j-692l-2o1m4038o4m0", // เม็ด PC ใส (Use PC for now)
    consumptionRate: 0.015,
    priority: 100,
    salePrice: 1.02
  },
  {
    id: "rybKecf7iFs9J21zD77M",
    name: "ฝาหน้ากาก CT A-103 (สีขาว)",
    cycleTimeSeconds: 15,
    throughput: 240,
    machineId: "6d14dac3-4c87-40b8-bcf2-27ba7622a738", // เครื่อง 4
    materialId: "l6n1m3o7-o7l6-4mh-j-692l-2o1m4038o4m0", // เม็ด PC ใส
    consumptionRate: 0.016,
    priority: 100,
    salePrice: 3.57
  },
  {
    id: "s2JR3yA9FFa9UEAB5QzE",
    name: "CPS-116B ฝาครอบด้านหน้า (สีดำ)",
    cycleTimeSeconds: 17,
    throughput: 211,
    machineId: "1e02fd8e-e9d0-4897-8b99-71c0b1eed4df", // เครื่อง 5
    materialId: "l6n1m3o7-o7l6-4mh-j-692l-2o1m4038o4m0", // เม็ด PC ใส (Use PC for now)
    consumptionRate: 0.02,
    priority: 100,
    salePrice: 2.13
  }
];
