const isNumber = (value: string) : boolean => {
  const num = Number(value)
  if(typeof num == 'number'){
    return true
  }
  return false
}

export default isNumber