import { TextField, Button, Grid, Select, MenuItem } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { Context } from "../context";
import { ProductType } from "../entities";

export default function CreateProduct() {
    const {productTypes, notify} = useContext(Context)
    const [list, setList] = useState<string[]|null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        notify('Creating product', 'info')
        const formData = new FormData(e.currentTarget)
        files.forEach((file: File, index) => formData.append(index.toString(), file))
        try {
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            if (!data.id) throw new Error()
            notify('Product created successfully', 'success')
        } catch (error) {
            notify('Error creating product', 'error')
        }
    }

    return (
        <div className="pt-10 p-2 m-auto w-[900px] flex flex-col max-h-screen overflow-auto" >
            <h2>Create Product</h2>

            <Grid container component='form' onSubmit={handleSubmit}>
                <Grid item container lg={6} md={6} sm={6} xs={12} direction={'row'} rowGap={1}>
                    <TextField fullWidth name="name" placeholder="name" />
                    <TextField fullWidth name="description" placeholder="description" />
                    <TextField fullWidth name="price" placeholder="price" />
                    <Select  fullWidth name="product_type_id" defaultValue={0}>
                        <MenuItem value={0}>Select a product type</MenuItem>
                        {productTypes.map((productType: ProductType, index: number) =>
                            <MenuItem key={index} value={productType.id}>{productType.name}</MenuItem>)}
                    </Select>
                    <Button component="label" variant="outlined" className="w-full">
                        <input draggable hidden accept="image/*" multiple id="images" type="file" 
                            onChange={(e)=>{
                                const listFiles = [] as File[]
                                const list = e.target.files && Array.from(e.target.files).map(
                                    (file: File) => {
                                        // const element = document.createElement('img')
                                        // element.src = URL.createObjectURL(file)
                                        // const reader = new FileReader()
                                        // reader.onload = (e) => {
                                        //     console.log(e)
                                        //     console.log(reader.result)
                                        //     element.src = reader.result as string
                                        // }
                                        // reader.readAsDataURL(file)
                                        // return element
                                        listFiles.push(file)
                                        return URL.createObjectURL(file)
                                    })
                                setList(list)
                                setFiles([...files, ...listFiles])
                                console.log(files)
                            }}
                            />
                        <div className="flex overflow-hidden h-[200px]" id='teste'>
                            {list === null
                                ? "Add Files"
                                : list?.map((url)=><img className="object-scale-down min-w-0" src={url} alt={url} />)}
                        </div>
                    </Button>
                    <TextField fullWidth type="submit" />
                </Grid>
            </Grid>
        </div>)
}