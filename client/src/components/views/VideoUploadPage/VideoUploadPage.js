import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'
import { useSelector } from 'react-redux'


//스타일링은 css프레임워크인 ANT DESIGN을 사용

const {Title} = Typography 
const {TextArea} = Input
const PrivateOptions = [
    {value: 0, label:'Private'},
    {value: 1, label:'Public'},
]

const CategoryOptions = [
    {value: 0, label:'Film & Animation'},
    {value: 1, label:'Autos & Vehicles'},
    {value: 2, label:'Music'},
    {value: 3, label:'Pets & Animals'},
]
function VideoUploadPage() {
    const user = useSelector(state => state.user)
    //리덕스의 state에서 userfmf 가져옴, user의 모든 정보가 담겨 있음
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    
    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header:{'content-type': 'multipart/form-data'}
        }
        //파일 보낼 때 header에 콘텐트타입을 보내지 않으면 오류가 생길 수 있다
        formData.append("file", files[0])
        //첫번째 인덱스에 있는 값 가져오기 위해서 어레이로 했음!
        console.log(files)

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                } else{
                    alert('업로드 실패')
                }
            })
    }
    
    const onSubmit=(e)=>{
        e.preventDefault();
        const variables = {
            writer : user.userData._id,
            title : VideoTitle,
            description : Description,
            privacy : Private,
            filePath : FilePath,
            category : Category,
        }
        Axios.post('/api/video/uploadVideo', variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                } else {
                    alert('업로드에 실패했습니다.')
                }
            })
    }
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rm'}}>
                <Title level={1}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* drop zone */}
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    //파일 하나만 올리자!
                    maxSize={10000000}
                    >
                    {({getRootProps, getInputProps}) => (
                        <div style={{width:'300px', height: '240px', border:'1px solid lightgray', display:'flex', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type='plus' style={{fontSize:'3rem'}} />
                        </div>
                    )}
                    </Dropzone>
                    {/* Thumbnail */}
                    <div>
                        <img src alt/>
                    </div>
                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea 
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br/>
                <br/>
                <select onChange = {onPrivateChange}>
                    {PrivateOptions.map((item, index)=> (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index)=> (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>
                <Button type='primary' size='large' onClick={onSubmit}>
                    Submit
                </Button>

            </Form>    
        </div>
    )
}

export default VideoUploadPage