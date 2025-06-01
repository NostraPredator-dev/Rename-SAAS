import { Download, Trash2 } from 'lucide-react';
import type { FileWithPreview } from './file';

interface FilePreviewProps {
    files: FileWithPreview[];
    downloadReady: boolean;
    onDownload: () => void;
    onDelete: () => void;
    onFileDelete: (index: string) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ files, downloadReady, onDownload, onDelete, onFileDelete }) => {
    if (files.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">File Preview</h2>
                <div className="flex items-center gap-5">
                    <button
                        onClick={onDelete}
                        disabled={files.length === 0}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                            ${files.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        <Trash2 className="h-5 w-5 mr-1.5" />
                        Delete All
                    </button>
                    <button
                        onClick={onDownload}
                        disabled={!downloadReady || files.length === 0}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                            ${downloadReady && files.length > 0 ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        <Download className="h-4 w-4 mr-1.5" />
                        Download Files
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Original Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                New Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {files.map((file) => (
                            <tr key={file.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Trash2 onClick={() => onFileDelete(file.id)} className="h-5 w-5 text-red-400 hover:text-red-600 hover:scale-110" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{file.originalFile.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{file.newName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {(file.originalFile.size / 1024).toFixed(0)} KB
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {files.length > 10 && (
                <div className="mt-4 text-right">
                    <p className="text-sm text-gray-500">
                        Showing {files.length} files
                    </p>
                </div>
            )}
        </div>
    );
};

export default FilePreview;