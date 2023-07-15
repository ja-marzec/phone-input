export const writePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    updatePhoneNumber: (value: React.SetStateAction<string>) => void
  ): void => {
    const input = e.target.value;
    const cleanInput = input.replace(/\D/g, "");
    const groups = cleanInput.match(/.{1,3}/g);
    const formattedNumber = groups ? groups.join("-") : "";

    if (formattedNumber.split("").length >= 9 + 3) {
      return;
    }

    updatePhoneNumber(formattedNumber);
  };