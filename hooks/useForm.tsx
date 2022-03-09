import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

function useForm(initValues: any) {
  const [values, setValues] = useState(initValues);
  return {
    values,
    setValues({ target }: NativeSyntheticEvent<TextInputChangeEventData>) {
      // setValues({...values,[target.pla]})
    },
  };
}
