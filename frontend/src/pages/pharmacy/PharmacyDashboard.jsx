import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import KPICard from '../common/KPICard';
import AlertBox from '../common/AlertBox';
import DataTable from '../common/DataTable';
import ChatWindow from './ChatWindow';

const PharmacyDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [kpi, setKpi] = useState({ expiring: 0, totalValue: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes] = await Promise.all([
          api.get('/inventory')
        ]);
        setInventory(invRes.data);
        // mock KPI for demo – replace with real endpoint
        setKpi({ expiring: 6, totalValue: 248500, pendingOrders: 7 });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { key: 'medicine.brandName', label: 'Brand' },
    { key: 'medicine.genericName', label: 'Generic' },
    { key: 'medicine.strength', label: 'Strength' },
    { key: 'batchNumber', label: 'Batch' },
    { key: 'quantity', label: 'Qty' },
    { key: 'expiryDate', label: 'Expiry' },
    { key: 'price', label: 'Price' }
  ];

  return (
    <div className="dashboard">
      <div className="kpi-grid">
        <KPICard label="Expiring Soon" value={kpi.expiring} icon="exclamation-triangle" color="warning" />
        <KPICard label="Inventory Value" value={`₿ ${kpi.totalValue}`} icon="box" color="primary" />
        <KPICard label="Pending Orders" value={kpi.pendingOrders} icon="clock" color="danger" />
      </div>

      <AlertBox 
        title="⚠️ Medicines expiring within 6 months"
        details="6 medicines need attention. Review and reorder."
        severity="warning"
      />

      <DataTable 
        columns={columns}
        data={inventory}
        loading={loading}
        actions={[
          { label: 'Add Medicine', onClick: () => alert('Add Medicine') },
          { label: 'Export CSV', onClick: () => alert('Export') }
        ]}
      />

      <ChatWindow />
    </div>
  );
};

export default PharmacyDashboard;