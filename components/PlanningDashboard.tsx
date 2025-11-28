
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Package, 
  Settings, 
  Factory, 
  Plus, 
  Trash2, 
  Calculator, 
  AlertCircle,
  TrendingUp,
  Clock,
  Search,
  RefreshCw,
  ShoppingCart,
  DollarSign,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { RawMaterial, Machine, Product, ProductionPlan, Order } from '../types';
import { Card } from './ui/Card';
import { translations } from '../translations';
import { initialMaterials, initialMachines, initialProducts, initialOrders, factorySettings } from '../data/factoryData';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface Props {
  lang: 'en' | 'th';
}

export const PlanningDashboard: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  // --- State ---
  const [materials, setMaterials] = useState<RawMaterial[]>(initialMaterials);
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Filter States
  const [matSearch, setMatSearch] = useState('');
  const [machSearch, setMachSearch] = useState('');
  const [prodSearch, setProdSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // --- Handlers ---
  const resetData = () => {
    if (window.confirm('Reset all data to factory defaults?')) {
      setMaterials(initialMaterials);
      setMachines(initialMachines);
      setProducts(initialProducts);
      setOrders(initialOrders);
    }
  };

  const addMaterial = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setMaterials([...materials, { id: newId, name: t.newMaterialDefault, quantity: 0, unit: 'kg', costPerUnit: 0 }]);
  };

  const updateMaterial = (id: string, field: keyof RawMaterial, value: any) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
    setProducts(products.map(p => p.materialId === id ? { ...p, materialId: '' } : p));
  };

  const addMachine = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setMachines([...machines, { id: newId, name: t.newMachineDefault, dailyHours: 8, status: 'ว่าง' }]);
  };

  const updateMachine = (id: string, field: keyof Machine, value: any) => {
    setMachines(machines.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const removeMachine = (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
    setProducts(products.map(p => p.machineId === id ? { ...p, machineId: '' } : p));
  };

  const addProduct = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setProducts([...products, { 
      id: newId, 
      name: t.newProductDefault, 
      materialId: materials.length > 0 ? materials[0].id : '', 
      machineId: machines.length > 0 ? machines[0].id : '', 
      consumptionRate: 0.01, 
      throughput: 100,
      priority: 100 
    }]);
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const planOrder = (order: Order) => {
    // Find if product definition exists, or use order details to match/create simulation
    // For this demo, we'll simulate matching the order to a product definition
    // In a real app, this would be a strict BOM lookup
    
    // Fuzzy match product name
    const matchedProduct = products.find(p => 
      p.name.includes(order.productName) || order.productName.includes(p.name)
    );

    if (matchedProduct) {
      // Check if this product is already allocated higher priority or adjust it
      // Here we can just highlight it or update its priority to "Focused"
      // For simplicity, we'll alert the user that planning logic is active
      alert(`${t.planOrderAlert} ${order.productName}`);
      
      // In a more complex app, this would create a specific 'Production Run' entry
      // For now, we ensure the product has high priority in the general planner
      updateProduct(matchedProduct.id, 'priority', 999);
    } else {
      // If no product definition exists, prompt to create one
      const create = window.confirm(`${t.noBomFound} ${order.productName}. ${t.createBomPrompt}`);
      if (create) {
        const newId = Math.random().toString(36).substr(2, 9);
        setProducts([...products, { 
          id: newId, 
          name: order.productName, 
          materialId: materials.length > 0 ? materials[0].id : '', 
          machineId: machines.length > 0 ? machines[0].id : '', 
          consumptionRate: 0.02, // Default guess
          throughput: 200,
          priority: 999,
          salePrice: order.salePrice
        }]);
      }
    }
  };

  // --- Calculations ---
  const productionPlan = useMemo(() => {
    const plans: ProductionPlan[] = [];
    
    const productsByMaterial: Record<string, Product[]> = {};
    products.forEach(p => {
      if (!p.materialId) return;
      if (!productsByMaterial[p.materialId]) productsByMaterial[p.materialId] = [];
      productsByMaterial[p.materialId].push(p);
    });

    Object.keys(productsByMaterial).forEach(matId => {
      const material = materials.find(m => m.id === matId);
      if (!material) return;

      const groupProducts = productsByMaterial[matId];
      const totalPriority = groupProducts.reduce((sum, p) => sum + (p.priority || 0), 0);

      groupProducts.forEach(product => {
        const machine = machines.find(m => m.id === product.machineId);
        
        let allocatedMaterial = 0;
        if (totalPriority > 0) {
            allocatedMaterial = material.quantity * (product.priority / totalPriority);
        } else {
            allocatedMaterial = material.quantity / groupProducts.length;
        }

        const consumption = product.consumptionRate > 0 ? product.consumptionRate : 0.001;
        const throughput = product.throughput > 0 ? product.throughput : 1;
        const dailyHours = machine ? machine.dailyHours : 8;

        const totalUnits = Math.floor(allocatedMaterial / consumption);
        const materialUsed = totalUnits * consumption;
        const totalHours = totalUnits / throughput;
        const totalDays = totalHours / (dailyHours > 0 ? dailyHours : 8);

        // Cost Calculations
        const matCost = materialUsed * (material.costPerUnit || 0);
        // Labor cost approximated per machine hour
        const laborCostPerHour = factorySettings.laborCostPerDay / 8; 
        const laborCost = totalHours * laborCostPerHour;
        // Overhead + Depreciation
        const overheadCost = totalHours * (factorySettings.overheadRatePerHour + factorySettings.depreciationPerHour);
        const totalCost = matCost + laborCost + overheadCost;
        
        // Revenue
        const salePrice = product.salePrice || 0;
        const revenue = totalUnits * salePrice;
        const profit = revenue - totalCost;

        plans.push({
          productId: product.id,
          productName: product.name,
          machineName: machine ? machine.name : 'Unassigned',
          machineStatus: machine ? machine.status : '-',
          materialName: material.name,
          totalUnits,
          materialUsed,
          totalHours,
          totalDays,
          costs: {
            material: matCost,
            labor: laborCost,
            overhead: overheadCost,
            total: totalCost
          },
          revenue,
          profit
        });
      });
    });

    return plans;
  }, [materials, machines, products]);

  // Filtered lists for display
  const filteredMaterials = materials.filter(m => m.name.toLowerCase().includes(matSearch.toLowerCase()));
  const filteredMachines = machines.filter(m => m.name.toLowerCase().includes(machSearch.toLowerCase()));
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(prodSearch.toLowerCase()));
  const filteredOrders = orders.filter(o => o.productName.toLowerCase().includes(orderSearch.toLowerCase()) || o.customerName.toLowerCase().includes(orderSearch.toLowerCase()));

  // Data for Charts
  const chartData = productionPlan
    .filter(p => p.totalUnits > 0)
    .slice(0, 10) // Limit chart to top 10 to avoid clutter
    .map(p => ({
      name: p.productName.length > 15 ? p.productName.substring(0, 15) + '...' : p.productName,
      Units: p.totalUnits,
      Profit: Math.floor(p.profit),
      Days: parseFloat(p.totalDays.toFixed(1)),
    }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ทำงาน': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ว่าง': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'เสีย':
      case 'กำลังซ่อม': return 'bg-red-100 text-red-700 border-red-200';
      case 'ทดสอบงาน': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t.introTitle}</h2>
          <p className="text-slate-600 max-w-3xl">
            {t.introText}
          </p>
        </div>
        <button 
          onClick={resetData}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {lang === 'th' ? 'รีเซ็ตข้อมูลโรงงาน' : 'Reset Factory Data'}
        </button>
      </div>

      {/* SECTION: ORDERS (NEW) */}
      <Card
        title={t.ordersTitle}
        icon={<ShoppingCart className="w-5 h-5" />}
      >
        <div className="mb-4 relative">
            <input
              type="text"
              placeholder={t.search}
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        </div>
        <div className="overflow-x-auto max-h-80">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-3 rounded-tl-lg">{t.colCustomer}</th>
                <th className="p-3">{t.colProduct}</th>
                <th className="p-3 text-right">{t.colQuantity}</th>
                <th className="p-3">{t.colDueDate}</th>
                <th className="p-3 text-right">{t.colPrice}</th>
                <th className="p-3 text-center">{t.colStatus}</th>
                <th className="p-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredOrders.map(order => (
                 <tr key={order.id} className="group hover:bg-slate-50">
                   <td className="p-3 font-medium text-slate-700">{order.customerName}</td>
                   <td className="p-3">
                     <div className="font-medium text-slate-800">{order.productName}</div>
                     <div className="text-xs text-slate-400">{order.color}</div>
                   </td>
                   <td className="p-3 text-right font-mono">{order.quantity.toLocaleString()}</td>
                   <td className="p-3 text-slate-500">{order.dueDate}</td>
                   <td className="p-3 text-right text-slate-600">฿{order.salePrice.toFixed(2)}</td>
                   <td className="p-3 text-center">
                     <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
                       {order.status}
                     </span>
                   </td>
                   <td className="p-3 text-right">
                     <button 
                       onClick={() => planOrder(order)}
                       className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded hover:bg-emerald-600 transition-colors flex items-center gap-1 ml-auto"
                     >
                       {t.btnPlan} <ArrowRight className="w-3 h-3" />
                     </button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION 1: RAW MATERIALS */}
        <Card 
          title={t.rawMaterialsTitle}
          icon={<Package className="w-5 h-5" />}
          action={
            <button onClick={addMaterial} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" /> {t.addMaterial}
            </button>
          }
        >
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder={t.search}
              value={matSearch}
              onChange={(e) => setMatSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                <tr>
                  <th className="p-3 rounded-tl-lg">{t.colMaterialName}</th>
                  <th className="p-3 w-28 text-right">{t.colQuantity}</th>
                  <th className="p-3 w-20 text-center">{t.colUnit}</th>
                  <th className="p-3 w-24 text-right">{t.colCost}</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMaterials.map((m) => (
                  <tr key={m.id} className="group hover:bg-slate-50">
                    <td className="p-2">
                      <input 
                        type="text" 
                        value={m.name} 
                        onChange={(e) => updateMaterial(m.id, 'name', e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-700 font-medium placeholder-slate-300 text-xs sm:text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        value={m.quantity} 
                        onChange={(e) => updateMaterial(m.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                      />
                    </td>
                    <td className="p-2 text-center text-slate-500">
                       {m.unit}
                    </td>
                    <td className="p-2">
                       <input 
                        type="number" 
                        value={m.costPerUnit} 
                        onChange={(e) => updateMaterial(m.id, 'costPerUnit', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-right text-xs"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeMaterial(m.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SECTION 2: MACHINES */}
        <Card 
          title={t.machineConfigTitle} 
          icon={<Settings className="w-5 h-5" />}
          action={
            <button onClick={addMachine} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" /> {t.addMachine}
            </button>
          }
        >
           <div className="mb-4 relative">
            <input
              type="text"
              placeholder={t.search}
              value={machSearch}
              onChange={(e) => setMachSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                <tr>
                  <th className="p-3 rounded-tl-lg">{t.colMachineName}</th>
                  <th className="p-3 w-24">{t.colStatus}</th>
                  <th className="p-3 w-24 text-center">{t.colHoursDay}</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMachines.map((m) => (
                  <tr key={m.id} className="group hover:bg-slate-50">
                    <td className="p-2">
                      <input 
                        type="text" 
                        value={m.name} 
                        onChange={(e) => updateMachine(m.id, 'name', e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-700 font-medium placeholder-slate-300"
                      />
                      {m.location && <div className="text-xs text-slate-400 px-3">{m.location}</div>}
                    </td>
                    <td className="p-2">
                      <div className={`px-2 py-1 rounded border text-xs text-center font-medium ${getStatusColor(m.status)}`}>
                        {m.status}
                      </div>
                    </td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        min="1" max="24"
                        value={m.dailyHours} 
                        onChange={(e) => updateMachine(m.id, 'dailyHours', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeMachine(m.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* SECTION 3: PRODUCT BOM & RECIPE */}
      <Card 
        title={t.productsBomTitle}
        icon={<Factory className="w-5 h-5" />}
        action={
          <button onClick={addProduct} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" /> {t.addProduct}
          </button>
        }
      >
        <div className="mb-4 relative">
            <input
              type="text"
              placeholder={t.search}
              value={prodSearch}
              onChange={(e) => setProdSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        </div>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-sm text-left min-w-[900px]">
            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-3">{t.colProductName}</th>
                <th className="p-3 w-64">{t.colRawMaterial}</th>
                <th className="p-3 w-28 text-center">{t.colConsumRate}</th>
                <th className="p-3 w-48">{t.colMachine}</th>
                <th className="p-3 w-28 text-center">{t.colThroughput}</th>
                <th className="p-3 w-28 text-center">{t.colAllocShare}</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const mat = materials.find(m => m.id === p.materialId);
                return (
                <tr key={p.id} className="group hover:bg-slate-50">
                  <td className="p-2">
                    <input 
                      type="text" 
                      value={p.name} 
                      onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-slate-700 font-medium placeholder-slate-300"
                    />
                  </td>
                  <td className="p-2">
                    <select 
                      value={p.materialId}
                      onChange={(e) => updateProduct(p.id, 'materialId', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-700 text-xs"
                    >
                      <option value="" disabled>{t.selectMaterialPlaceholder}</option>
                      {materials.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                    {mat && <div className="text-xs text-emerald-600 mt-1 ml-1">Stock: {mat.quantity} {mat.unit}</div>}
                  </td>
                  <td className="p-2">
                     <div className="flex items-center gap-1">
                      <input 
                        type="number" step="0.0001"
                        value={p.consumptionRate} 
                        onChange={(e) => updateProduct(p.id, 'consumptionRate', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-center"
                      />
                      <span className="text-xs text-slate-400">{mat?.unit || 'unit'}</span>
                     </div>
                  </td>
                  <td className="p-2">
                    <select 
                      value={p.machineId}
                      onChange={(e) => updateProduct(p.id, 'machineId', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-700 text-xs"
                    >
                      <option value="" disabled>{t.selectMachinePlaceholder}</option>
                      {machines.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.status})</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <input 
                      type="number" 
                      value={p.throughput} 
                      onChange={(e) => updateProduct(p.id, 'throughput', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-center"
                    />
                    {p.cycleTimeSeconds && <div className="text-[10px] text-slate-400 text-center mt-0.5">Cycle: {p.cycleTimeSeconds}s</div>}
                  </td>
                  <td className="p-2">
                    <input 
                      type="number"
                      min="1" 
                      value={p.priority} 
                      onChange={(e) => updateProduct(p.id, 'priority', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-center font-semibold text-blue-600"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button onClick={() => removeProduct(p.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SECTION 4: CALCULATION RESULTS */}
      <Card 
        title={t.planSummaryTitle}
        icon={<Calculator className="w-5 h-5" />}
      >
         {productionPlan.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 text-slate-400">
             <AlertCircle className="w-12 h-12 mb-3 text-slate-300" />
             <p>{t.alertCompleteSetup}</p>
           </div>
         ) : (
           <div className="space-y-8">
             
             {/* Visualizations */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-80">
                {/* Chart 1: Output */}
                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> {t.chartTotalOutput}
                  </h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={60} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="Units" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart 2: Time */}
                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {t.chartTimeRequired}
                  </h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" width={100} fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="Days" fill="#10b981" radius={[0, 4, 4, 0]} barSize={15} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart 3: Financials */}
                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> {t.chartProfit}
                  </h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={60} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                         formatter={(value: number) => `฿${value.toLocaleString()}`}
                         cursor={{fill: '#f1f5f9'}}
                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="Profit" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Detailed Table */}
             <div className="overflow-x-auto rounded-lg border border-slate-200 max-h-[600px]">
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-xs tracking-wider sticky top-0 z-10 shadow-sm">
                   <tr>
                     <th className="p-4">{t.tblProduct}</th>
                     <th className="p-4">{t.tblMachine}</th>
                     <th className="p-4 text-right">{t.tblTotalOutput}</th>
                     <th className="p-4 text-right">{t.tblMaterialConsumed}</th>
                     <th className="p-4 text-right">{t.tblDays}</th>
                     <th className="p-4 text-right">{t.tblCost}</th>
                     <th className="p-4 text-right">{t.tblProfit}</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 bg-white">
                   {productionPlan.map((plan, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 transition-colors">
                       <td className="p-4 font-medium text-slate-800">{plan.productName}</td>
                       <td className="p-4 text-slate-600">
                         {plan.machineName}
                         <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(plan.machineStatus)}`}>
                            {plan.machineStatus}
                         </span>
                       </td>
                       <td className="p-4 text-right font-mono text-blue-600 font-bold">{plan.totalUnits.toLocaleString()}</td>
                       <td className="p-4 text-right text-slate-600">{plan.materialUsed.toLocaleString()} <span className="text-xs text-slate-400">units</span></td>
                       <td className="p-4 text-right font-medium text-slate-800">{plan.totalDays.toFixed(2)} d</td>
                       <td className="p-4 text-right text-red-500 text-xs">฿{plan.costs.total.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                       <td className="p-4 text-right text-emerald-600 font-bold">฿{plan.profit.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>

           </div>
         )}
      </Card>
    </div>
  );
};
