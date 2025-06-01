import { useEffect, useState } from 'react';
import { Clock, Trash } from 'lucide-react';
import type { RulePreset } from './file';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-hot-toast';

interface RulePresetsProps {
    onFilenamesChange: (preset: RulePreset) => void;
}

const RulePresets: React.FC<RulePresetsProps> = ({ onFilenamesChange }) => {
    const [presets, setPresets] = useState<RulePreset[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchPresets = async () => {
            const userPresets = await getUserPresets();
            if (!userPresets || userPresets.length === 0) {
                console.log('No presets found for the user');
                setPresets([]);
                return;
            }
            setPresets(userPresets);
        };
        fetchPresets();

        const handlePresetSave = () => {
            fetchPresets();
        };

        window.addEventListener('presetSaved', handlePresetSave);
        return () => {
            window.removeEventListener('presetSaved', handlePresetSave);
        };
    }, [refreshTrigger]);

    async function getUserPresets() {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        const { data, error } = await supabase
            .from('presets')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching presets:', error);
            toast.error('Failed to fetch presets. Please try again.');
        }
        else return data;
    }


    const applyPreset = (preset: RulePreset) => {
        onFilenamesChange(preset);
    };

    async function deleteUserPreset(id: string) {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        const { error } = await supabase
            .from('presets')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) {
            console.error('Error deleting preset:', error);
            toast.error('Failed to delete preset. Please try again.');
        } else {
            toast.success('Preset deleted successfully.');
            setRefreshTrigger(prev => prev + 1);
        }
    }

    const deletePreset = (id: string) => {
        deleteUserPreset(id);
    };

    if (presets.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Saved Presets</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {presets.map((preset) => (
                    <div 
                        key={preset.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all relative group"
                    >
                        <button
                            onClick={() => deletePreset(preset.id)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash className="h-4 w-4" />
                        </button>
                        
                        <div className="flex items-center mb-2">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="font-medium text-gray-900">{preset.name}</h3>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-4">
                            {preset.data.rules.length} rule{preset.data.rules.length !== 1 ? 's' : ''}
                        </p>
                        
                        <button
                            onClick={() => applyPreset(preset)}
                            className="w-full text-center text-sm px-3 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-md transition-colors"
                        >
                            Apply Preset
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RulePresets;