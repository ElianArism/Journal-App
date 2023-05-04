import { useEffect, useMemo, useState } from "react";

export const useForm = (
  initialForm = {},
  providedValidations = {}
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidations, setFormValidation] = useState(
    providedValidations
  );

  useEffect(() => {
    createValidators();
  }, [formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
      [name + "Touched"]: true,
    });
  };

  const formInvalid = useMemo(() => {
    for (const prop of Object.keys(formValidations))
      if (formValidations[prop]?.length) return true;
    return false;
  }, [formValidations]);

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(providedValidations)) {
      const [validationFn, errorMsg = "This field is required"] =
        providedValidations[formField];

      formCheckedValues[`${formField}Invalid`] = validationFn(
        formState[formField]
      )
        ? errorMsg
        : null;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    formValidations,
    ...formValidations,
    formInvalid,
  };
};
