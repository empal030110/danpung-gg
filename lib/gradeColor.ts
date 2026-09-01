export const gradeColor = (grade?: string): string => {
    switch (grade) {
        case '레전드리': return 'text-green-400';
        case '유니크': return 'text-yellow-400';
        case '에픽': return 'text-purple-400';
        default: return 'text-blue-300'; // 레어
    }
};

export const gradeBorderColor = (grade?: string): string => {
    switch (grade) {
        case '레전드리': return 'border-green-400';
        case '유니크': return 'border-yellow-400';
        case '에픽': return 'border-purple-400';
        default: return 'border-blue-300'; // 레어
    }
};
