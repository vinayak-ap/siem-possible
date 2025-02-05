export interface EquipmentRecord {
    uid?: string;
    object_string?: string;
    status?: string;
}

export interface EquipmentVMO {
    uid: string;
    props: {
        object_string: {
            uiValues: string[];
        };
    };
}

export function getEquipmentData(data: EquipmentVMO[]): EquipmentRecord[] {
    return data.map(item => ({
        uid: item.uid,
        object_string: item.props?.object_string?.uiValues[0]
    }));
}

export const suggestedEquipment: EquipmentRecord[] = [
    { uid: '001', object_string: 'Equipment A' },
    { uid: '002', object_string: 'Equipment B' }
];
