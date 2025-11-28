
export const translations = {
  en: {
    title: "MatPlan Pro",
    subtitle: "Production & Material Forecasting",
    introTitle: "Production Calculator",
    introText: "Plan your manufacturing schedule based on raw material availability. Define your stock, machines, and BOM recipes to automatically calculate maximum output and timelines.",
    search: "Search...",
    
    // Orders
    ordersTitle: "Incoming Orders (Pending)",
    colCustomer: "Customer",
    colProduct: "Product",
    colDueDate: "Due Date",
    colPrice: "Price/Unit",
    btnPlan: "Plan",
    planOrderAlert: "Planning production for:",
    noBomFound: "No production recipe (BOM) found for",
    createBomPrompt: "Create a new product recipe?",

    // Section 1
    rawMaterialsTitle: "1. Raw Materials Stock",
    addMaterial: "Add Material",
    colMaterialName: "Material Name",
    colQuantity: "Quantity",
    colUnit: "Unit",
    colCost: "Cost/Unit",
    noMaterials: "No materials added.",
    newMaterialDefault: "New Material",
    
    // Section 2
    machineConfigTitle: "2. Machine Configuration",
    addMachine: "Add Machine",
    colMachineName: "Machine Name",
    colHoursDay: "Hours/Day",
    colStatus: "Status",
    noMachines: "No machines defined.",
    newMachineDefault: "New Machine",

    // Section 3
    productsBomTitle: "3. Products & BOM (Bill of Materials)",
    addProduct: "Add Product",
    colProductName: "Product Name",
    colRawMaterial: "Raw Material",
    colConsumRate: "Consum. Rate",
    colMachine: "Machine",
    colThroughput: "Throughput (Units/Hr)",
    colAllocShare: "Alloc. Share",
    noProducts: "No products defined. Add a product to start planning.",
    selectMaterialPlaceholder: "Select Material",
    selectMachinePlaceholder: "Select Machine",
    newProductDefault: "New Product",
    
    // Section 4
    planSummaryTitle: "4. Production Plan Summary",
    alertCompleteSetup: "Complete the setup above to generate a production plan.",
    labelOutput: "Output",
    labelDuration: "Duration",
    labelMaterial: "Material",
    labelUtilized: "utilized",
    chartTotalOutput: "Total Production Output (Units)",
    chartTimeRequired: "Production Time Required (Days)",
    chartProfit: "Estimated Profit (THB)",
    
    // Table
    tblProduct: "Product",
    tblMachine: "Machine",
    tblTotalOutput: "Total Output",
    tblMaterialConsumed: "Material Consumed",
    tblHours: "Hours",
    tblDays: "Days",
    tblCost: "Est. Cost",
    tblProfit: "Est. Profit",
    
    footer: "MatPlan Pro. Optimized for modern manufacturing."
  },
  th: {
    title: "MatPlan Pro",
    subtitle: "การพยากรณ์การผลิตและวัตถุดิบ",
    introTitle: "เครื่องคำนวณแผนการผลิต",
    introText: "วางแผนตารางการผลิตของคุณตามปริมาณวัตถุดิบที่มี กำหนดสต็อก เครื่องจักร และสูตรการผลิต (BOM) เพื่อคำนวณผลผลิตสูงสุดและระยะเวลาที่ต้องใช้โดยอัตโนมัติ",
    search: "ค้นหา...",

    // Orders
    ordersTitle: "รายการสั่งซื้อรอผลิต (Incoming Orders)",
    colCustomer: "ลูกค้า",
    colProduct: "สินค้า",
    colDueDate: "กำหนดส่ง",
    colPrice: "ราคา/หน่วย",
    btnPlan: "วางแผน",
    planOrderAlert: "กำลังคำนวณแผนการผลิตสำหรับ:",
    noBomFound: "ไม่พบสูตรการผลิตสำหรับ",
    createBomPrompt: "ต้องการสร้างสูตรการผลิตใหม่หรือไม่?",
    
    // Section 1
    rawMaterialsTitle: "1. สต็อกวัตถุดิบหลัก",
    addMaterial: "เพิ่มวัตถุดิบ",
    colMaterialName: "ชื่อวัตถุดิบ",
    colQuantity: "ปริมาณ",
    colUnit: "หน่วย",
    colCost: "ต้นทุน/หน่วย",
    noMaterials: "ยังไม่มีข้อมูลวัตถุดิบ",
    newMaterialDefault: "วัตถุดิบใหม่",
    
    // Section 2
    machineConfigTitle: "2. การตั้งค่าเครื่องจักร",
    addMachine: "เพิ่มเครื่องจักร",
    colMachineName: "ชื่อเครื่องจักร",
    colHoursDay: "ชั่วโมง/วัน",
    colStatus: "สถานะ",
    noMachines: "ยังไม่มีข้อมูลเครื่องจักร",
    newMachineDefault: "เครื่องจักรใหม่",

    // Section 3
    productsBomTitle: "3. สินค้า & สูตรการผลิต (BOM)",
    addProduct: "เพิ่มสินค้า",
    colProductName: "ชื่อสินค้า",
    colRawMaterial: "วัตถุดิบหลัก",
    colConsumRate: "อัตราการใช้",
    colMachine: "เครื่องจักร",
    colThroughput: "กำลังผลิต (หน่วย/ชม.)",
    colAllocShare: "สัดส่วนผลิต",
    noProducts: "ยังไม่มีข้อมูลสินค้า เพิ่มสินค้าเพื่อเริ่มการคำนวณ",
    selectMaterialPlaceholder: "เลือกวัตถุดิบ",
    selectMachinePlaceholder: "เลือกเครื่องจักร",
    newProductDefault: "สินค้าใหม่",
    
    // Section 4
    planSummaryTitle: "4. สรุปแผนการผลิต & ต้นทุน",
    alertCompleteSetup: "กรุณากรอกข้อมูลด้านบนให้ครบถ้วนเพื่อแสดงแผนการผลิต",
    labelOutput: "ผลผลิตรวม",
    labelDuration: "ระยะเวลา",
    labelMaterial: "วัตถุดิบ",
    labelUtilized: "ที่ใช้ไป",
    chartTotalOutput: "ยอดผลิตรวม (หน่วย)",
    chartTimeRequired: "เวลาที่ใช้ในการผลิต (วัน)",
    chartProfit: "กำไรโดยประมาณ (บาท)",
    
    // Table
    tblProduct: "สินค้า",
    tblMachine: "เครื่องจักร",
    tblTotalOutput: "ยอดผลิตรวม",
    tblMaterialConsumed: "วัตถุดิบที่ใช้",
    tblHours: "ชั่วโมงรวม",
    tblDays: "วันรวม",
    tblCost: "ต้นทุนรวม",
    tblProfit: "กำไรสุทธิ",
    
    footer: "MatPlan Pro. พัฒนาเพื่ออุตสาหกรรมการผลิตสมัยใหม่"
  }
};
