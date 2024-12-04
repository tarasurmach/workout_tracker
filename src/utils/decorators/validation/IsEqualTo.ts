import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

const IsEqualTo = <T extends object>(
  property: keyof T,
  validationOptions?: ValidationOptions,
) =>
  function (object: object, propName: string) {
    registerDecorator({
      name: "isEqualTo",
      target: object.constructor,
      propertyName: propName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          const [relatedPropName] = validationArguments.constraints;
          const relatedValue = validationArguments.object[relatedPropName];
          return (
            typeof relatedValue === "string" &&
            typeof value === "string" &&
            relatedValue === value
          );
        },
      },
    });
  };
export default IsEqualTo;
