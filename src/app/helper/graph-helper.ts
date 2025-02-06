export interface GraphNode {
    uid: string;
    title: string;
    attributes: object[];
}

export interface EquipmentRecord {
    equipment_name: string;
    alternative_set_points: string;
    estimated_operating_cost_per_hour_usd: number;
    description?: string;
}

// export interface EquipmentVMO {
//     uid: string;
//     props: {
//         object_string: {
//             uiValues: string[];
//         };
//     };
// }

// export function getEquipmentData(data: EquipmentVMO[]): EquipmentRecord[] {
//     return data.reduce((result: EquipmentRecord[], item) => {
//         if (item.props?.object_string?.uiValues?.length > 0) {
//             result.push({
//                 uid: item.uid,
//                 object_string: item.props.object_string.uiValues[0]
//             });
//         }
//         return result;
//     }, []);
// }

export const suggestedEquipment: EquipmentRecord[] = [
    {
        "equipment_name": "Green Coffee Cleaner",
        "alternative_set_points": "Airflow rate: 700–900 m³/h",
        "estimated_operating_cost_per_hour_usd": 12
    },
    {
        "equipment_name": "Destoner",
        "alternative_set_points": "Vibration frequency: 60 Hz",
        "estimated_operating_cost_per_hour_usd": 10
    },
    {
        "equipment_name": "Weighing and Dosing Unit",
        "alternative_set_points": "Accuracy: ±0.05%",
        "estimated_operating_cost_per_hour_usd": 7
    }
];
