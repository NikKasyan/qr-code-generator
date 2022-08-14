const download = (filename: string, data: string) => {
  const element = document.createElement("a");
  element.setAttribute("href", data);
  element.setAttribute("download", filename);
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
};
export default download;
