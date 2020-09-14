export const validateInput = (field: string) => {
  if (field.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }

  if (field.includes("@")) {
    return [
      {
        field: "password",
        message: "cannot include an @",
      },
    ];
  }
  return null;
};
