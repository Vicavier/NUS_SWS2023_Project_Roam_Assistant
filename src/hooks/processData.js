
export function processData(message,plan_from_backEnd){
    console.log(message)
    console.log(plan_from_backEnd)
    let jsonObject = JSON.parse(plan_from_backEnd);
    console.log(jsonObject)
}