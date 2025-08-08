import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Trash2, Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TYPOGRAPHY } from '@/styles/tokens';

const PackageFiles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const packageId = parseInt(id || '0');
  
  const [selectedSourceOfTruth, setSelectedSourceOfTruth] = useState<number>(1);
  const [showInfoBox, setShowInfoBox] = useState<boolean>(true);
  
  // Mock package names
  const getPackageName = (id: number) => {
    const packages: { [key: string]: string } = {
      '1': 'ABC_Auto_Policy_2024.pdf',
      '2': 'XYZ_Liability_COI_2024.pdf',
      '3': 'Global_Workers_Comp_Master.pdf',
      '4': 'TechCorp_Cyber_Liability.pdf',
      '5': 'Manufacturing_GL_Package.pdf',
      '6': 'Healthcare_Professional_Liability.pdf'
    };
    return packages[id.toString()] || 'Document Package';
  };

  // Mock files data - different sets based on packageId
  const getFilesForPackage = (id: number) => {
    switch (id) {
      case 1:
        return [
          { id: 1, name: 'ABC_Auto_Policy_2024.pdf', type: 'Policy Document', uploadDate: '2024-01-15', size: '2.4 MB', isSourceOfTruth: true },
          { id: 2, name: 'ABC_COI_Certificate.pdf', type: 'Certificate of Insurance', uploadDate: '2024-01-16', size: '1.8 MB', isSourceOfTruth: false },
          { id: 3, name: 'ABC_Additional_Coverage.pdf', type: 'Additional Coverage', uploadDate: '2024-01-17', size: '1.2 MB', isSourceOfTruth: false },
          { id: 4, name: 'ABC_Endorsements.pdf', type: 'Endorsements', uploadDate: '2024-01-18', size: '800 KB', isSourceOfTruth: false },
          { id: 5, name: 'ABC_Claims_History.pdf', type: 'Claims History', uploadDate: '2024-01-19', size: '1.5 MB', isSourceOfTruth: false }
        ];
      case 2:
        return [
          { id: 1, name: 'XYZ_Liability_COI_2024.pdf', type: 'Certificate of Insurance', uploadDate: '2024-01-10', size: '2.1 MB', isSourceOfTruth: true },
          { id: 2, name: 'XYZ_General_Liability.pdf', type: 'General Liability Policy', uploadDate: '2024-01-11', size: '3.2 MB', isSourceOfTruth: false },
          { id: 3, name: 'XYZ_Product_Liability.pdf', type: 'Product Liability', uploadDate: '2024-01-12', size: '2.8 MB', isSourceOfTruth: false }
        ];
      default:
        return Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          name: `Document_${String(i + 1).padStart(2, '0')}.pdf`,
          type: i === 0 ? 'Master Policy' : `Document ${i + 1}`,
          uploadDate: `2024-01-${String((i % 30) + 1).padStart(2, '0')}`,
          size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
          isSourceOfTruth: i === 0
        }));
    }
  };

  const [files, setFiles] = useState(getFilesForPackage(packageId));
  const packageName = getPackageName(packageId);

  const handleSetSourceOfTruth = (fileId: number) => {
    setSelectedSourceOfTruth(fileId);
  };

  const handleRemoveFile = (fileId: number) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  };

  const handleAddMoreFiles = () => {
    console.log('Add more files functionality');
    const newFile = {
      id: Math.max(...files.map(f => f.id)) + 1,
      name: `New_Document_${Date.now()}.pdf`,
      type: 'Additional Document',
      uploadDate: new Date().toISOString().split('T')[0],
      size: '1.0 MB',
      isSourceOfTruth: false
    };
    setFiles(prevFiles => [...prevFiles, newFile]);
  };

  const handleSaveChanges = () => {
    console.log(`Set file ${selectedSourceOfTruth} as source of truth for package ${packageId}`);
    navigate('/');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={TYPOGRAPHY.h1}>Files in Package</h1>
        <p className="text-muted-foreground">{packageName}</p>
      </div>

      {/* Info Box */}
      {showInfoBox && (
        <div className="mb-6 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/20 relative">
          <button
            onClick={() => setShowInfoBox(false)}
            className="absolute top-2 right-2 p-1 hover:bg-brand-blue/15 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-brand-blue" />
          </button>
          <h4 className="font-medium text-brand-blue mb-2">Source of Truth Selection</h4>
          <p className="text-sm text-brand-blue">
            Select which document should be considered the authoritative source for this package. 
            This will be used as the primary reference for comparisons and will update the package name.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mb-6 flex justify-between items-center">
        <Button onClick={handleAddMoreFiles} className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add More Files
        </Button>
        <div className="text-sm text-gray-600">
          {files.length} files total
        </div>
      </div>

      {/* Files List */}
      <div className="grid gap-4 mb-8">
        {files.map((file) => (
          <Card 
            key={file.id} 
            className={`cursor-pointer transition-all ${
              selectedSourceOfTruth === file.id 
                ? 'border-brand-blue bg-brand-blue/10' 
                : 'hover:border-border'
            }`}
            onClick={() => handleSetSourceOfTruth(file.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-muted-foreground" />
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} className="bg-brand-blue hover:bg-brand-blue/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PackageFiles;
