
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { getCategory, getSubCategoryApi } from "../Products/Addproductapicalls";
import { getSingleProduct, updateProduct } from './Addproductapicalls';
import MeasurementData from './measurmentData';


export default withRouter(function EditProduct(props) {

	const [data, setdata] = useState(null);
	const [subdata, setSubdata] = useState(null);
	const [productedit, setProductEdit] = useState(null);
	const [editdata, setEditData] = useState(null);
	const [value, setValue] = useState({
		name: '',
		sku: '',
		price: '',
		category: '',
		subcategory: '',
		tags: '',
		measurement:'',
		description: '',
		metatags: '',
		metatitle: '',
		metadescription: '',
		metakeyword: '',
		image: '',
		multiimage: '',
	});


	useEffect(() => {

		if (data === null) {
			var json = {
				type: 'main'
			}
			getCategory(setdata, json)
		}
		if (editdata === null) {
			getProductDetails();
		}
		if (editdata !== null) {
			setEditValue();
		}

	}, [editdata]);

	const getSubCategory = (value) => {
		var json = {
			category: value,
			type: 'sub_category'
		}
		console.log(json);
		getSubCategoryApi(setSubdata, json);
	}

	const getProductDetails = () => {
		var json = {
			"_id": props.match.params.id,
			"page":1,
			"limit":86,
			"search":{
				
			}
		}
		getSingleProduct(setEditData, json);
	}

	const setEditValue = () => {
		setValue({
			name: editdata.name,
			sku: editdata.sku,
			price: editdata.price,
			category: editdata.category,
			subcategory: editdata.sub_category,
			tags: editdata.serach_tags,
			description: editdata.description,
			metatags: editdata.meta_tags,
			metatitle: editdata.meta_title,
			metadescription: editdata.meta_discription,
			metakeyword: editdata.meta_keywords,
			image: editdata.thumnail_image,
			multiimage: editdata.ref_images,
			measurement:editdata.measurement_in
		});
	} 
	const onClick = () => {
		var json = {
			"_id": props.match.params.id,
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
			"thumnail_image": value.image,
			"ref_images": value.multiimage,
			"measurement":value.measurement
		}
		updateProduct(json);
	}

	const handleChange = name => event => {
		setValue({ ...value, [name]: event.target.value });
	}



	let getcategory;
	if (data !== null) {
		getcategory = data.map((item, index) =>
			<option key={index} defaultValue={item.category}>{item.category}</option>
		)
	}


	let getsubcategory;

	if (subdata !== null) {
		getsubcategory = subdata.map((item, index) =>
			<option key={index} defaultValue={item.sub_category}>{item.sub_category}</option>
		)
	}
	let measurementData;
	if (data !== null) {
		measurementData = MeasurementData.map((item, index) =>
			<option key={index} value={item.title}>{item.title}</option>
		)
	}

	return (
		<>

			<div className="page-content" style={{ marginTop: '-40px' }}>
				<h3 className="card-title">Edit Product</h3>

				{console.log(editdata)}

				{value !== null ?

					<div className="row">
						<div className="col-lg-6 ">
							<div className="card">
								<div className="card-body">


									<form className="cmxform" id="signupForm" method="get" action="#">
										<fieldset>
											<div className="form-group">
												<label htmlFor="name">Name</label>
												<input defaultValue={value.name} id="information" onChange={handleChange('name')} placeholder="Name" id="name" className="form-control" name="name" type="text" />
											</div>
											<div className="form-group">
												<label htmlFor="email">SKU</label>
												<input defaultValue={value.sku} id="information" onChange={handleChange('sku')} placeholder="SKU" id="email" className="form-control" name="email" type="name" />
											</div>
											<div className="form-group">
												<label htmlFor="password">Price</label>
												<input defaultValue={value.price} id="information" onChange={handleChange('price')} placeholder="Price" id="password" className="form-control" name="password" type="number" />
											</div>
											<div className="form-group">

												<label htmlFor="email">Category</label>
												<select onChange={handleChange('category')} className="js-example-basic-single w-100" data-width="100%">
													<option value="none">{value.category}</option>
													{getcategory}


												</select>

											</div>
											<div className="form-group">
												<label htmlFor="email">Sub Category</label>

												<select onChange={handleChange('subcategory')} className="js-example-basic-single w-100" data-width="100%">
													<option value="none">{value.subcategory}</option>
													{getsubcategory}


												</select>
											</div>
											<div className="form-group">
												<label htmlFor="password">Tags</label>
												<input defaultValue={value.tags} id="information" onChange={handleChange('tags')} placeholder="Tags" id="password" className="form-control" name="password" type="name" />
											</div>
											<div className="form-group">
												<label htmlFor="email">Measurement<span className="danger">*</span></label>
												<select onChange={handleChange('measurement')}  data-width="100%">
													<option value={value.measurement} selected>{value.measurement}</option>
													{measurementData}
												</select>
											</div>
											

											<div className="form-group">
												<label htmlFor="password">Description</label>
												<textarea defaultValue={value.description} id="information" onChange={handleChange('description')} id="maxLength-textarea" className="form-control" rows="6" placeholder="Description"></textarea>
											</div>

											<Button className="btn btn-primary" onClick={onClick}>Update</Button>
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
										<input defaultValue={value.metatags} id="information" onChange={handleChange('metatags')} placeholder="Meta Tags" id="email" className="form-control" name="email" type="name" />
									</div>
									<div className="form-group">
										<label htmlFor="email">Mete Title</label>
										<input defaultValue={value.metatitle} id="information" onChange={handleChange('metatitle')} placeholder="Meta Title" id="email" className="form-control" name="email" type="name" />
									</div>
									<div className="form-group">
										<label htmlFor="email">Meta meta_keywords</label>
										<input defaultValue={value.metakeyword} id="information" onChange={handleChange('metakeyword')} placeholder="Meta Title" id="email" className="form-control" name="email" type="name" />
									</div>

									<div className="form-group">
										<label htmlFor="password">Meta Description</label>
										<textarea defaultValue={value.metadescription} id="information" onChange={handleChange('metadescription')} id="maxLength-textarea" className="form-control" maxLength="100" rows="8" placeholder="Meta Description"></textarea>
									</div>

									<div className="form-group">
										<label htmlFor="password">Thumbnail Url</label>
										<input defaultValue={value.image} id="information" onChange={handleChange('image')} placeholder="thumbnail url" id="password" className="form-control" name="password" type="name" />
									</div>
									<div className="form-group">
										<label htmlFor="password">ref.. Image Url</label>
										<input defaultValue={value.multiimage} id="information" onChange={handleChange('multiimage')} placeholder="multi image url" id="password" className="form-control" name="password" type="name" />
									</div>

								</div>

							</div>
						</div>
					</div>

					:
					'loading...'
				}

			</div>

		</>
	)
});
