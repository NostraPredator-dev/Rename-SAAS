import { useState } from 'react';
import { Plus, Save, Trash, ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';
import type { RenameRule } from './file';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface RenameRulesProps {
    rules: RenameRule[];
    setRules: React.Dispatch<React.SetStateAction<RenameRule[]>>;
    onFilenamesChange: () => void;
}

const RenameRules: React.FC<RenameRulesProps> = ({ rules, setRules, onFilenamesChange }) => {
    const [presetName, setPresetName] = useState('');
    const [showSavePreset, setShowSavePreset] = useState(false);

    const { currentUser } = useAuth();

    const addRule = (type: RenameRule['type']) => {
        const newRule: RenameRule = {
            id: `rule-${Math.floor(Math.random() * Date.now())}`,
            type,
            config: type === 'numbering' 
                ? { start: 1, step: 1, digits: 3 } 
                : type === 'date' 
                ? { format: 'YYYY-MM-DD', position: 'prefix' } 
                : {},
            active: true
        };
        setRules([...rules, newRule]);
    };

    const updateRule = (id: string, field: string, value: any) => {
        const updatedRules = rules.map(rule => {
            if (rule.id !== id) 
                return rule;

            if (rule.id === id && field === 'active')
                return { ...rule, active: value };
            else 
            {
                return { 
                    ...rule, 
                    config: { 
                        ...rule.config, 
                        [field]: value 
                    } 
                };
            }
        });
        setRules(updatedRules);
    };

    const removeRule = (id: string) => {
        setRules(rules.filter(rule => rule.id !== id));
    };

    const moveRule = (id: string, direction: 'up' | 'down') => {
        const index = rules.findIndex(rule => rule.id === id);
        if (
            (direction === 'up' && index === 0) || 
            (direction === 'down' && index === rules.length - 1)
        ) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const updatedRules = [...rules];
        const [movedRule] = updatedRules.splice(index, 1);
        updatedRules.splice(newIndex, 0, movedRule);
        
        setRules(updatedRules);
        onFilenamesChange();
    };

    async function storePreset( presetData: { rules: RenameRule[] }) {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }
        
        const response = await axios.post('http://localhost:3000/save-preset', {
            userId: userId,
            presetName: presetName,
            presetData: presetData
        });

        if(response.status !== 200) {
            const { error } = response.data;
            console.error('Error saving preset:', error);
            toast.error('Failed to save preset. Please try again.');
        } else {
            window.dispatchEvent(new Event('presetSaved'));
            toast.success('Preset saved successfully!');
        }
    }


    const savePreset = () => {
        if (!presetName.trim()) return;

        const presetData = {
            rules: rules.map(rule => ({
                id: rule.id,
                type: rule.type,
                config: rule.config,
                active: rule.active
            })),
        };

        storePreset(presetData);
        setPresetName('');
        setRules([]);
        setShowSavePreset(false);
    };

    const renderRuleConfig = (rule: RenameRule) => {
        switch (rule.type) {
            case 'prefix':
                return (
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prefix Text</label>
                        <input
                            type="text"
                            value={rule.config.text || ''}
                            onChange={(e) => updateRule(rule.id, 'text', e.target.value)}
                            className="w-full border-0 border-b border-gray-200 focus:outline-none"
                            placeholder="Enter prefix text"
                        />
                    </div>
                );

            case 'suffix':
                return (
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Suffix Text</label>
                        <input
                            type="text"
                            value={rule.config.text || ''}
                            onChange={(e) => updateRule(rule.id, 'text', e.target.value)}
                            className="w-full border-0 border-b border-gray-200 focus:outline-none"
                            placeholder="Enter suffix text"
                        />
                    </div>
                );

            case 'replace':
                return (
                    <div className="flex-1 space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search Text</label>
                            <input
                                type="text"
                                value={rule.config.search || ''}
                                onChange={(e) => updateRule(rule.id, 'search', e.target.value)}
                                className="w-full border-0 border-b border-gray-200 focus:outline-none"
                                placeholder="Text to replace"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Replace With</label>
                            <input
                                type="text"
                                value={rule.config.replace || ''}
                                onChange={(e) => updateRule(rule.id, 'replace', e.target.value)}
                                className="w-full border-0 border-b border-gray-200 focus:outline-none"
                                placeholder="New text"
                            />
                        </div>
                    </div>
                );

            case 'numbering':
                return (
                    <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start At</label>
                            <input
                                type="number"
                                min="0"
                                value={rule.config.start || 1}
                                onChange={(e) => updateRule(rule.id, 'start', parseInt(e.target.value))}
                                className="w-full border-0 border-b border-gray-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Step By</label>
                            <input
                                type="number"
                                min="1"
                                value={rule.config.step || 1}
                                onChange={(e) => updateRule(rule.id, 'step', parseInt(e.target.value))}
                                className="w-full border-0 border-b border-gray-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Digits</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={rule.config.digits || 3}
                                onChange={(e) => updateRule(rule.id, 'digits', parseInt(e.target.value))}
                                className="w-full border-0 border-b border-gray-200 focus:outline-none"
                            />
                        </div>
                    </div>
                );

            case 'date':
                return (
                    <div className="flex-1 space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                            <select
                                value={rule.config.format || 'YYYY-MM-DD'}
                                onChange={(e) => updateRule(rule.id, 'format', e.target.value)}
                                className="w-full border-0 border-b border-gray-200 focus:outline-none"
                            >
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                                <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                                <option value="YYYYMMDD">YYYYMMDD</option>
                                <option value="YYYY-MM-DD_HH-mm">YYYY-MM-DD_HH-mm</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="prefix"
                                        checked={(rule.config.position || 'prefix') === 'prefix'}
                                        onChange={() => updateRule(rule.id, 'position', 'prefix')}
                                        className="h-4 w-4 text-primary-600 border-gray-300 focus:outline-none"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Prefix</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="suffix"
                                        checked={(rule.config.position || 'prefix') === 'suffix'}
                                        onChange={() => updateRule(rule.id, 'position', 'suffix')}
                                        className="h-4 w-4 text-primary-600 border-gray-300 focus:outline-none"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Suffix</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Renaming Rules</h2>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onFilenamesChange}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-primary-100 transition-transform duration-150 animate-fade-in hover:scale-[1.02]"
                    >
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Apply Rules
                    </button>
                    <button
                        onClick={() => setShowSavePreset(!showSavePreset)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-primary-100 transition-transform duration-150 animate-fade-in hover:scale-[1.02]"
                    >
                        <Save className="h-4 w-4 mr-1.5" />
                        Save as Preset
                    </button>
                </div>
            </div>

            {showSavePreset && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preset Name
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            className="flex-1 border-0 border-b border-gray-200 focus:outline-none"
                            placeholder="Enter preset name"
                        />
                        <button
                            onClick={savePreset}
                            disabled={!presetName.trim()}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {rules.map((rule) => (
                    <div key={rule.id} className="border border-gray-200 rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rule.active}
                                    onChange={(e) => updateRule(rule.id, 'active', e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 font-medium capitalize">{rule.type}</span>
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => moveRule(rule.id, 'up')}
                                    className="p-1 text-gray-400 hover:text-gray-500"
                                    title="Move up"
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => moveRule(rule.id, 'down')}
                                    className="p-1 text-gray-400 hover:text-gray-500"
                                    title="Move down"
                                >
                                    <ArrowDown className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => removeRule(rule.id)}
                                    className="p-1 text-red-400 hover:text-red-500"
                                    title="Remove rule"
                                >
                                    <Trash className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        {rule.active && renderRuleConfig(rule)}
                    </div>
                ))}

                <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => addRule('prefix')}
                            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            Add Prefix
                        </button>
                        <button
                            onClick={() => addRule('suffix')}
                            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            Add Suffix
                        </button>
                        <button
                            onClick={() => addRule('replace')}
                            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            Add Replace
                        </button>
                        <button
                            onClick={() => addRule('numbering')}
                            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            Add Numbering
                        </button>
                        <button
                            onClick={() => addRule('date')}
                            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            Add Date
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenameRules;