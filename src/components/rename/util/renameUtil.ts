import type { FileWithPreview, RenameRule } from '../file';
import JSZip from 'jszip';

export const generateNewFilenames = (
    files: FileWithPreview[],
    rules: RenameRule[]
): FileWithPreview[] => {
    const activeRules = rules.filter(rule => rule.active);

    return files.map((file, fileIndex) => {
        let baseName = file.newName === file.name ? file.name : file.newName;

        const extension = baseName.includes('.') ? baseName.substring(baseName.lastIndexOf('.')) : '';
        let nameWithoutExtension = baseName.includes('.') ? baseName.substring(0, baseName.lastIndexOf('.')) : baseName;

        // Apply each rule in order
        activeRules.forEach(rule => {
        switch (rule.type) {
            case 'prefix':
                if (rule.config.text)
                    nameWithoutExtension = `${rule.config.text}${nameWithoutExtension}`;
                break;

            case 'suffix':
                if (rule.config.text)
                    nameWithoutExtension = `${nameWithoutExtension}${rule.config.text}`;
                break;

            case 'replace':
                if (rule.config.search && rule.config.search.length > 0) {
                    nameWithoutExtension = nameWithoutExtension.replace(
                    new RegExp(escapeRegExp(rule.config.search), 'g'),
                    rule.config.replace || ''
                    );
                }
                break;

            case 'numbering':
                const start = rule.config.start || 1;
                const step = rule.config.step || 1;
                const digits = rule.config.digits || 3;
                const number = start + (fileIndex * step);
                const formattedNumber = number.toString().padStart(digits, '0');
                nameWithoutExtension = `${nameWithoutExtension}_${formattedNumber}`;
                break;

            case 'date':
                const now = new Date();
                const format = rule.config.format || 'YYYY-MM-DD';
                const dateStr = formatDate(now, format);
                if (rule.config.position === 'prefix')
                    nameWithoutExtension = `${dateStr}_${nameWithoutExtension}`;
                else
                    nameWithoutExtension = `${nameWithoutExtension}_${dateStr}`;
                break;
        }
        });

        baseName = `${nameWithoutExtension}${extension}`;
        return {
            ...file,
            newName: baseName,
            originalFile: file.originalFile,
        };
    });
};


// Helper function to escape special characters in string for RegExp
const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Helper function to format date
const formatDate = (date: Date, format: string): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Replace tokens in format string
    return format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes);
};

export const downloadFiles = (files: FileWithPreview[]): void => {
    if (files.length === 1) {
        downloadSingleFile(files[0]);
        return;
    }
    
    downloadAsZip(files);
};

const downloadSingleFile = (file: FileWithPreview): void => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file.originalFile);
    link.download = file.newName;
    link.click();
};

const downloadAsZip = (files: FileWithPreview[]): void => {
    const zip = new JSZip();
    files.forEach((file) => {
        zip.file(file.newName, file.originalFile);
    });
    zip.generateAsync({ type: 'blob' }).then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'renamed.zip';
        link.click();
    });
};