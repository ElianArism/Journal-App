export const fileUpload = async (file) => {
  if (!file) throw new Error("File does not exists");
  const cloudUrl = "https://api.cloudinary.com/v1_1/dmdurfhud/upload";
  const fileUploadDTO = new FormData();
  fileUploadDTO.append("upload_preset", "journal-app");
  fileUploadDTO.append("file", file);
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: fileUploadDTO,
    });
    if (!resp.ok) {
      console.log(resp);
      throw new Error("Image wasn't uploaded");
    }
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log("Error", error);
    throw new Error("Something went wrong");
  }
};
