export default interface Customer {
    // profilImage: string;
    name: string;
    userId: string;
    nickname: string;
    height: number ;
    weight: number;
    skeletalMuscleMass?: number;
    bodyFatMass?: number;
    deadlift?: number;
    benchPress?: number;
    squat?: number;
    personalGoal?: number;
}
