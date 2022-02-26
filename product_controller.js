  addProductImage: async (req, res) => {

        let imgs = []


        for (let item of req.files) {

            imgs.push({ name: item.filename })
        }




        const product = await Product.findOne({ _id: req.params.id })
        let images = [...product.images, ...imgs]
        console.log(images);
        product.images = images

        product.save()
            .then(prod => {
                res.json(prod)
            })
            .catch(err => {
                res.json(err)
            })
    }
  
  
  
  /***********************************************************************ou bien**********************************************************/
  addProductImage:  (req, res) => {

        let imgs = []
        for (let item of req.files) {

            imgs.push({ name: item.filename })
        }

    
        Product.findByIdAndUpdate({ _id: req.params.id },{$push:{images:imgs}},{new:true})
     
            .then(prod => {
                res.json(prod)
            })
            .catch(err => {
                res.json(err)
            })
    }
  
  
  /*********************************************************delete_image****************************************************************/
    deleteImageById: async (req, res) => {

        const product = await Product.findOne({ _id: req.body.productid })

        //  const newproduct = new Product(product)

        let images = product.images

        let dt = images.filter(img => img._id.toHexString() !== req.body.imageid)
        console.log(dt)
        product.images = dt

        product.save()
            .then(prod => {
                res.status(200).json({
                    message: "product image successfuly deleted",
                    success: true,
                    data: prod
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "product image not deleted",
                    success: false,
                    errors: err
                })
            })

    },
      
      /*************************************************upload single image******************************************************************/
       uploadAvatar:(req,res,next)=>{
        const {username,password,address,phone,email}= req.body
        //console.log(req.file)
        {/**{
            fieldname: 'avatar',
            originalname: 'img-skye.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './uploads',
            filename: '1645722239312-img-skye.jpg',
            path: 'uploads\\1645722239312-img-skye.jpg',
            size: 10794
        } */}
        User.findByIdAndUpdate(
            {_id:req.params.id},
            {avatar:req.file.filename,username,phone,password,address,email},
            {new:true},
            (err,userUpdated)=>{
            if(err){
                res.status(500).json({
                    succes:false,
                    errors:err,
                    message:"failed upload image by updating user",
                    data:null
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:userUpdated,
                    message:"image saved"  
                })
            }
        })
    }
