// import cloudinary from 'cloudinary'

// cloudinary.config({
//     cloud_name:"drdogvk2e",
//     api_key:"686289491248212",
//     api_secret:"qAyn92QjAJsi83nNzp5fsn3uAlc"
// })

// const imageUploadController=async(req,res)=>{
//     try {
//         const res=await cloudinary.uploader.upload(req.files.image.path)
//         res.status(200).json({
//             url:res.secure_url,
//             public_id:res.public_id,
//             success:true,
//             message:"Successfully uploaded image"
//         })
        
//     } catch (error) {
//         res.status(500).send({
//             success:false,
//             message:`${error}`
//         })
//     }
// }

// export default imageUploadController