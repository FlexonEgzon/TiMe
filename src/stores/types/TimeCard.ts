export 
interface TimeCard{
    readonly id: number;
    title: string; //Title of Card
    timeMs: number; //Total Tracked Time in MS
    isRunning: boolean; // Card is Running or Not
    lastTickAt?: number; //Timestamp when card was started
    //Missing Attributes: Description 
}