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
    return data.reduce((result: EquipmentRecord[], item) => {
        if (item.props?.object_string?.uiValues?.length > 0) {
            result.push({
                uid: item.uid,
                object_string: item.props.object_string.uiValues[0]
            });
        }
        return result;
    }, []);
}

export const suggestedEquipment: EquipmentRecord[] = [
    { uid: '001', object_string: 'Equipment A' },
    { uid: '002', object_string: 'Equipment B' }
];
