export const removeField = (
  index,
  currentProperty,
  setProperties,
  setFieldValue,
  setTouched
) => {
  return () => {
    const length = Object.keys(currentProperty).length;
    let newProperties = {
      ...currentProperty,
    };
    for (
      let i = parseInt(index);
      i < Object.keys(currentProperty).length - 1;
      i++
    ) {
      newProperties[i] = { ...newProperties[i + 1] };
      for (const property of Object.keys(newProperties[i]))
        setFieldValue(`${property}${i}`, newProperties[i][property]);
    }
    delete newProperties[length - 1];
    setTouched({});
    setProperties(newProperties);
  };
};

export const onChange = (index, property, setter, setFieldValue) => {
  return (e) => {
    setFieldValue(`${property}${index}`, e.target.value);
    setter((prev) => {
      return {
        ...prev,
        [index]: { ...prev[index], [property]: e.target.value },
      };
    });
  };
};
