export function processData(daily_plan_list,information,transportation,plan_from_backEnd){
    console.log(daily_plan_list)
    let jsonObject = JSON.parse(plan_from_backEnd);
    // console.log(jsonObject)
    // let addInfo = jsonObject.Additional_Information
    // let transport = jsonObject.Transportation
    let plan = jsonObject.TravelPlan
    let keys = Object.keys(plan)
    for(let i = 0; i < keys.length; i++){
        daily_plan_list.push(plan[keys[i]])
        // console.log(plan[keys[i]])
    }
    // console.log("------------")
    // console.log(daily_plan_list)
    information.value = jsonObject.Information['text']
        // console.log(plan[keys[i]])


    let trans = jsonObject.Transportation
    keys = Object.keys(trans)
    for(let i = 0; i < keys.length; i++){
        transportation.push(trans[keys[i]])
        // console.log(plan[keys[i]])
    }
}