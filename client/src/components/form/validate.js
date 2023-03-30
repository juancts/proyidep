export function validate(inputs) {
  const errors = {};
  if (!inputs.name || inputs.name.length > 20) {
    errors.name = "Name with less than 20 characters";
  }
  if (!inputs.height || inputs.height < 0 || inputs.height > 100) {
    errors.height = "Number between 0 y 100";
  }
  if (!inputs.weight || inputs.weight < 0 || inputs.weight > 100) {
    errors.weight = "Number between 0 y 100";
  }
  // if(inputs.health < 0){
  //     errors.health = "debe ser un número > 0"
  // }
  // if(inputs.attack < 0){
  //     errors.attack = "debe ser un número > 0"
  // }
  // if(inputs.defense < 0){
  //     errors.defense = "debe ser un número > 0"
  //}
  if (inputs.types.length > 2) {
    errors.speed = "Must choose only 2 types";
  }
  if (!inputs.img) {
    errors.img = "link a tu imágen";
  }
  return errors;
}
