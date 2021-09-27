export default class ResponsesUtil {
  constructor() {
  }
  
  fix(errors, fieldsRelations){
    for (const [key, value] of Object.entries(fieldsRelations)) {
      if(errors[key]){
        errors[value] = errors[key]
        delete errors[key]
      }
    }
    return errors
  }
}