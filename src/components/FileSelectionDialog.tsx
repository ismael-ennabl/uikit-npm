
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FileSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  packageName: string;
  packageId: number;
  onUpdatePackageName: (packageId: number, newName: string) => void;
}

const FileSelectionDialog = ({ open, onClose, packageName, packageId, onUpdatePackageName }: FileSelectionDialogProps) => {
  const [selectedSourceOfTruth, setSelectedSourceOfTruth] = useState<number>(1);
  
  // Mock files data - different sets based on packageId
  const getFilesForPackage = (id: number) => {
    switch (id) {
      case 1:
        return [
          { id: 1, name: 'ABC_Auto_Policy_2025.pdf', type: 'Policy Document', uploadDate: '2025-01-15', size: '2.4 MB', isSourceOfTruth: true },
          { id: 2, name: 'ABC_COI_Certificate.pdf', type: 'Certificate of Insurance', uploadDate: '2025-01-16', size: '1.8 MB', isSourceOfTruth: false },
          { id: 3, name: 'ABC_Additional_Coverage.pdf', type: 'Additional Coverage', uploadDate: '2025-01-17', size: '1.2 MB', isSourceOfTruth: false },
          { id: 4, name: 'ABC_Endorsements.pdf', type: 'Endorsements', uploadDate: '2025-01-18', size: '800 KB', isSourceOfTruth: false },
          { id: 5, name: 'ABC_Claims_History.pdf', type: 'Claims History', uploadDate: '2025-01-19', size: '1.5 MB', isSourceOfTruth: false },
          { id: 6, name: 'ABC_Fleet_Schedule.pdf', type: 'Fleet Schedule', uploadDate: '2025-01-20', size: '2.1 MB', isSourceOfTruth: false },
          { id: 7, name: 'ABC_Driver_Records.pdf', type: 'Driver Records', uploadDate: '2025-01-21', size: '1.9 MB', isSourceOfTruth: false },
          { id: 8, name: 'ABC_Vehicle_Inspection.pdf', type: 'Vehicle Inspection', uploadDate: '2025-01-22', size: '1.3 MB', isSourceOfTruth: false },
          { id: 9, name: 'ABC_Safety_Program.pdf', type: 'Safety Program', uploadDate: '2025-01-23', size: '900 KB', isSourceOfTruth: false },
          { id: 10, name: 'ABC_Accident_Reports.pdf', type: 'Accident Reports', uploadDate: '2025-01-24', size: '1.7 MB', isSourceOfTruth: false },
          { id: 11, name: 'ABC_MVR_Reports.pdf', type: 'MVR Reports', uploadDate: '2025-01-25', size: '1.1 MB', isSourceOfTruth: false },
          { id: 12, name: 'ABC_Training_Records.pdf', type: 'Training Records', uploadDate: '2025-01-26', size: '1.4 MB', isSourceOfTruth: false },
          { id: 13, name: 'ABC_Maintenance_Logs.pdf', type: 'Maintenance Logs', uploadDate: '2025-01-27', size: '1.6 MB', isSourceOfTruth: false },
          { id: 14, name: 'ABC_Compliance_Docs.pdf', type: 'Compliance Documents', uploadDate: '2025-01-28', size: '1.8 MB', isSourceOfTruth: false },
          { id: 15, name: 'ABC_Insurance_Application.pdf', type: 'Insurance Application', uploadDate: '2025-01-29', size: '2.2 MB', isSourceOfTruth: false }
        ];
      case 2:
        return [
          { id: 1, name: 'XYZ_Liability_COI_2025.pdf', type: 'Certificate of Insurance', uploadDate: '2025-01-10', size: '2.1 MB', isSourceOfTruth: true },
          { id: 2, name: 'XYZ_General_Liability.pdf', type: 'General Liability Policy', uploadDate: '2025-01-11', size: '3.2 MB', isSourceOfTruth: false },
          { id: 3, name: 'XYZ_Product_Liability.pdf', type: 'Product Liability', uploadDate: '2025-01-12', size: '2.8 MB', isSourceOfTruth: false },
          { id: 4, name: 'XYZ_Professional_Liability.pdf', type: 'Professional Liability', uploadDate: '2025-01-13', size: '2.5 MB', isSourceOfTruth: false },
          { id: 5, name: 'XYZ_Cyber_Liability.pdf', type: 'Cyber Liability', uploadDate: '2025-01-14', size: '1.9 MB', isSourceOfTruth: false },
          { id: 6, name: 'XYZ_Directors_Officers.pdf', type: 'Directors & Officers', uploadDate: '2025-01-15', size: '2.3 MB', isSourceOfTruth: false },
          { id: 7, name: 'XYZ_Employment_Practices.pdf', type: 'Employment Practices', uploadDate: '2025-01-16', size: '2.0 MB', isSourceOfTruth: false },
          { id: 8, name: 'XYZ_Fiduciary_Liability.pdf', type: 'Fiduciary Liability', uploadDate: '2025-01-17', size: '1.7 MB', isSourceOfTruth: false },
          { id: 9, name: 'XYZ_Crime_Coverage.pdf', type: 'Crime Coverage', uploadDate: '2025-01-18', size: '1.4 MB', isSourceOfTruth: false },
          { id: 10, name: 'XYZ_Umbrella_Policy.pdf', type: 'Umbrella Policy', uploadDate: '2025-01-19', size: '2.6 MB', isSourceOfTruth: false },
          { id: 11, name: 'XYZ_Excess_Liability.pdf', type: 'Excess Liability', uploadDate: '2025-01-20', size: '2.4 MB', isSourceOfTruth: false },
          { id: 12, name: 'XYZ_International_Coverage.pdf', type: 'International Coverage', uploadDate: '2025-01-21', size: '1.8 MB', isSourceOfTruth: false },
          { id: 13, name: 'XYZ_Risk_Assessment.pdf', type: 'Risk Assessment', uploadDate: '2025-01-22', size: '1.5 MB', isSourceOfTruth: false },
          { id: 14, name: 'XYZ_Loss_Control.pdf', type: 'Loss Control', uploadDate: '2025-01-23', size: '1.6 MB', isSourceOfTruth: false },
          { id: 15, name: 'XYZ_Certificate_Holder.pdf', type: 'Certificate Holder Info', uploadDate: '2025-01-24', size: '900 KB', isSourceOfTruth: false },
          { id: 16, name: 'XYZ_Additional_Insured.pdf', type: 'Additional Insured', uploadDate: '2025-01-25', size: '1.1 MB', isSourceOfTruth: false },
          { id: 17, name: 'XYZ_Waiver_Subrogation.pdf', type: 'Waiver of Subrogation', uploadDate: '2025-01-26', size: '800 KB', isSourceOfTruth: false },
          { id: 18, name: 'XYZ_Primary_Noncontributory.pdf', type: 'Primary & Noncontributory', uploadDate: '2025-01-27', size: '950 KB', isSourceOfTruth: false },
          { id: 19, name: 'XYZ_Notice_Cancellation.pdf', type: 'Notice of Cancellation', uploadDate: '2025-01-28', size: '700 KB', isSourceOfTruth: false },
          { id: 20, name: 'XYZ_Renewal_Notice.pdf', type: 'Renewal Notice', uploadDate: '2025-01-29', size: '1.0 MB', isSourceOfTruth: false },
          { id: 21, name: 'XYZ_Binder_Letter.pdf', type: 'Binder Letter', uploadDate: '2025-01-30', size: '650 KB', isSourceOfTruth: false },
          { id: 22, name: 'XYZ_Broker_Letter.pdf', type: 'Broker Letter', uploadDate: '2025-01-31', size: '750 KB', isSourceOfTruth: false },
          { id: 23, name: 'XYZ_Compliance_Checklist.pdf', type: 'Compliance Checklist', uploadDate: '2025-02-01', size: '1.2 MB', isSourceOfTruth: false }
        ];
      case 3:
        return Array.from({ length: 44 }, (_, i) => ({
          id: i + 1,
          name: `Global_Workers_Comp_${String(i + 1).padStart(2, '0')}.pdf`,
          type: i === 0 ? 'Master Policy' : `Document ${i + 1}`,
          uploadDate: `2025-01-${String((i % 30) + 1).padStart(2, '0')}`,
          size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
          isSourceOfTruth: i === 0
        }));
      default:
        return [];
    }
  };

  const files = getFilesForPackage(packageId);

  const handleSetSourceOfTruth = (fileId: number) => {
    setSelectedSourceOfTruth(fileId);
  };

  const handleSaveChanges = () => {
    const selectedFile = files.find(file => file.id === selectedSourceOfTruth);
    if (selectedFile) {
      console.log(`Set file ${selectedSourceOfTruth} as source of truth for package ${packageId}`);
      onUpdatePackageName(packageId, selectedFile.name);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Files in Package: {packageName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-brand-blue/10 rounded-lg border border-brand-blue">
            <h4 className="font-medium text-brand-blue mb-2">Source of Truth Selection</h4>
            <p className="text-sm text-brand-blue">
              Select which document should be considered the authoritative source for this package. 
              This will be used as the primary reference for comparisons and will update the package name.
            </p>
          </div>

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {files.map((file) => (
              <Card 
                key={file.id} 
                className={`cursor-pointer transition-all ${
                  selectedSourceOfTruth === file.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => handleSetSourceOfTruth(file.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-brand-blue" />
                      <div>
                        <h4 className="font-medium text-foreground">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{file.type}</span>
                          <span>{file.size}</span>
                          <span>Uploaded: {file.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {selectedSourceOfTruth === file.id && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <Badge className="bg-success/10 text-success">
                            Selected as Source of Truth
                          </Badge>
                        </div>
                      )}
                      {file.isSourceOfTruth && selectedSourceOfTruth !== file.id && (
                        <Badge className="bg-brand-blue/10 text-brand-blue">
                          Current Source of Truth
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} className="bg-brand-blue hover:bg-brand-blue/90 text-brand-blue-foreground">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileSelectionDialog;
