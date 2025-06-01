import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import type { FileWithPreview } from './file';
import { v4 as uuidv4 } from 'uuid';

interface DropZoneProps {
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

const DropZone: React.FC<DropZoneProps> = ({ setFiles }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const filesWithPreviews = acceptedFiles.map(file => {
            const preview = URL.createObjectURL(file);
            return Object.assign(file, {
                provider: "local",
                id: `file-${uuidv4()}`,
                preview,
                newName: file.name,
                originalFile: file
            });
        });
        
        setFiles(prev => [...prev, ...filesWithPreviews]);
    }, [setFiles]);

    const { 
        getRootProps, 
        getInputProps, 
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop, accept: undefined });

    return (
        <div className="w-full">
            <div 
                {...getRootProps()} 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'}
                    ${isDragAccept ? 'border-success-500 bg-success-50' : ''}
                    ${isDragReject ? 'border-error-500 bg-error-50' : ''}
                `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    {isDragActive ? (
                        <p className="text-lg font-medium text-primary-600">Drop the files here...</p>
                    ) : (
                        <>
                            <p className="text-lg font-medium mb-1">Drag and drop files here</p>
                            <p className="text-gray-500">or click to select files</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropZone;