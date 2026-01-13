import data from '../../data.json';

export interface Counselor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    availableSlots: string[];
    rating: number;
    bio: string;
}

export interface Resource {
    id: string;
    title: string;
    type: 'Article' | 'Audio' | 'Video';
    category: string;
    content?: string;
    url?: string;
    duration?: string;
    readTime?: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
}

export interface User {
    name: string;
    studentId: string;
    appointments: {
        id: string;
        counselorId: string;
        date: string;
        status: string;
    }[];
}

export interface AppData {
    counselors: Counselor[];
    resources: Resource[];
    events: Event[];
    stats: {
        studentsHelped: number;
        activeCounselors: number;
        avgWaitTime: string;
    };
    user: User;
}

export const getAppData = (): AppData => {
    return data as unknown as AppData;
};
