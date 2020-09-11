export const validateInput = (field: string) => {
  if (field.length <= 2) {
    return [
      {
        field: field,
        message: "length must be greater than 2",
      },
    ];
  }

  if (field.includes("@")) {
    return [
      {
        field: field,
        message: "cannot include an @",
      },
    ];
  }
  return null;
};
