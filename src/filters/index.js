export function date(timestamp){
    let ts=parseInt(timestamp);
    let date = new Date(ts)
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    return `${year}-${month}-${day}`
    
}