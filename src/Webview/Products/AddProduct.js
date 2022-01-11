import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from "react-bootstrap";
import {getCategory, getSubCategoryApi } from "./Addproductapicalls";
import {AddProductAPI} from './Addproductapicalls';
import MeasurementData from './measurmentData';
import MyToast from '../../Component/Toast';
import * as Session from '../../Storage'
import storage from '../../firebase';
import Loader from '../../Component/Loader';
import AutoCompleteComponent from '../../Component/AutoComplete';

export default withRouter(function Addproduct(props) {
	
	const [data, setdata] = useState(null);

	const [subdata, setSubdata] = useState(null);
	const [error, setError] = useState(null);
	const [msg, setMsg] = useState(null);
	const [thumbnail, setThumbnail] = useState('');
	const [refImages, setRefImages] = useState([]);
	const [process, setProcess] = useState(0);
	const [render, setRender] = useState(0)
	const [urls, setUrls] = useState([]);
	const [processing, setProcessing] = useState(0);
	let token = Session.getXToken();
	let fileOBJ =[];
	let ref;
	var imageURL='';
	var refImageURL = '';
	const [value, setValue] = useState({
		name: '',
		sku: '',
		price: '',
		category: '',
		subcategory: 'none',
		tags: '',
		measurement:'',
		description: '',
		metatags: '',
		metatitle: '',
		metadescription: '',
		metakeyword: '',

	});

	const handleChange = name => event => {
		setMsg(null);
		setValue({ ...value, [name]: event.target.value });
	}

	useEffect(() => {
		if (data === null) {
			var json = {
				type: 'main'
			}
			getCategory(setdata, json)
		}
		setError(false);
		console.log('re render');
	}, [render])

	const getSubCategory = (e) => {
		var json = {
			category: e.target.value,
			type: 'sub_category'
		}
		console.log(json);
		getSubCategoryApi(setSubdata,json);
	}

	const imageChange = (e) => {
		setMsg(null);
		if (e.target.files && e.target.files.length > 0) {
			setThumbnail(e.target.files[0]);
		}
	};

	const refImageChange = (e) => {
		var tempArray = refImages;
		console.log(e.target.files);
		console.log('temp init value ', tempArray);
		fileOBJ.push(e.target.files)
		for (let i = 0; i < fileOBJ[0].length; i++) {
			console.log('looping');
            tempArray.push(fileOBJ[0][i])
			setRefImages(tempArray)
			setRender(fileOBJ[0].length)
        }
	};

	const upload = ()=>{
		// setProcessing(1);
		var count = 0;
		var name = Date.now();
		const uploadTask = storage.ref(`/images/${name}`).put(thumbnail)
			//initiates the firebase side uploading 
			uploadTask.on('state_changed', 
			(snapShot) => {
			//takes a snap shot of the process as it is happening
			console.log(snapShot)
			}, (err) => {
			//catches the errors
			console.log(err)
			}, () => {
			// gets the functions from storage refences the image storage in firebase by the children
			// gets the download url then sets the image from firebase as the value for the imgUrl key:
			storage.ref('images').child(name.toString()).getDownloadURL()
			.then(fireBaseUrl => {
				if(fireBaseUrl){
					imageURL=fireBaseUrl;
					uploadRefImages();
				}
			})
		})
	}

	const uploadRefImages = () => {
		var count = 0;
		refImages.forEach((image, index) => {
			var name = Date.now();
			console.log(image.name);
			if (image.status === "FINISH" || image.status === "UPLOADING") return;
			// changeImageField(index, "status", "UPLOADING");
			const uploadTask = storage.ref(`/images/${name.toString()}`).put(image)
			uploadTask.on(
			   "state_changed",
			   null,
			   function error(err) {
				  console.log("Error Image Upload:", err);
			   },
			   async function complete() {

				  const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
				  if(downloadURL){
					count++;
					refImageURL = refImageURL + downloadURL;
				  }
				  if(count === refImages.length){
					setTimeout(function(){AddProject()},1000)
				  }
				  console.log('url : ', downloadURL);
				  
			   }
			);
		 });
	}

	const AddProject = () => {
		var json = {
			"name": value.name,
			"sku": value.sku,
			"price": value.price,
			"category": value.category,
			"sub_category": value.subcategory,
			"serach_tags": value.tags,
			"description": value.description,
			"meta_tags": value.metatags,
			"meta_title": value.metatitle,
			"meta_keywords": value.metakeyword,
			"meta_discription": value.metadescription,
			"thumnail_image": imageURL,
			"ref_images": refImageURL,
			"measurement":value.measurement
		}
		console.log(json);
		AddProductAPI(json, token, setProcessing);
	}
	
	const Validate = () => {
		setError(false);
		var json = {
			"name": value.name,
			"sku": value.sku,
			"price": value.price,
			"category": value.category,
			"sub_category": value.subcategory,
			"serach_tags": value.tags,
			"description": value.description,
			"meta_tags": value.metatags,
			"meta_title": value.metatitle,
			"meta_keywords": value.metakeyword,
			"meta_discription": value.metadescription,
			"thumnail_image": imageURL,
			"ref_images": refImageURL,
			"measurement":value.measurement
		}
		console.log(json);
		upload();
		if(json.name === ''){setError(true);}
		else if(json.sku === ''){setError(true);}
		else if(json.price === ''){setError(true);} 
		else if(json.category === ''){setError(true);} 
		else if(json.sub_category === ''){setError(true);} 
		else if(json.serach_tags === ''){setError(true);} 
		else if(json.description === ''){setError(true);} 
		else if(thumbnail === ''){setError(true);} 
		else if(refImages.length<=0){setError(true);} 
		else if(json.measurement === ''){setError(true);} 
		else{setError(false);upload();}
	}

	let getcategory;
	if (data !== null) {
		getcategory = data.map((item, index) =>
			<option key={index} value={item.category}>{item.category}</option>
		)
	}
	
	// let getsubcategory;
	// if (data !== null) {
	// 	getsubcategory = data.map((item, index) =>
	// 		<option key={index} value={item.sub_category}>{item.sub_category!=='blank' ? item.sub_category : 'none'}</option>
	// 	)
	// }
	let measurementData;
	if (data !== null) {
		measurementData = MeasurementData.map((item, index) =>
			<option key={index} value={item.title}>{item.title}</option>
		)
	}
	const removeImageFromRefImages = (index) => {
		var tempRef = refImages;
		tempRef.splice(index, 1)
		setRefImages(tempRef);
		setRender(tempRef.length)
	}
	if(refImages.length>0){
		ref = refImages.map((item, index) =>
			<div className="multi-images" key={index}>
				<img src={URL.createObjectURL(item)} style={{width : 100, height : 100}}/>
				<span className="delete" onClick={() => removeImageFromRefImages(index)}><i className="fas fa-times"></i></span>
			</div>
		)
	}
	
	return (
		<>
			{msg!==null ? <MyToast msg={msg} border={'1px red solid'}/> : ''}
					<div className="page-content" style={{ marginTop: '-40px' , opacity : processing === 1 ? 0.5 : 1}}>
					<h4 className="card-title">Add Product</h4>
					<div className="form-group" >
                          <label htmlFor="name">Search Product</label>
                          <AutoCompleteComponent setValue={setValue} value={value}/>
                        </div>
					<div className="row">
						<div className="col-lg-6 ">
							<div className="card">
								<div className="card-body">

									<form className="cmxform" id="signupForm">
										<fieldset>
											<div className="form-group">
												<label htmlFor="name">Name<span className="danger">*</span></label>
												<input id="information" value={value.name} onChange={handleChange('name')} placeholder="Name" id="name" className={`form-control ${error !== true ? '' : value.name === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} name="name" type="text" />
												
											</div>
											<div className="form-group">
												<label htmlFor="email">SKU<span className="danger">*</span></label>
												<input id="information" value={value.sku} onChange={handleChange('sku')} placeholder="SKU" id="email" className={`form-control ${error !== true ? '' : value.sku === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} name="email" type="name" />
												
											</div>
											<div className="form-group">
												<label htmlFor="password">Price<span className="danger">*</span></label>
												<input id="information" onChange={handleChange('price')} placeholder="Price" id="password" className={`form-control ${error !== true ? '' : value.price === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} name="password" type="number" />
											</div>
											<div className="form-group">

												<label htmlFor="email">Category<span className="danger">*</span></label>
												<select  onChange={handleChange('category')} className={`js-example-basic-single w-100 ${error !== true ? '' : value.category === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} data-width="100%">
													<option value={value.category} selected>{value.category}</option>
													{getcategory}
												</select>

											</div>
											<div className="form-group">
												<label htmlFor="email">Sub Category<span className="danger">*</span></label>
												<select  onChange={handleChange('sub_category')} className={`js-example-basic-single w-100 ${error !== true ? '' : value.sub_category === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} data-width="100%">
													
													<option value={value.subcategory}>{value.subcategory}</option>
												</select>
											</div>
											<div className="form-group">
												<label htmlFor="password">Tags<span className="danger">*</span></label>
												<input id="information" value={value.tags} onChange={handleChange('tags')} placeholder="Tags" id="password" className={`form-control ${error !== true ? '' : value.tags === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} name="password" type="name" />
											</div>
											<div className="form-group">
												<label htmlFor="email">Measurement<span className="danger">*</span></label>
												<select onChange={handleChange('measurement')} className={`js-example-basic-single w-100 ${error !== true ? '' : value.measurement === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} data-width="100%">
													<option value={value.measurement} selected>{value.measurement}</option>
													{measurementData}
												</select>
											</div>
											<div className="form-group">
												<label htmlFor="password">Description<span className="danger">*</span></label>
												<textarea id="information" value={value.description} onChange={handleChange('description')} id="maxLength-textarea" className={`form-control ${error !== true ? '' : value.description === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`} rows="6" placeholder="Description"></textarea>
											</div>

											
										</fieldset>
									</form>
								</div>
							</div>
						</div>

						<div className="col-lg-6 ">
							<div className="card">
								<div className="card-body">

									<div className="form-group">
										<label htmlFor="email">Meta Tags</label>
										<input id="information" value={value.metatags} onChange={handleChange('metatags')} placeholder="Meta Tags" id="email" className={`form-control`} name="email" type="name" />
									</div>
									<div className="form-group">
										<label htmlFor="email">Mete Title</label>
										<input id="information" value={value.metatitle} onChange={handleChange('metatitle')} placeholder="Meta Title" id="email" className={`form-control`} name="email" type="name" />
									</div> 
									<div className="form-group">
										<label htmlFor="email">Meta meta_keywords</label>
										<input id="information" value={value.metakeyword} onChange={handleChange('metakeyword')} placeholder="Meta Keyword" id="email" className={`form-control`} name="email" type="name" />
									</div>

									<div className="form-group">
										<label htmlFor="password">Meta Description</label>
										<textarea id="information" value={value.metadescription} onChange={handleChange('metadescription')} id="maxLength-textarea" className={`form-control`} rows="8" placeholder="Meta Description"></textarea>
									</div>

									<div className={`form-group ${error !== true ? '' : thumbnail === '' ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`}>
										<label htmlFor="password" className={`w-100`}>Thumbnail Image<span className="danger">*</span></label>
										{/* <input id="information" onChange={handleChange('image')} placeholder="thumbnail url" id="password" className={`form-control ${error !== true ? '' : value.image === '' ? 'border-red animate__animated animate__shakeX animate__faster ' : ''}`} name="password" type="name" /> */}
										<input type="file" onChange={imageChange} accept="image/*"/>
										<div className="mt-2"> {thumbnail ? <img id="thumbnail" className="" src={URL.createObjectURL(thumbnail)} style={{width : 100, height : 100}}/> : ''}  </div>
									</div>
									<div className={`form-group ${error !== true ? '' : refImages.length<=0 ? 'border-red animate__animated animate__shakeX animate__faster' : ''}`}>
										<label htmlFor="password" className="w-100">ref.. Image Url<span className="danger">*</span></label>
										<input type="file" onChange={refImageChange} accept="image/*" multiple/>
										<div className="mt-2">
											{ref}
										</div>
									</div>
									{process === 1 ? 
										<button className="btn btn-light" type="button" disabled>
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
											&nbsp; Processing
										</button>
									: 
										<span>
											{/* <Button className={`btn btn-primary`} onClick={upload}> 
											upload
										
										</Button> */}
										<Button className={`btn btn-primary`} onClick={Validate}> 
										Add Product
									
									</Button>
										</span>
									}
								</div>

							</div>
						</div>
					</div>

				</div>
				{processing === 1 ? <Loader/> : ''}
		</>
	)
});