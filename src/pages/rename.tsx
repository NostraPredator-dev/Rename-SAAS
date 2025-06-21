import { useState } from 'react';
import { toast } from 'react-hot-toast';
import DropZone from '../components/rename/dropZone';
import RenameRules from '../components/rename/renameRules';
import RulePresets from '../components/rename/rulePresets';
import FilePreview from '../components/rename/filePreview';
import type { FileWithPreview, RenameRule, RulePreset } from '../components/rename/file';
import { generateNewFilenames, downloadFiles } from '../components/rename/util/renameUtil';
import { useAuth } from '../context/authContext';
import axios from 'axios';

interface RenamePageProps {
    creditBalance: number;
    setCreditBalance: (balance: number) => void;
    downloadReady: boolean;
    setDownloadReady: (ready: boolean) => void;
}

export default function RenamePage({ creditBalance, setCreditBalance, downloadReady, setDownloadReady }: RenamePageProps) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [rules, setRules] = useState<RenameRule[]>([]);

    const { currentUser } = useAuth();

    async function updateHistory(name: string) {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        const response = await axios.post('http://13.203.194.44:3000/credit-history', {
            user_id: userId,
            amount: (`-` + files.length),
            reason: name,
            used_at: new Date().toISOString(),
        })
        if (response.status !== 200) {
            const { error } = response.data
            console.error('Error updating history:', error);
            toast.error('Failed to update credit history');
        }
    };

    async function updateCreditBalance(credits: number) {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        const response = await axios.post('http://13.203.194.44:3000/credit-balance', {
            user_id: userId,
            credits: credits,
        })
        if (response.status !== 200) {
            const { error } = response.data
            console.error('Error updating credits:', error);
            toast.error('Failed to update credits');
        }
        setCreditBalance(credits);
    };

    const applyPreset = (preset: RulePreset) => {
        if (files.length > 0 && preset.data.rules.length > 0) {
            const requiredCredits = files.length;
            if (creditBalance < requiredCredits) {
                toast.error(`Insufficient credits. You need ${requiredCredits} credits.`, {
                    duration: 4000,
                });
                return;
            }
            const updatedFiles = generateNewFilenames(files, preset.data.rules);
            setFiles(updatedFiles);
            updateCreditBalance(creditBalance - requiredCredits);
            updateHistory(preset.name);
            setDownloadReady(true);
        }
    };

    const applyRules = () => {
        if (files.length > 0 && rules.length > 0) {
            const requiredCredits = files.length;
            if (creditBalance < requiredCredits) {
                toast.error(`Insufficient credits. You need ${requiredCredits} credits.`, {
                    duration: 4000,
                });
                return;
            }
            const updatedFiles = generateNewFilenames(files, rules);
            setFiles(updatedFiles);
            updateCreditBalance(creditBalance - requiredCredits);
            const ruleString = rules.map(rule => rule.type).join(', ');
            updateHistory(ruleString);
            setDownloadReady(true);
        }
    };

    const handleDelete = () => {
        setFiles([]);
        setDownloadReady(false);
    };

    const handleFileDelete = (fileId: string) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    };

    const handleDownload = () => {
        downloadFiles(files);
    };

    return (
        <div className="bg-gray-50 py-8 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files ({files.length})</h2>
                        <DropZone setFiles={setFiles} />
                        <RulePresets onFilenamesChange={applyPreset} />
                        <RenameRules rules={rules} setRules={setRules} onFilenamesChange={applyRules} />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <FilePreview
                                files={files}
                                downloadReady={downloadReady}
                                onDownload={handleDownload}
                                onDelete={handleDelete}
                                onFileDelete={handleFileDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};