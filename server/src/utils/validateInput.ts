export const validateInput = (field: string) => {
  if (field.length <= 2) {
    return [
      {
        field: "newPassword",
        message: "length must be greater than 2",
      },
    ];
  }

  if (field.includes("@")) {
    return [
      {
        field: "newPassword",
        message: "cannot include an @",
      },
    ];
  }
  return null;
};
