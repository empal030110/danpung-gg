import { GRADE } from "@/lib/constants";

export const gradeColor = (grade?: string | null): string => {
    switch (grade) {
        case GRADE.LEGENDARY:
            return "text-green-400";
        case GRADE.UNIQUE:
            return "text-yellow-400";
        case GRADE.EPIC:
            return "text-purple-400";
        default:
            return "text-blue-300"; // 레어
    }
};

export const gradeBorderColor = (grade?: string | null): string => {
    switch (grade) {
        case GRADE.LEGENDARY:
            return "border-green-400";
        case GRADE.UNIQUE:
            return "border-yellow-400";
        case GRADE.EPIC:
            return "border-purple-400";
        default:
            return "border-blue-300"; // 레어
    }
};

export const gradeBgColor = (grade?: string | null): string => {
    switch (grade) {
        case GRADE.LEGENDARY:
            return "bg-green-400";
        case GRADE.UNIQUE:
            return "bg-yellow-400";
        case GRADE.EPIC:
            return "bg-purple-400";
        default:
            return "bg-blue-300"; // 레어
    }
};
