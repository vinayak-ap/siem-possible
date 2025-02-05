export interface Equipment {
    name: string;
    type?: string;
    status?: string;
}

export const allEquipment: Equipment[] = [
    { name: 'Equipment A', type: 'Type 1', status: 'Active' },
    { name: 'Equipment B', type: 'Type 2', status: 'Inactive' },
    { name: 'Equipment C', type: 'Type 3', status: 'Active' },
    // Add more equipment data as needed
];

export const suggestedEquipment: Equipment[] = [
    { name: 'Equipment A' },
    { name: 'Equipment B' }
];
