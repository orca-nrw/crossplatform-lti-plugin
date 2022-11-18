const updateLMSFormValues = (
  selectorId,
  selectorURL,
  selectorToolname,
  selectedItem
) => {
  const elId = document.getElementsByName(selectorId)[0];
  const elURL = document.getElementsByName(selectorURL)[0];
  const elToolname = document.getElementsByName(selectorToolname)[0];
  const key = document.getElementsByName('resourcekey')[0];
  const instancename = document.getElementById('id_name');

  

  if (elId !== undefined && elId !== null) {
    elId.value = selectedItem.toolid;
  }

  if (elURL !== undefined && elURL !== null) {
    elURL.value = selectedItem.url;
  }

  if (elToolname !== undefined && elToolname !== null) {
    elToolname.value = selectedItem.name;
  }

  if(instancename !== null) {
    instancename.value = selectedItem.name;
  }

  if (key !== undefined && key !== null) {
    key.value = selectedItem.key;
  }
};

export default updateLMSFormValues;
