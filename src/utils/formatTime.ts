export function formatTime(timeMs: number){
    if(timeMs === 0 || timeMs < 0)
        return '00:00:00';

    const totalSec = Math.floor(timeMs / 1000) //Millisec => Seconds
    const hours = Math.floor(totalSec / 3600); //get how many hours
    const remaning = totalSec % 3600; // Remaining time will be used for Minutes and seconds
    const minutes = Math.floor(remaning / 60); // Seconds => Minutes
    const seconds = remaning % 60;  // Seconds left

    //Formatted Time: HH:MM:SS
    const formattedTime = ( String(hours).padStart(2,'0') + ':' + String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0'));
    return formattedTime;
}
