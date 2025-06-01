export interface FileWithPreview extends File {
    id: string;
    preview: string;
    newName: string;
    originalFile: File;
}

export interface RenameRule {
    id: string;
    type: 'prefix' | 'suffix' | 'replace' | 'numbering' | 'date';
    config: {
        // For prefix/suffix
        text?: string;
        
        // For replace
        search?: string;
        replace?: string;
        
        // For numbering
        start?: number;
        step?: number;
        digits?: number;
        
        // For date
        format?: string;
        position?: 'prefix' | 'suffix';
    };
    active: boolean;
}

export interface RulePreset {
    id: string;
    name: string;
    data: { rules: RenameRule[] };
}