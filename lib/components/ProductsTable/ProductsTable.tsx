import React from 'react';
import { generateProductsData, type InsuranceProduct } from '../../utils/fakerInsurance';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';

export interface ProductsTableProps {
  /** Custom data to display (optional - uses mock data if not provided) */
  data?: InsuranceProduct[];
  /** Number of rows to generate if no data provided (default: 5) */
  rows?: number;
  /** Additional CSS classes */
  className?: string;
  /** Show/hide the table header */
  showHeader?: boolean;
  /** Enable sorting functionality */
  sortable?: boolean;
}

const ProductsTable = ({
  data,
  rows = 5,
  className,
  showHeader = true,
  sortable = false
}: ProductsTableProps) => {
  const tableData = data || generateProductsData(rows);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {showHeader && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Insurance Products</h2>
          <p className="text-sm text-gray-600 mt-1">
            {tableData.length} product{tableData.length !== 1 ? 's' : ''} available
          </p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Carrier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Effective Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.carrier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {row.coverageAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.policyType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getStatusColor(row.status))}
                  >
                    {row.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.effectiveDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable; 