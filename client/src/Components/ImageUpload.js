import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

function ImageUpload() {
  const [files, setFiles] = useState([]);

  function setMetadata(fileItems) {
    const _fileItems = fileItems.map((fileItem) => {
      return fileItem.setMetadata("username", "yourUserName");
    });

    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    console.log(_fileItems);
    setFiles(_fileItems);
  }

  return (
    <FilePond
      files={files}
      name="items"
      allowMultiple={false}
      onupdatefiles={(fileItems) => setMetadata(fileItems)}
      onprocessfile={(error, file) => {
        console.log("server id", file.serverId);
      }}
      onprocessfileprogress={(file, progress) => {
        //...
      }}
      labelIdle='Drag & Drop files or <span class="filepond--label-action">Browse</span>'
      server="/api/memes1"
    />
  );
}

export default ImageUpload