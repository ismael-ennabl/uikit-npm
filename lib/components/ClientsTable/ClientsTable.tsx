import React from 'react';
import { generateClientsData, type InsuranceClient } from '../../utils/fakerInsurance';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';

export interface ClientsTableProps {
  /** Custom data to display (optional - uses mock data if not provided) */
  data?: InsuranceClient[];
  /** Number of rows to generate if no data provided (default: 5) */
  rows?: number;
  /** Additional CSS classes */
  className?: string;
  /** Show/hide the table header */
  showHeader?: boolean;
  /** Show/hide contact information */
  showContactInfo?: boolean;
}

const ClientsTable = ({
  data,
  rows = 5,
  className,
  showHeader = true,
  showContactInfo = false
}: ClientsTableProps) => {
  const tableData = data || generateClientsData(rows);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending Renewal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Lapsed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {showHeader && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Insurance Clients</h2>
          <p className="text-sm text-gray-600 mt-1">
            {tableData.length} client{tableData.length !== 1 ? 's' : ''} managed
          </p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Broker
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Policy #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Premium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {showContactInfo && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.broker}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {row.policyNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {row.premium}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.industry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getStatusColor(row.status))}
                  >
                    {row.status}
                  </Badge>
                </td>
                {showContactInfo && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.contactEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.phoneNumber}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable; 