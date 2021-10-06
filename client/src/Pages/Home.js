import React, { useState } from "react";
import axios from "axios"
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {Image} from "semantic-ui-react"
import ImageUpload from "../Components/ImageUpload";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function Home() {
  const [text, setText] = useState("")
  const [ files, setFiles] = useState([])
  const [ url, setUrl] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(text)
    try {
      let data = new FormData()
      data.append('file',files[0].file)
      data.append('text',text)
      let res = await axios.post('/api/memes',data)
      console.log(res)
      setUrl(res.data.image)
    } catch (error) {
      console.log(error)
      alert("error in post memes occured")
    }
  }

  const fileChanged = (fileItems) => {
    setFiles(fileItems)
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <p>text</p>
        <input
        type = "text"
        value={text}
        onChange={(e)=>setText(e.target.value)}/>
        <br/>
        <FilePond
        files={files}
        allowReorder={true}
        allowMultiple={false}
        // onupdatefiles={setFiles}
        onupdatefiles={fileChanged}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
        <button type="submit">add</button>
      </form>
      <ImageUpload/>
      <Image src={url}></Image>
    </div>
  );
}