import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ECommerce.css';
import '../Page.css';
import AccordionItem from '../../Components/UI-Controls/Accordian/Accordian';
import AttributeAccordion from '../../Components/UI-Controls/Accordian/AttributeAccordion';
import uploadIcon from '../../Assets/Images/uploadImg 48 x 48.png';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import { PiNotePencil, } from "react-icons/pi";
import imageStatus from '../../../src/Assets/Images/StatusImg 20 x 20.png';
import imageVisibility from '../../../src/Assets/Images/Visibility 20 x 20.png';
import imagePublish from '../../../src/Assets/Images/Publish 20 x 20.png';
import imageSEO from '../../../src/Assets/Images/Seo 20 x 20.png';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Logo from "../../../src/Assets/Images/Logo 29.44 X 5.12.png";
import Selector from "../../../src/Assets/Images/Selector 20 X 20.png";
import Dropdownresize from '../../Components/UI-Controls/Dropdown/dropdownadd';
import Dropdowncustom from '../../Components/UI-Controls/Dropdown/dropdownaddgeneral1';
import questionMark from "../../../src/Assets/Images/Question 20 x 20.png";
import SearchInput from '../../Components/UI-Controls/InputSearch/InputSearch';
import SearchMultiple from '../../Components/UI-Controls/MultiSelect/Multiselect';
import VariationForm from '../../Components/UI-Controls/AttributesVariation/VariationForm';
import SwatchAccordion from '../../Components/UI-Controls/Accordian/SwatchAccordion';
import DropdownSwatch from '../../Components/UI-Controls/Dropdown/SwatchDropdown';
import ImageGalleryPopup from '../../Components/UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';

// Rashid Edit 06-11-2024
import { url } from '../../Services/Api';
import { uploadImage } from '../../Services/functions';

const AddProduct = () => {
  const [productimage, setProductImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // Array of image objects
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [editorContent, setEditorContent] = useState(''); // To store text editor content
  const [editorData, setEditorData] = useState('');
  const [accordionsOpen, setAccordionsOpen] = useState({});
  const [selectedView, setSelectedView] = useState('Desktop');
  const [isMobileAnimating, setIsMobileAnimating] = useState(false);
  const [isWebAnimating, setIsWebAnimating] = useState(false);
  // State to track the selected menu item
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("Single Product");
  const [selectedTaxStatus, setSelectedTaxStatus] = useState("");
  const [selectedVariableTax, setSelectedVariableTax] = useState("");
  const [selectedSale, setSelectedSale] = useState("");
  const [selectedTaxClass, setSelectedTaxClass] = useState("");
  const [selectedVariableTaxClass, setSelectedVariableTaxClass] = useState("");
  const [selectedShippingClass, setSelectedShippingClass] = useState("");
  const [selectedLocations, setSelectedLocations] = useState("");
  const [isStockManagementChecked, setIsStockManagementChecked] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [variations, setVariations] = useState([]);
  const [accordionsData, setAccordionsData] = useState([]);
  const [selectedAttributeType, setSelectedAttributeType] = useState("Default");

  const collectionsList = ['Collection 1', 'Collection 2', 'Collection 3'];
  const relatedProductsList = ['Product 1', 'Product 2', 'Product 3'];
  const mightNeedList = ['Accessory 1', 'Accessory 2', 'Accessory 3'];
  const [attributes, setGetAttributes] = useState([]);
  // const [isStockManagementChecked, setIsStockManagementChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    permalink: '',
    type: 'simple', // simple or variable
    status: '',
    featured: 0,
    description: '',
    short_description: '',
    sku: '',
    regular_price: '',
    discount: {
      is_discountable: 0,
      discount_type: '',
      discount_value: ''
    },
    tax_status: '',
    tax_class: '',
    brand: '',
    manage_stock: {
      is_stock_manage: 0,
      location: '',
      quantity: '',
      stock_status: ''
    },
    sold_individually: 0,
    shipping_required: 0,
    shipping_taxable: 0,
    collection: [],
    attributes: [],
    default_attributes: [],
    meun_order: 1,
    enable_review: 1,
    categories: [],
    tags: [],
    images: galleryImages, // Rashid Edit 06-11-2024
    gtin: '',
    mpn: '',
    ean: '',
    variations: []
  });

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get('https://fm.skyhub.pk/api/v1/attributes/get');
        const data = response.data.ProductsAttributes;
        console.log("Response: ", response.data.ProductsAttributes);

        // Map the API response to match your desired structure
        const formattedAttributes = data.map(attribute => {
          return {
            _id: attribute._id,
            name: attribute.name,
            type: attribute.type, // Assuming type is directly available
            options: attribute.terms.map(term => ({
              _id: term._id, // Adjust this if the terms don't have _id directly
              name: term.label,
              value: term.value,
            })),
          };
        });

        setGetAttributes(formattedAttributes);
      } catch (error) {
        console.error('Error fetching attributes:', error);
      }
    };

    fetchAttributes();
  }, []); // Empty dependency array to run once on mount

  // Handle type change per attribute
  const handleTypeChange = (index, selectedValue) => {
    const updatedAccordionsData = [...accordionsData];
    updatedAccordionsData[index].type = selectedValue; // Update the type for the specific attribute
    setAccordionsData(updatedAccordionsData);
  };

  // Handle form submission (payload generation)
  const handleSubmit = () => {
    const payload = accordionsData.map(attribute => ({
      name: attribute.name,
      type: attribute.type || 'label', // Default to 'label' if no type is selected
      options: attribute.options.map(option => {
        let value;
        switch (attribute.type) {
          case 'color':
            value = option.value; // Ensure value is a hex code for color
            break;
          case 'image':
            value = option.value; // Ensure value is an image URL
            break;
          default:
            value = option.value; // For 'label' or default types, keep the string value
        }
        return {
          name: option.name,
          value: value, // Assign the correct value format
        };
      }),
    }));

    console.log("Submission Payload: ", payload); // Replace with your API call or submit action
  };

  const renderOptionContent = (attributeType, option, attributeIndex, optionIndex,) => {
    switch (attributeType) {
      case 'Label':
        return (
          <>
            <label
              style={{
                lineHeight: '18px',
                color: 'var(--text-color)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semi-bold)',
                fontSize: 'var(--font-size-small)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Label<span className="superscript"></span>
            </label>
            <input
              type="text"
              name="label"
              placeholder="Enter label here ..."
              value={option.text}
              onChange={(e) => handleOptionValueChange(attributeIndex, optionIndex, e.target.value, 'text')}
              style={{
                width: '190px',
                height: '16px',
                padding: '7px',
                borderRadius: '4px',
                border: '1px solid #F0F0F0',
                outline: 'none',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-avg)',
                color: 'var(--text-color)',
              }}
            />
          </>
        );

      case 'Color':
        return (
          <>
            <label
              style={{
                lineHeight: '18px',
                color: 'var(--text-color)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semi-bold)',
                fontSize: 'var(--font-size-small)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Color<span className="superscript"></span>
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #F0F0F0',
                borderRadius: '4px',
                height: '32px',
                width: '206px',
              }}
            >
              <input
                type="color"
                name="bg_color"
                value={option.value}
                onChange={(e) => handleOptionValueChange(attributeIndex, optionIndex, e.target.value)}
                style={{
                  width: '30px',
                  height: '30px',
                  border: 'none',
                  borderRadius: '3px',
                  margin: '5px',
                  padding: 0,
                }}
              />
            </div>
          </>
        );

      case 'Image':
        return (
          <>
            <label
              style={{
                lineHeight: '18px',
                color: 'var(--text-color)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semi-bold)',
                fontSize: 'var(--font-size-small)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Image<span className="superscript"></span>
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #F0F0F0',
                borderRadius: '4px',
                height: '32px',
                width: '230px',
              }}
            >
              {option.value ? (
                <div className="image-preview-wrapper-swatch">
                  <input
                    type="file"
                    id={`image-upload-${attributeIndex}-${optionIndex}`}
                    name="image"
                    className="upload-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleOptionValueChange(
                        attributeIndex,
                        optionIndex,
                        e.target.files[0],
                        'image'
                      )
                    }
                    style={{ display: 'none' }}
                  />
                  <span
                    style={{
                      marginLeft: '10px',
                      lineHeight: '19.5px',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-avg)',
                    }}
                  >
                    {option.imageName || 'Select Image...'} {/* Display the image name */}
                  </span>
                  <label htmlFor={`image-upload-${attributeIndex}-${optionIndex}`} className="image-click-label">
                    <img
                      src={option.value} // Use image URL for preview
                      alt=""
                      style={{
                        height: '28px',
                        width: '28px',
                        objectFit: 'cover',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginLeft: '7px',
                        marginTop: '7px',
                      }}
                    />
                  </label>
                </div>
              ) : (
                <label
                  htmlFor={`image-upload-${attributeIndex}-${optionIndex}`}
                  className="image-upload-label"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >

                  <span
                    style={{
                      marginLeft: '10px',
                      lineHeight: '19.5px',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-avg)',
                    }}
                  >
                  </span>
                  <img
                    src={uploadIcon} // Replace with actual upload icon
                    alt="Upload"
                    style={{
                      height: '28px',
                      width: '28px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                    }}
                  />
                </label>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const handleOptionValueChange = (attributeIndex, optionIndex, newValue, field = 'value') => {
    const updatedAccordionsData = [...accordionsData];

    if (field === 'value' || field === 'text') {
      updatedAccordionsData[attributeIndex].options[optionIndex][field] = newValue;
    } else if (field === 'image') {
      // Handle image upload logic, assuming newValue is a file
      const file = newValue;
      const imageURL = URL.createObjectURL(file); // Convert file to URL for preview
      const imageName = file.name; // Extract the image file name

      // Store both the image URL and the file name
      updatedAccordionsData[attributeIndex].options[optionIndex].value = imageURL;
      updatedAccordionsData[attributeIndex].options[optionIndex].imageName = imageName; // Add the imageName field
    }

    setAccordionsData(updatedAccordionsData);
  };

  // Handle attribute selection
  const handleAttributeSelect = (attributename) => {
    // Find the selected attribute from the attributes list
    const selected = attributes.find(attr => attr.name === attributename);

    // Ensure the attribute is added only once
    if (!selectedAttributes.some(attr => attr.name === attributename)) {
      setSelectedAttributes(prevAttributes => [
        ...prevAttributes,
        {
          ...selected,
          selectedOptions: [] // Initialize selected options
        }
      ]);
    }
  };

  const handleSingleSelect = (attributename, optionname) => {
    setSelectedAttributes(prevAttributes =>
      prevAttributes.map(attribute => {
        if (attribute.name === attributename) {
          if (attribute.selectedOptions.includes(optionname)) {
            // If the option is already selected, remove it
            return {
              ...attribute,
              selectedOptions: attribute.selectedOptions.filter(opt => opt !== optionname) // Remove the option
            };
          } else {
            // If an option is selected, replace the previous selection with the new one
            return {
              ...attribute,
              selectedOptions: [optionname] // Ensure only one option is selected
            };
          }
        }
        return attribute; // Return attribute unchanged if it does not match
      })
    );
  };

  // Handle multi-select for options
  const handleMultiSelect = (attributename, optionname, isRemoving = false) => {
    setSelectedAttributes(prevAttributes =>
      prevAttributes.map(attribute => {
        if (attribute.name === attributename) {
          if (isRemoving) {
            // Remove the option
            return {
              ...attribute,
              selectedOptions: attribute.selectedOptions.filter(item => item !== optionname)
            };
          } else {
            // Add the option
            return {
              ...attribute,
              selectedOptions: [...attribute.selectedOptions, optionname]
            };
          }
        }
        return attribute;
      })
    );
  };

  // Handle attribute deletion
  const handleDeleteAttribute = (attributename) => {
    setSelectedAttributes(prev => prev.filter(attr => attr.name !== attributename));
  };

  // Updated function to generate variations
  const generateVariations = (attributes) => {
    if (attributes.length < 2) {
      return []; // Return an empty array if there's only one attribute
    }

    const options = attributes.map(attr => attr.selectedOptions);

    const cartesian = (arr) => {
      return arr.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    };

    return cartesian(options);
  };

  const generateVariationNumber = (index) => {
    // Generate a 5-digit variation number, padded with zeros
    return String(index + 1).padStart(5, '0');
  };

  const handleSingleSaveAttributes = () => {
    const formattedAttributes = selectedAttributes.map(attribute => ({
      _id: attribute._id,
      name: attribute.name,
      type: attribute.type,
      options: attribute.selectedOptions.map(optionName => {
        const option = attribute.options.find(opt => opt.name === optionName);
        return {
          // _id: option._id,
          name: option.name,
          value: option.value,
        };
      })
    }));

    // Update formData with the selected attributes
    setFormData(prevState => ({
      ...prevState,
      attributes: formattedAttributes,
    }));

    // Optionally, update accordions if you need it for UI display
    setAccordionsData(formattedAttributes);
  };

  
  const handleSaveAttributes = () => {
    const formattedAttributes = selectedAttributes.map(attribute => ({
      _id: attribute._id,
      name: attribute.name,
      type: attribute.type, // Include the type
      options: attribute.selectedOptions.map(optionname => {
        const option = attribute.options.find(opt => opt.name === optionname);
        return {
          _id: option._id,
          name: option.name,
          value: option.value,
        };
      })
    }));

    // Log or send the formatted payload
    console.log(formattedAttributes);

    // Automatically generate variations after saving attributes
    const newVariations = generateVariations(selectedAttributes);
    setVariations(newVariations);

    // Set the formatted attributes to the state to generate accordions
    setAccordionsData(formattedAttributes);

    // Example API call (if needed)
    // axios.post('/your-endpoint', formattedAttributes)
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
  };

  const handleStockManagementChange = (e) => {
    setIsStockManagementChecked(e.target.checked);
  };

  const handleChangeTaxStatus = (selectedValue) => {
    setSelectedTaxStatus(selectedValue);
  };

  const handleChangeVariableTaxStatus = (selectedValue) => {
    setSelectedVariableTax(selectedValue);
  };

  const handleChangeLocations = (selectedValue) => {
    setSelectedLocations(selectedValue);
  };


  const handleChangeSale = (selectedValue) => {
    setSelectedSale(selectedValue);

    setFormData((prevState) => ({
      ...prevState,
      discount: {
        ...prevState.discount,
        is_discountable: selectedValue ? 1 : 0, // Set to 1 if a sale price is selected
        discount_type: selectedValue,           // Set the discount type to the selected sale option
      },
    }));
  };


  const handleChangeTaxClass = (selectedValue) => {
    setSelectedTaxClass(selectedValue);
  };

  const handleChangeVariableTaxClass = (selectedValue) => {
    setSelectedVariableTaxClass(selectedValue);
  };

  const handleChangeShippingClass = (selectedValue) => {
    setSelectedShippingClass(selectedValue);
  };

  const toggleAccordion = (index) => {
    setAccordionsOpen(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Function to handle sidebar item click
  const handleMenuClick = (id) => {
    setSelectedItem(id);
  };

  const SaleOptions = [
    { value: 'percentage', label: 'By %' },
    { value: 'currency', label: 'By $' }
  ];

  const taxTypeOptions = [
    { value: 'taxable', label: 'Taxable' },
    { value: 'nonTaxable', label: 'Non-Taxable' },
    { value: 'exempt', label: 'Exempt' }
  ];

  const variableTaxTypeOptions = [
    { value: 'taxable', label: 'Taxable' },
    { value: 'nonTaxable', label: 'Non-Taxable' },
    { value: 'exempt', label: 'Exempt' }
  ];

  const taxClassOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'reduced rate', label: 'Reduced rate' },
    { value: 'zero rate', label: 'Zero rate' }
  ];

  const variableTaxClassOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'reduced rate', label: 'Reduced rate' },
    { value: 'zero rate', label: 'Zero rate' }
  ];

  const shippingClassOptions = [
    { value: 'No Shipping Class', label: 'No Shipping Class' },
    { value: 'Free Shipping-All Rugs', label: 'Free Shipping-All Rugs' }
  ];

  const locationsOptions = [
    { value: 'allLocations', label: 'All Locations' },
    { value: 'store-1', label: 'Store-1' },
    { value: 'store-2', label: 'Store-2' }
  ];

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleInputChange = (event) => {

    const { name, value, type, checked } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value, // Conditionally set value based on input type
      slug: name === "name" ? generateSlug(value) : prevState.slug, // Set slug based on product name
    }));

    const inputType = event.target.id;

    if (inputType === "productImage") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImage(reader.result);
        };
        reader.readAsDataURL(file);
        uploadImageToBackend([file], inputType);
      }
    } else if (inputType === "galleryImages") {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
        const newImages = files.map((file) => ({
          url: URL.createObjectURL(file),
          file,
        }));

        setGalleryImages((prev) => [...prev, ...newImages]);

        // Clear the file input after selection
        event.target.value = ''; // <-- This ensures the input is cleared after each selection

        uploadImageToBackend(files, inputType);
      }
    }
  };

  const handleDiscountValueChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      discount: {
        ...prevState.discount,
        discount_value: value // Update discount_value based on input
      }
    }));
  };

  const handleManageStockChange = (e) => {
    // Check if 'e.target' exists
    if (e.target) {
      const { name, value } = e.target;

      // Check if updating radio buttons for stock status
      if (name === 'stock_status') {
        setFormData(prevState => ({
          ...prevState,
          manage_stock: {
            ...prevState.manage_stock,
            stock_status: value
          }
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          manage_stock: {
            ...prevState.manage_stock,
            [name]: value
          }
        }));
      }
    } else {
      // If 'e' does not have 'target', assume it’s directly the selected value from Dropdowncustom
      setFormData(prevState => ({
        ...prevState,
        manage_stock: {
          ...prevState.manage_stock,
          location: e // e is the selected value from Dropdowncustom
        }
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsStockManagementChecked(checked);
    setFormData(prevState => ({
      ...prevState,
      manage_stock: {
        ...prevState.manage_stock,
        is_stock_manage: checked ? 1 : 0 // Assuming you want to set 1 for checked and 0 for unchecked
      }
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prevState => ({
      ...prevState,
      status
    }));
  };

  const handleProductTypeChange = (selectedValue) => {
    setSelectedProductType(selectedValue); // Update the selected dropdown option state
    setFormData(prevState => ({
      ...prevState,
      type: selectedValue // Update the `type` parameter in formData
    }));
  };

  const handlePrdSubmit = (status) => {
    const isVariableType = formData.type === "Variable Product";
    const payload = {
      name: formData.name,
      slug: formData.slug, // Auto-generated slug
      permalink: formData.permalink,
      type: formData.type,
      status: status,
      // featured: formData.featured,
      featured: 1,
      description: formData.description,
      short_description: formData.short_description,
      sku: formData.sku,
      regular_price: formData.regular_price,
      discount: formData.discount,
      tax_status: formData.tax_status,
      tax_class: formData.tax_class,
      brand: formData.brand,
      manage_stock: formData.manage_stock,
      sold_individually: formData.sold_individually,
      shipping_required: formData.shipping_required,
      shipping_taxable: formData.shipping_taxable,
      collection: formData.collection,
      attributes: formData.attributes,
      default_attributes: formData.attributes,
      meun_order: formData.meun_order,
      enable_review: formData.enable_review,
      categories: formData.categories,
      tags: formData.tags,
      images: galleryImages,
      gtin: formData.gtin,
      mpn: formData.mpn,
      ean: formData.ean,
    };

    if (isVariableType) {
      payload.variations = formData.variations;
    }

    // Call your API submission function here
    submitToAPI(payload);
  };

  const submitToAPI = async (payload) => {
    try {
      const response = await axios.post("https://fm.skyhub.pk/api/v1/products/add", payload);
      console.log("Submission successful:", response.data);
      // Optionally, handle response or redirect as needed
    } catch (error) {
      console.error("Error submitting:", error);
      // Optionally, show error feedback to the user
    }
  };

  const attributeTypeOptions = [
    { value: 'Default', label: 'Default' },
    { value: 'Color', label: 'Color' },
    { value: 'Image', label: 'Image' },
    { value: 'Label', label: 'Label' },
  ];

  const sidebarItems = [
    { id: 'general', name: 'General', fields: <GeneralFields SaleOptions={SaleOptions} taxTypeOptions={taxTypeOptions} taxClassOptions={taxClassOptions} handleChangeSale={handleChangeSale} handleChangeTaxStatus={handleChangeTaxStatus} selectedSale={selectedSale} selectedTaxStatus={selectedTaxStatus} selectedTaxClass={selectedTaxClass} handleChangeTaxClass={handleChangeTaxClass} formData={formData} handleInputChange={handleInputChange} handleDiscountValueChange={handleDiscountValueChange} /> },
    { id: 'inventory', name: 'Inventory', fields: <InventoryFields locationsOptions={locationsOptions} handleChangeLocations={handleChangeLocations} selectedLocations={selectedLocations} isStockManagementChecked={isStockManagementChecked} setIsStockManagementChecked={setIsStockManagementChecked} handleStockManagementChange={handleStockManagementChange} formData={formData} handleInputChange={handleInputChange} handleManageStockChange={handleManageStockChange} handleCheckboxChange={handleCheckboxChange} /> },
    { id: 'shipping', name: 'Shipping', fields: <ShippingFields shippingClassOptions={shippingClassOptions} handleChangeShippingClass={handleChangeShippingClass} selectedShippingClass={selectedShippingClass} /> },
    { id: 'linkedproducts', name: 'Linked Products', fields: <LinkedProducts collectionsList={collectionsList} /> },
    { id: 'attributes', name: 'Attributes', fields: <AttributesFields handleSingleSaveAttributes={handleSingleSaveAttributes} attributes={attributes} selectedAttributes={selectedAttributes} handleAttributeSelect={handleAttributeSelect} handleMultiSelect={handleSingleSelect} handleDeleteAttribute={handleDeleteAttribute} /> },
    { id: 'advanced', name: 'Advanced', fields: <Advanced /> },
    { id: 'facebook', name: 'Facebook', fields: <InventoryFields locationsOptions={locationsOptions} handleChangeLocations={handleChangeLocations} selectedLocations={selectedLocations} isStockManagementChecked={isStockManagementChecked} setIsStockManagementChecked={setIsStockManagementChecked} handleStockManagementChange={handleStockManagementChange} formData={formData} handleInputChange={handleInputChange} handleManageStockChange={handleManageStockChange} handleCheckboxChange={handleCheckboxChange} /> },
    { id: 'swatches', name: 'Swatches', fields: <SwatchFields handleOptionValueChange={handleOptionValueChange} renderOptionContent={renderOptionContent} handleSubmit={handleSubmit} handleInputChange={handleInputChange} selectedAttributeType={selectedAttributeType} setSelectedAttributeType={setSelectedAttributeType} attributeTypeOptions={attributeTypeOptions} handleSaveAttributes={handleSaveAttributes} handleTypeChange={handleTypeChange} accordionsData={accordionsData} setAccordionsData={setAccordionsData} /> },
  ];

  const variableSidebarItems = [
    { id: 'general', name: 'General', fields: <VariableGeneralFields variableTaxTypeOptions={variableTaxTypeOptions} selectedVariableTax={selectedVariableTax} handleChangeVariableTaxStatus={handleChangeVariableTaxStatus} selectedVariableTaxClass={selectedVariableTaxClass} handleChangeVariableTaxClass={handleChangeVariableTaxClass} variableTaxClassOptions={variableTaxClassOptions} /> },
    { id: 'inventory', name: 'Inventory', fields: <VariableInventoryFields locationsOptions={locationsOptions} handleChangeLocations={handleChangeLocations} selectedLocations={selectedLocations} isStockManagementChecked={isStockManagementChecked} setIsStockManagementChecked={setIsStockManagementChecked} handleStockManagementChange={handleStockManagementChange} /> },
    { id: 'shipping', name: 'Shipping', fields: <VariableShippingFields shippingClassOptions={shippingClassOptions} handleChangeShippingClass={handleChangeShippingClass} selectedShippingClass={selectedShippingClass} /> },
    { id: 'linkedproducts', name: 'Linked Products', fields: <VariableLinkedProducts collectionsList={collectionsList} /> },
    // { id: 'attributes', name: 'Attributes', fields: <VariableAttributesFields AttributesList={AttributesList} selectedAttributes={selectedAttributes} setSelectedAttributes={setSelectedAttributes} handleAttributeSelect={handleAttributeSelect} handleDeleteAttribute={handleDeleteAttribute} selectedSingleItem={selectedSingleItem} setSelectedSingleItem={setSelectedSingleItem} handleSingleSelect={handleSingleSelect} handleMultiSelect={handleMultiSelect} selectedMultipleItems={selectedMultipleItems} setSelectedMultipleItems={setSelectedMultipleItems} options={options} /> },
    { id: 'attributes', name: 'Attributes', fields: <VariableAttributesFields handleSaveAttributes={handleSaveAttributes} attributes={attributes} selectedAttributes={selectedAttributes} handleAttributeSelect={handleAttributeSelect} handleMultiSelect={handleMultiSelect} handleDeleteAttribute={handleDeleteAttribute} /> },
    { id: 'variations', name: 'Variations', fields: <VariableVariationsFields handleChangeTaxClass={handleChangeTaxClass} handleChangeTaxStatus={handleChangeTaxStatus} variations={variations} generateVariationNumber={generateVariationNumber} saleOptions={SaleOptions} taxTypeOptions={taxTypeOptions} taxClassOptions={taxClassOptions} selectedSale={selectedSale} selectedTaxStatus={selectedTaxStatus} selectedTaxClass={selectedTaxClass} shippingClassOptions={shippingClassOptions} handleChangeShippingClass={handleChangeShippingClass} selectedShippingClass={selectedShippingClass} /> },
    { id: 'advanced', name: 'Advanced', fields: <VariableAdvanceFields /> },
    { id: 'swatches', name: 'Swatches', fields: <VariableSwatchFields handleOptionValueChange={handleOptionValueChange} renderOptionContent={renderOptionContent} handleSubmit={handleSubmit} handleInputChange={handleInputChange} selectedAttributeType={selectedAttributeType} setSelectedAttributeType={setSelectedAttributeType} attributeTypeOptions={attributeTypeOptions} handleSaveAttributes={handleSaveAttributes} handleTypeChange={handleTypeChange} accordionsData={accordionsData} setAccordionsData={setAccordionsData} /> },
  ];

  const renderFields = () => {
    const selected = sidebarItems.find(item => item.id === selectedItem);
    return selected ? selected.fields : <p>Please select an option from the menu</p>;
  };

  const renderVariableFields = () => {
    const selected = variableSidebarItems.find(item => item.id === selectedItem);
    return selected ? selected.fields : <p>Please select an option from the menu</p>;
  };

  // Rashid Edit 06-11-2024
  const handleChange = (view) => {
    if (view === 'Mobile') {
      setIsMobileAnimating(true);  // Trigger Mobile animation
      setTimeout(() => setIsMobileAnimating(false), 300); // Reset after 300ms
    } else if (view === 'Web') {
      setIsWebAnimating(true);  // Trigger Web animation
      setTimeout(() => setIsWebAnimating(false), 300); // Reset after 300ms
    }
    setSelectedView(view);  // Set the selected view
  };

  // Function to generate slug from category name
  const generateCatSlug = (name) => name.toLowerCase().replace(/ /g, '-');

  const categories = [
    {
      name: 'Bed Room',
      subcategories: [
        'Bed Room Sets',
        'Beds & HeadBoards',
        'Dresser & Mirror Sets',
        'Dressers',
        'Chests',
      ],
    },
    {
      name: 'Dining Room',
      subcategories: [
        'Dining Room Sets',
        'Pub Heights Dining Room Sets',
        'Dining Chairs & Benches',
      ],
    },
    { name: 'Kids Room', subcategories: [] },
    { name: 'Mattresses', subcategories: [] },
    { name: 'Small Spaces', subcategories: [] },
  ];

  // Handle main category selection
  const handleCategorySelect = (categoryName) => {
    setFormData((prevData) => {
      const updatedCategories = [...prevData.categories];

      // Check if category is already selected
      const categoryIndex = updatedCategories.findIndex(
        (cat) => cat.name === categoryName
      );

      if (categoryIndex >= 0) {
        // If selected, remove it
        updatedCategories.splice(categoryIndex, 1);
      } else {
        // Otherwise, add it
        updatedCategories.push({
          uid: `1111111_${updatedCategories.length + 1}`, // Generating a unique id for example
          name: categoryName,
          slug: generateSlug(categoryName),
        });
      }

      return {
        ...prevData,
        categories: updatedCategories,
      };
    });
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (categoryName, subcategory) => {
    setFormData((prevData) => {
      const updatedCategories = [...prevData.categories];

      // Check if subcategory is already selected
      const subCategoryIndex = updatedCategories.findIndex(
        (cat) => cat.name === subcategory
      );

      if (subCategoryIndex >= 0) {
        // If selected, remove it
        updatedCategories.splice(subCategoryIndex, 1);
      } else {
        // Otherwise, add it
        updatedCategories.push({
          uid: `9999999_${updatedCategories.length + 1}`, // Generating a unique id for example
          name: subcategory,
          slug: generateSlug(subcategory),
        });
      }

      return {
        ...prevData,
        categories: updatedCategories,
      };
    });
  };

  const cancelGalleryImage = (index) => {
    setGalleryImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1); // Remove image at index
      return newImages;
    });
  };

  // Rashid Edit 06-11-2024
  const renderGalleryImages = () => {
    return galleryImages.map((image, index) => (
      <div key={index} className="gallery-image-wrapper">
        <img src={`${url}${image.image_url}`} alt={`Gallery ${index}`} className="image-preview" /> 
        <button onClick={() => cancelGalleryImage(index)} className="cancel-button">X</button>
      </div>
    ));
  };

  // const renderSubcategories = (category) => {
  //   if (!category.subcategories || category.subcategories.length === 0) return null;

  //   return (
  //     <div className="subcategory-list">
  //       {category.subcategories.map((subcategory, index) => (
  //         <div key={index} className="subcategory-item">
  //           <input
  //             type="radio" // Changed to radio for single selection
  //             name={`subcategory-${category.name}`}
  //             id={`subcategory-${category.name}-${index}`}
  //             checked={selectedSubCategories[category.name] === subcategory}
  //             onChange={() => handleSubCategorySelect(category.name, subcategory)}
  //             className="AddCheckedBoxes"
  //           />
  //           <label
  //             htmlFor={`subcategory-${category.name}-${index}`}
  //             className="subcategory-label"
  //           >
  //             {subcategory}
  //           </label>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const renderSubcategories = (category) => {
    if (!category.subcategories || category.subcategories.length === 0) return null;
  
    return (
      <div className="subcategory-list">
        {category.subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory-item">
            <input
              type="checkbox"
              id={`subcategory-${category.name}-${index}`}
              checked={formData.categories.some(cat => cat.name === subcategory)}
              onChange={() => handleSubCategorySelect(category.name, subcategory)}
              className="AddCheckedBoxes"
            />
            <label htmlFor={`subcategory-${category.name}-${index}`} className="subcategory-label">
              {subcategory}
            </label>
          </div>
        ))}
      </div>
    );
  };
  
  const uploadImageToBackend = async (files, imageType) => {
    const formData = new FormData();

    if (imageType === "productImage") {
      formData.append('image', files[0]);
    } else if (imageType === "galleryImages") {
      files.forEach((file, index) => {
        formData.append(`galleryImage_${index}`, file);
      });
    }

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(`${imageType} uploaded successfully:`, response.data);
    } catch (error) {
      console.error(`Error uploading ${imageType}:`, error);
    }
  };

  const cancelProductImage = () => {
    setProductImage(null);
  };


  // Rashid Edit 06-11-2024
  // Gallery modal
  const [modalView, setModalView] = useState(false);
  const [data, setData] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState([])
  const [productImagesFromApi, setProductImagesFromApi] = useState([])
  const [combinedImages, setCombinedIMages] = useState([])
  const [uploadedStatus, setUploadedStates] = useState(null);
  const [imageType, setImageType] = useState('')
  const [imageSendPayload, setImageSendPayload] = useState({
    file: null,
    alt_text: '',
    title: '',
    description: '',
    link_url: '',
  })
  // Rashid Edit 06-11-2024
  const handleGalleryModalOpen = (clickType) => {
    setModalView(true);
    setImageType(clickType)
  }
  // Rashid Edit 06-11-2024
  const handleGalleryModalClose = () => {
    setModalView(false);
  }
  // Rashid Edit 06-11-2024
  // const [isloading, setIsLoading] = useState(false);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const api = `${url}/api/v1/media/products/add`

    if (file) {
      setImageSendPayload((prevData) => ({
        ...prevData,
        file: file,
      }));
      setUploadedStates('loading');
      // alert('wait');
      // setIsLoading(true)
      // console.log("Loading state in if condition", isloading)
      const imagePayloadToSend = new FormData();
      imagePayloadToSend.append('image', file);
      imagePayloadToSend.append('alt_text', imageSendPayload.alt_text);
      imagePayloadToSend.append('title', imageSendPayload.title);
      imagePayloadToSend.append('description', imageSendPayload.description);
      imagePayloadToSend.append('image_url', imageSendPayload.image_url);
      imagePayloadToSend.append('link_url', imageSendPayload.link_url);
      try {
        await uploadImage(imagePayloadToSend, api, setUploadedStates)
        setUploadedStates('success');
        // setIsLoading(false);
        // console.log("Loading state in if condition", isloading)
      } catch (error) {
          console.error('Image upload failed', error);
          setUploadedStates('failed');
          // setIsLoading(false)
      }
    }
    console.log("handleChange file", file);
    setIsUploaded(true)
  }

  // Rashid Edit 06-11-2024
  // get image for Product Popup media 
  const getApi = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/media/products/get`);
      setData(response.data.media)
      console.log("product media get respponse: ", response.data.media)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApi()
  }, [])
  useEffect(() => {
    if(isUploaded){
      getApi()
      setIsUploaded(false)
    }
  }, [isUploaded])

  // Rashid Edit 06-11-2024
  const handleImageSelect = (image) => {
    if(imageType === 'product-image'){
      setProductImage(image);
    }else if(imageType === 'gallery-upload'){
      setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      setGalleryImages(newSelectedIMages);
      return newSelectedIMages;
    })
    }
    setModalView(false); // Close the modal after image selection
  };

  // Rashid Edit 06-11-2024
  // Log the product image whenever it changes
  useEffect(() => {
    if (productimage) {
      console.log("Product Image Set:", productimage); // Log the selected image URL
    }
  }, [productimage])


  // Rashid Edit 06-11-2024
  const accordionItems = [
    {
      title: "Publish",
      content: (
        <div className='PublishContainer'>
          <div className='StartContainer'>
            <div>
              <CustomBtn
                label="Save Draft"
                withIcon={false}
                className="DraftBtn"
                // onClick={handleImport}
                onClick={() => handlePrdSubmit("draft")}
                type="button"
              />
            </div>
            <div>
              <CustomBtn
                label="Preview"
                withIcon={false}
                className="PreviewBtn"
                // onClick={handleExport}
                type="button"
              />
            </div>
          </div>
          <div className='MidContainer'>
            <div className='MidRowsData'>
              <div className='RowContent'>
                <img src={imageStatus} alt="Description" className='ImageStyle' />
                <span className='TextStyle1'>Status:</span>
                <span className='TextStyle2'>Draft</span>
              </div>
              <div><PiNotePencil className='NoteIcon' /></div>
            </div>
            <div className='MidRowsData'>
              <div className='RowContent'>
                <img src={imageVisibility} alt="Description" className='ImageStyle' />
                <span className='TextStyle1'>Visibility:</span>
                <span className='TextStyle2'>Public</span>
              </div>
              <div><PiNotePencil className='NoteIcon' /></div>
            </div>
            <div className='MidRowsData'>
              <div className='RowContent'>
                <img src={imagePublish} alt="Description" className='ImageStyle' />
                <span className='TextStyle1'>Publish date:</span>
                <span className='TextStyle2'>Immediately</span>
              </div>
              <div><PiNotePencil className='NoteIcon' /></div>
            </div>
            <div className='MidRowsData'>
              <div className='RowContent'>
                <img src={imageSEO} alt="Description" className='ImageStyle' />
                <span className='TextStyle1'>SEO:</span>
                <span className='TextStyle2'>Not Available</span>
              </div>
              <div><PiNotePencil className='NoteIcon' /></div>
            </div>
            <div className='MidRowsData'>
              <div className='RowContent'>
                <img src={imageVisibility} alt="Description" className='ImageStyle' />
                <span className='TextStyle1'>Catalog visibility:</span>
                <span className='TextStyle2'>Shop & Search</span>
              </div>
              <div><PiNotePencil className='NoteIcon' /></div>
            </div>
          </div>
          <div className='EndContainer'>
            <div>
              <CustomBtn
                label="Copy to a new draft"
                withIcon={false}
                className="DraftCopyBtn"
                // onClick={handleImport}
                type="button"
              />
            </div>
            <div>
              <CustomBtn
                label="Publish"
                withIcon={false}
                className="PublishBtn"
                // onClick={handleExport}
                onClick={() => handlePrdSubmit("published")}
                type="button"
              />
            </div>
          </div>

        </div>
      ),
    },
    {
      title: 'Select Categories',
      content: (
        <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <input
              type="checkbox"
              id={`category-${index}`}
              checked={formData.categories.some(cat => cat.name === category.name)}
              onChange={() => handleCategorySelect(category.name)}
              className="AddCheckedBoxes"
            />
            <label htmlFor={`category-${index}`} className="category-label">
              {category.name}
            </label>
            {renderSubcategories(category)}
          </div>
        ))}
      </div>
      ),
    },
    {
      title: "Selected Filters",
      content: (<div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-small)' }}>This is the content of Selected Filters. The content can vary in size.</div>),
    },
    // Rashid Edit 06-11-2024
    {
      title: "Product Image",
      content: (
        <div className="banner-upload">
          {productimage ? (
            <div className="image-preview-wrapper">
              <img src={`${url}${productimage.image_url}`} alt="Thumbnail" className="image-preview" />
              <button onClick={cancelProductImage} className="cancel-button">X</button>
            </div>
          ) : (
            <label htmlFor="productImage" className="uploadAdd-label" onClick={() => handleGalleryModalOpen('product-image')}>
              <div className="Addupload-button">
                <img src={uploadIcon} alt="" className="uploaded-image" />
                <span className="uploadAdd-text">Click to Upload Image</span>
              </div>
            </label>
          )}
          {/* <input
            type="file"
            id="productImage"
            name="productImage"
            className="upload-input"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          /> */}
          <ImageGalleryPopup 
            showImageGalleryPopUp={modalView}
            handleModalView={handleGalleryModalClose}
            handleFileChange={handleFileChange}
            onImageSelect={handleImageSelect}
            imageSendPayload={imageSendPayload}
            setImageSendPayload={setImageSendPayload}
            alt_text={imageSendPayload.alt_text}
            title={imageSendPayload.title}
            data={data}
            // loading={isloading}
          />
        </div>
      ),
    },
    // Rashid Edit 06-11-2024
    {
      title: "Product Gallery",
      content: (
        <div className="Gallerybanner-upload">
          {galleryImages.length > 0 && renderGalleryImages()}

          {/* Single upload button */}
          <label htmlFor="galleryImages" className="uploadGallery-label">
            <div className="Galleryupload-button" onClick={() => handleGalleryModalOpen('gallery-upload')}>
              <img src={uploadIcon} alt="" className="Galleryuploaded-image" />
              <span className="uploadGallery-text">
                {galleryImages.length > 0
                  ? "Upload More Images"
                  : "Click to Upload Image"}
              </span>
            </div>
            <span className="uploadGallery-text-row">
              Note:<br />The aspect ratio of the image should be 3:2
            </span>
          </label>
          {/* <input
            type="file"
            id="galleryImages"
            name="galleryImages"
            className="upload-input"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            style={{ display: 'none' }}
          /> */}
        </div>
      ),
    },
  ];

  const productTypeOptions = [
    { value: 'Single Product', label: 'Single Product' },
    { value: 'Variable Product', label: 'Variable Product' },
  ];

  const handleEditorChange = (event, editor) => {
    const content = editor.getData(); // Get the HTML content from the editor
    setFormData((prevState) => ({
      ...prevState,
      description: content
    }));
  };

  const handleShortDescriptionChange = (event, editor) => {
    const shortDescriptionContent = editor.getData();
    setFormData(prevState => ({
      ...prevState,
      short_description: shortDescriptionContent
    }));
  };

  return (
      <div className="AddProductPage">

        <div className='PageLeftSide'>
          <div className='ProductDescription'>
            <div className='Row-1'>
              <div style={{ width: '48%' }}>
                <label htmlFor="ProductName" className="DescriptionLabels">Product Name:</label>
                <textarea
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="productInput-1"
                  placeholder="Cypress Bedroom Set in Gray"
                />
              </div>

              <div style={{ width: '48%', marginLeft: '10px' }}>
                <label htmlFor="permalink" className="DescriptionLabels">Permalink</label>
                <textarea
                  id="permalink"
                  name="permalink"
                  value={formData.permalink}
                  onChange={handleInputChange}
                  className="productInput-2"
                  placeholder="https://"
                />
              </div>
            </div>

            {/* Text editor section */}
            <div className='Row-2'>
              <label htmlFor="editor" className="DescriptionLabels-1">Product Description</label>
              <div className="custom-editor">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.description || ''} // Set initial data
                  config={{
                    placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray... ',
                  }}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
          </div>

          <div className="ProductData">
            <div className='ProductData-Header'>
              <div className='Data-Title'>
                <label htmlFor="editor">Product Data</label>
              </div>
              <div className='Product-Type'>
                <div className="custom-dropdown-wrapper">
                  <Dropdownresize
                    options={productTypeOptions}
                    selectedOption={selectedProductType} // Pass the selected option
                    handleOptionChange={handleProductTypeChange}
                  />
                </div>
              </div>
              <div className='Check-Selection'>
                <div className="checkbox-container">
                  <label htmlFor="virtual">Virtual</label>
                  <input
                    type="checkbox"
                    id="virtual"
                    name="virtual"
                    onChange={(e) => handleInputChange(e, 'checkbox', 'virtual')}
                  />
                </div>
                <div className="checkbox-container">
                  <label htmlFor="downloadable">Downloadable</label>
                  <input
                    type="checkbox"
                    id="downloadable"
                    name="downloadable"
                    onChange={(e) => handleInputChange(e, 'checkbox', 'downloadable')}
                  />
                </div>
              </div>
            </div>
            {/* Conditionally render the correct ProductData-Body */}
            {selectedProductType === 'Single Product' && (
              <div className='ProductData-Body'>
                <div className='Body-Sidebar'>
                  {/* Map through sidebar items */}
                  {sidebarItems.map(item => (
                    <div
                      key={item.id}
                      className={`Sidebar-Block ${selectedItem === item.id ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <div className="sidebar-item">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='Body-Content'>
                  {renderFields()}
                </div>
              </div>
            )}

            {selectedProductType === 'Variable Product' && (
              <div className='ProductData-Body'>
                <div className='Body-Sidebar'>
                  {variableSidebarItems.map(item => (
                    <div
                      key={item.id}
                      className={`Sidebar-Block ${selectedItem === item.id ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <div className="sidebar-item">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='Body-Content'>
                  {renderVariableFields()}
                </div>
              </div>)}
          </div>

          <div className="ShortDescription">
            <div className='ShortDescription-Header'>
              <label htmlFor="editor" >Short Description</label>
            </div>
            <div className='ShortDescription-Editor'>

              <CKEditor
                editor={ClassicEditor}
                data={formData.short_description || ''}
                config={{
                  placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray...',
                }}
                onChange={handleShortDescriptionChange}
              />

            </div>
          </div>

          <div className="SEO">
            <div className='SEO-Header'>
              <label htmlFor="editor" >SEO</label>
            </div>
            <div className="SEO-Body">
              <div className='SEO-Row-1'>
                <div className='Row-1-LeftSide'>Focus Key Phrase</div>
                <div className='Row-1-RightSide'>
                  <textarea id="FocusPhrase" type="text" className="SEOinput-01" placeholder='Enter Key Phrase here...' />
                </div>
              </div>

              {/* Accordion for SEO Rows 2 to 6 */}
              {['Search Appearance', 'Add Related Keyphrases', 'Internal Linking Suggestion', 'Corner Stone Product', 'Insights'].map((title, index) => (
                <div key={index} className={`SEO-Row-${index + 2}`}>
                  <div onClick={() => toggleAccordion(index + 2)} className="AccordionHeader">
                    <span>{title}</span>
                    <div className={`AccordionIcon ${accordionsOpen[index + 2] ? 'rotate' : ''}`}>
                      {accordionsOpen[index + 2] ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  <div className={`AccordionContent ${accordionsOpen[index + 2] ? 'open' : ''}`}>

                    {/* Custom content for "Search Appearance" Accordion */}
                    {title === 'Search Appearance' ? (
                      <>
                        {/* Radio Buttons for View Selection */}
                        <div className="ViewSelection">
                          <div className="CheckBtn">
                            <label className={`MobileCheckLabel ${isMobileAnimating && selectedView === 'Mobile' ? 'MobileViewAnimate' : ''}`}>
                              <input
                                type="radio"
                                name="viewOption"
                                value="Mobile"
                                checked={selectedView === 'Mobile'}
                                onChange={() => handleChange('Mobile')}
                                className='MobileCheckBtn'
                              />
                              Mobile View
                            </label>

                            <label className={`WebCheckLabel ${isWebAnimating && selectedView === 'Web' ? 'WebViewAnimate' : ''}`}>
                              <input
                                type="radio"
                                name="viewOption"
                                value="Web"
                                checked={selectedView === 'Web'}
                                onChange={() => handleChange('Web')}
                                className='WebCheckBtn'
                              />
                              Web View
                            </label>
                          </div>

                          {/* Conditional Rendering based on selected view */}
                          <div className="ViewContent">
                            {selectedView === 'Mobile' ? (
                              <div className="MobileViewContent">
                                <div className="Mobile-FirstRow">
                                  <div className='MobileLogo'><img src={Logo} alt="Logo" /></div>
                                  <div className='MobileHeader'>
                                    <span className='Header-Top'>Furniture Mecca</span>
                                    <span className='Header-Bottom'>myfurnituremecca.com</span>
                                  </div>
                                  <div className='MobileSelector'><img src={Selector} alt="Selector" /></div>
                                </div>
                                <div className="Mobile-SecondRow">
                                  <span className='Header-Secondrow'>-Furniture Mecca</span>
                                  <span className='Para-Secondrow'>Please provide a meta description by editing the snippet below. if you don't, Google will try to find a relevant part of your post to show in the search result.</span>
                                </div>
                              </div>
                            ) : (
                              <div className="WebViewContent">
                                <div className="Web-FirstRow">
                                  <div className='WebLogo'><img src={Logo} alt="Logo" /></div>
                                  <div className='WebHeader'>
                                    <span className='Header-Top'>Furniture Mecca</span>
                                    <span className='Header-Bottom'>myfurnituremecca.com</span>
                                  </div>
                                  <div className='WebSelector'><img src={Selector} alt="Selector" /></div>
                                </div>
                                <div className="Web-SecondRow">
                                  <span className='Header2-Secondrow'>-Furniture Mecca</span>
                                  <span className='Para2-Secondrow'>Please provide a meta description by editing the snippet below. if you don't, Google will try to find a relevant part of your post to show in the search result.</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* SEO Title with border-bottom */}
                        <div className='SEO-SearchAppearance SEO-Bordered'>
                          <div className='Row-2-LeftSide'>SEO Title</div>
                          <div className='Row-2-RightSide'>
                            <textarea id="SEOtitle" type="text" className="SEOinput-02" placeholder="" />
                          </div>
                        </div>

                        {/* Slug with border-bottom */}
                        <div className='SEO-SearchAppearance SEO-Bordered'>
                          <div className='Row-2-LeftSide'>Slug</div>
                          <div className='Row-2-RightSide'>
                            <textarea id="Slug" type="text" className="SEOinput-03" placeholder="" />
                          </div>
                        </div>

                        {/* Meta Description */}
                        <div className='SEO-SearchAppearance'>
                          <div className='Row-2-LeftSide'>Meta Description</div>
                          <div className='Row-2-RightSide'>
                            <textarea id="MetaDescription-1" type="text" className="SEOinput-04" placeholder="" />
                          </div>
                        </div>
                      </>
                    ) : title === 'Add Related Keyphrases' ? (
                      <div className='SEO-AddRelatedKeyphrase'>
                        <div className='Row-1-LeftSide'>Meta Description</div>
                        <div className='Row-1-RightSide'>
                          <textarea id="MetaDescription-2" type="text" className="SEOinput-05" placeholder="" />
                        </div>
                      </div>
                    ) : (
                      <p className='RestofAcord'>Content for {title} Accordion</p>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className='PageRightSide'>
          {accordionItems.map((item, index) => (
            <AccordionItem key={index} title={item.title} content={item.content} />
          ))}
        </div>

      </div>
  );
};

// ----------------------------------------------------------------------------------------------------------
// sidebarItems Sections (Body-Content for handling of Single Products)

// UI Component for displaying and selecting general fields of Single Products
const GeneralFields = ({ SaleOptions, taxTypeOptions, taxClassOptions, handleChangeSale, handleDiscountValueChange, handleChangeTaxStatus, selectedSale, selectedTaxStatus, selectedTaxClass, handleChangeTaxClass, formData, handleInputChange }) => (

  <div className='Content-GeneralFields'>
    <div className='GeneralFields-Data'>
      <label htmlFor="regular_price" className='Data-Label'>Regular Price ($)</label>
      <input
        type="text"
        id="regular_price"
        name="regular_price"
        className='Data-Field'
        value={formData.regular_price || ''}
        onChange={handleInputChange}
        placeholder='$'
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="salePrice" className='Data-Label'>Sale Price</label>
      <Dropdowncustom
        options={SaleOptions}
        selected={selectedSale}
        onChange={handleChangeSale}
        dropdownClass="custom-dropdown-sale"
        size={15}
      />
      <input type="text" id="salePrice" name="salePrice" className='Data-Field-Sale' placeholder='$' onChange={handleDiscountValueChange} />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="dateRange" className='Data-Label'>Date Range</label>
      <input type="text" id="dateRange" name="dateRange" className='Data-Field' />
    </div>
    <div className='GeneralFields-Data empty-space '>
      <label htmlFor="schedule" className='Data-Label label-schadule'>Schedule</label>
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="tax_status" className='Data-Label'>Tax Status</label>
      <Dropdowncustom
        options={taxTypeOptions}
        selected={formData.tax_status || ''}
        onChange={(value) => handleInputChange({ target: { name: 'tax_status', value } })}
        dropdownClass="custom-dropdown-tax"
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="tax_class" className='Data-Label'>Tax Class</label>
      <Dropdowncustom
        options={taxClassOptions}
        selected={formData.tax_class || ''}
        onChange={(value) => handleInputChange({ target: { name: 'tax_class', value } })}
        dropdownClass="custom-dropdown-tax"
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="brand" className='Data-Label'>Brand</label>
      <input
        type="text"
        id="brand"
        name="brand"
        className='Data-Field'
        value={formData.brand || ''}
        onChange={handleInputChange}
        placeholder='Brand'
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="gtin" className='Data-Label'>GTIN</label>
      <input
        type="text"
        id="gtin"
        name="gtin"
        className='Data-Field'
        value={formData.gtin || ''}
        onChange={handleInputChange}
        placeholder='GTIN'
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="ean" className='Data-Label'>EAN</label>
      <input
        type="text"
        id="ean"
        name="ean"
        className='Data-Field'
        value={formData.ean || ''}
        onChange={handleInputChange}
        placeholder='EAN'
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="mpn" className='Data-Label'>MPN</label>
      <input
        type="text"
        id="mpn"
        name="mpn"
        className='Data-Field'
        value={formData.mpn || ''}
        onChange={handleInputChange}
        placeholder='MPN'
      />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="excludeFromFeed" className='Data-Label'>Exclude From Feed</label>
      <input type="checkbox" id="excludeFromFeed" name="excludeFromFeed" className='Data-Checkbox' />
    </div>
    <div className='GeneralFields-Data'>
      <label htmlFor="nonLeasable" className='Data-Label'>Non Leasable</label>
      <input type="checkbox" id="nonLeasable" name="nonLeasable" className='Data-Checkbox' />
      <label htmlFor="warranty" className='Data-Label-center'>Warranty</label>
      <input type="checkbox" id="warranty" name="warranty" className='Data-Checkbox' />
    </div>
  </div >
);

// UI Component for displaying inventory fields of Single Products
const InventoryFields = ({ locationsOptions, handleChangeLocations, selectedLocations, isStockManagementChecked, handleStockManagementChange, setIsStockManagementChecked, formData, handleInputChange, handleManageStockChange, handleCheckboxChange }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-InventoryData' >
      <label htmlFor="sku" className='Data-Label-Inventory'>SKU</label>
      <div className="Dropdown-Image-Container-Inventory">
        <div className='Inventory-center'>
          <input
            type="text"
            id="sku"
            name="sku"
            className='Data-Field-Inventory'
            value={formData.sku || ''}
            onChange={handleInputChange}
            placeholder='SKU'
          />
        </div>
        <div className='ImageContainer'>
          <img src={questionMark} alt="question" className='ImageStyle-Inventory' />
        </div>
      </div>
    </div>
    <div className='GeneralFields-InventoryData' >
      <label htmlFor="stockManagement" className='Data-Label-Inventory'>Stock Management</label>
      <div className="Dropdown-Image-Container-Inventory">
        <div className='Inventory-center'>
          <input
            type="checkbox"
            checked={isStockManagementChecked}
            onChange={handleCheckboxChange}
          />
          <span>Manage Your Stocks</span>
        </div>
        <div className='ImageContainer'>
          <img src={questionMark} alt="question" className='ImageStyle-Inventory' />
        </div>
      </div>
    </div>

    {/* Conditionally render Quantity and Allow Back Order fields based on stock management checkbox */}
    {!isStockManagementChecked && (
      <>
        <div className='GeneralFields-InventoryData-1'>
          <label className='Data-Label-Inventory'>Stock Status</label>
          <div className="Dropdown-Image-Container-Inventory-1">
            <div className='Inventory-Radiocenter'>
              <input type="radio" id="inStock" name="stockStatus" className='Data-Radio' value="inStock" />
              <span>In Stock</span>
            </div>
            <div className='Inventory-Radiocenter'>
              <input type="radio" id="outOfStock" name="stockStatus" className='Data-Radio' value="outOfStock" />
              <span>Out of Stock</span>
            </div>
            <div className='Inventory-Radiocenter-1'>
              <input type="radio" id="preOrder" name="stockStatus" className='Data-Radio' value="preOrder" />
              <span>Pre-Order</span>
            </div>
          </div>
        </div>
        <div className='GeneralFields-InventoryData' >
          <label htmlFor="sold_individually" className='Data-Label-Inventory'>Sold Individually</label>
          <div className="Dropdown-Image-Container-Inventory">
            <div className='Inventory-center'>
              <input
                type="checkbox"
                id="sold_individually"
                name="sold_individually"
                className='Data-Checkbox'
                checked={formData.sold_individually || false}
                onChange={handleInputChange}
              />
              <span>Limit Purchase 1 purchase per order</span>
            </div>
            <div className='ImageContainer'>
              <img src={questionMark} alt="question" className='ImageStyle-Inventory' />
            </div>
          </div>
        </div>
      </>
    )}

    {/* Conditionally render Quantity and Allow Back Order fields based on stock management checkbox */}
    {isStockManagementChecked && (
      <>

        <div className='GeneralFields-CheckedData' >
          <label htmlFor="quantity" className='Data-Label-Inventory'>Quantity</label>
          <div className="Dropdown-Image-Container-Inventory">
            <div className='Inventory-center'>
              <input
                type="text"
                id="quantity"
                name="quantity"
                className='Data-Field-CheckedInventory'
                placeholder='1'
                onChange={handleManageStockChange}
              />
            </div>
          </div>
        </div>
        <div className='GeneralFields-CheckedData'>
          <label htmlFor="locations" className='Data-Label'>Locations</label>
          <Dropdowncustom
            options={locationsOptions}
            selected={formData.manage_stock.location}
            onChange={(selectedValue) => handleManageStockChange(selectedValue)}
            dropdownClass="custom-dropdown-locations"
            headerBgColor="#FFFFFF"
            listBgColor="#FFFFFF"
          />
        </div>
        <div className='GeneralFields-InventoryData-1'>
          <label className='Data-Label-Inventory'>Allow Back Order</label>
          <div className="Dropdown-Image-Container-Inventory-1">
            <div className='Inventory-Radiocenter'>
              <input
                type="radio"
                id="dontAllow"
                name="stock_status"
                className='Data-Radio'
                value="doNotAllow"
                onChange={handleManageStockChange}
              />
              <span>Do Not Allow</span>
            </div>
            <div className='Inventory-Radiocenter'>
              <input
                type="radio"
                id="notifyCustomer"
                name="stock_status"
                className='Data-Radio'
                value="notifyCustomer"
                onChange={handleManageStockChange}
              />
              <span>Allow but Notify Customer</span>
            </div>
            <div className='Inventory-Radiocenter-1'>
              <input
                type="radio"
                id="allow"
                name="stock_status"
                className='Data-Radio'
                value="Allow"
                onChange={handleManageStockChange}
              />
              <span>Allow</span>
            </div>
          </div>
        </div>

      </>
    )}

  </div>
);

// UI Component for displaying shipping fields of single Products
const ShippingFields = ({ shippingClassOptions, handleChangeShippingClass, selectedShippingClass }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-ShippingData' >
      <label htmlFor="shippingClass" className='Data-Label-Shipping'>Shipping Class</label>
      <div className="Dropdown-Image-Container">
        <Dropdowncustom
          options={shippingClassOptions}
          selected={selectedShippingClass}
          onChange={handleChangeShippingClass}
          dropdownClass="custom-dropdown-shipping"
        // size={15}
        />
        <img src={questionMark} alt="question" className='ImageStyle-Shipping' />
      </div>
    </div>
  </div>
);

// UI Component for displaying linked fields of single Products
const LinkedProducts = ({ collectionsList }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-LinkedData' >
      <label htmlFor="collections" className='Data-Label-Linked'>Collections</label>
      <div className="Dropdown-Image-Container-Linked">
        <input type="text" id="collections" name="collections" className='Data-Field-Linked' placeholder='' />
        {/* <SearchInput
        label="Collections"
        name="collections"
        placeholder="Search Collections..."
        options={collectionsList}
      /> */}
        <img src={questionMark} alt="question" className='ImageStyle-Linked' />
      </div>
    </div>
    <div className='GeneralFields-LinkedData' >
      <label htmlFor="relatedProducts" className='Data-Label-Linked'>Related Products</label>
      <div className="Dropdown-Image-Container-Linked">
        <input type="text" id="relatedProducts" name="relatedProducts" className='Data-Field-Linked' placeholder='' />
        <img src={questionMark} alt="question" className='ImageStyle-Linked' />
      </div>
    </div>
    <div className='GeneralFields-LinkedData' >
      <label htmlFor="mightNeed" className='Data-Label-Linked'>You might also need</label>
      <div className="Dropdown-Image-Container-Linked">
        <input type="text" id="mightNeed" name="mightNeed" className='Data-Field-Linked' placeholder='' />
        <img src={questionMark} alt="question" className='ImageStyle-Linked' />
      </div>
    </div>
  </div>
);

const AttributesFields = ({ handleSingleSaveAttributes, attributes, selectedAttributes, handleAttributeSelect, handleMultiSelect, handleDeleteAttribute }) => (
  <div className='Content-VariableGeneralFields'>
    <div className='GeneralFields-AdvanceData'>
      <SearchInput
        label="Add Attributes"
        name="addAttributes"
        placeholder="Search & Select Attributes..."
        options={attributes.map(attr => attr.name)} // Show only attribute names
        onSelect={handleAttributeSelect}
      />
    </div>

    <div className='GeneralFields-AttributeAccordion'>
      {selectedAttributes.length === 0 ? (
        <p>No attributes selected yet.</p>
      ) : (
        selectedAttributes.map((attribute, index) => (
          <AttributeAccordion
            key={index}
            title={attribute.name}
            content={
              <div className="attribute-content">
                <div className="row">
                  <div className="label">Name</div>
                  <div className="label-1">Value</div>
                </div>
                <div className="row">
                  <div className="attribute-name">{attribute.name}</div>
                  <div className="attribute-value">
                    <SearchMultiple
                      name="multiSelect"
                      placeholder={`Enter value for ${attribute.name}`}
                      options={attribute.options.map(option => option.name)} // Show options of the selected attribute
                      onSelect={(option) => handleMultiSelect(attribute.name, option)} // Call with only selected option
                      selectedItems={attribute.selectedOptions} // This should now only allow one item
                    />
                  </div>
                </div>
                <div className="checkboxes">
                  <label>
                    <input type="checkbox" /> <span className='Checkbox-Text'>Select all</span>
                  </label>
                  <label>
                    <input type="checkbox" /> <span className='Checkbox-Text'>Visible on product page</span>
                  </label>
                </div>
              </div>
            }
            handleDelete={() => handleDeleteAttribute(attribute.name)} // Handle attribute deletion
          />
        ))
      )}
    </div>

    <div className="SubmitBtn">
      <CustomBtn
        label="Save Attribute"
        className="AddAttributeBtn"
        onClick={handleSingleSaveAttributes}
        type="button"
      />
    </div>
  </div>
);

// UI Component for displaying Advance fields of single Products
const Advanced = ({ }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-AdvanceData' >
      <label htmlFor="purchaseNote" className='Data-Label'>Purchase Note</label>
      <textarea
        id="purchaseNote"
        name="purchaseNote"
        className="Data-Field-Advance"
        placeholder="Text Field"
        rows="4"  // Set desired number of rows
        cols="50" // Adjust as needed
      />
    </div>
    <div className='GeneralFields-AdvanceData' >
      <label htmlFor="menuOrder" className='Data-Label'>Menu Order</label>
      <input type="text" id="menuOrder" name="menuOrder" className='Data-Field' placeholder='Text Field' />
    </div>
    <div className='GeneralFields-AdvanceData' >
      <label htmlFor="enableReviews" className='Data-Label'>Enable Reviews</label>
      <input type="checkbox" id="enableReviews" name="enableReviews" className='Data-Checkbox' />
    </div>
  </div>
);

const SwatchFields = ({
  accordionsData,
  attributeTypeOptions,
  selectedAttributeType,
  setSelectedAttributeType,
  handleSubmit,
  handleTypeChange,
  renderOptionContent,
}) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-VariationData'>
      {accordionsData.length === 0 ? (
        <div className="no-swatch-message">No Swatches Generated Yet...</div>
      ) : (
        accordionsData.map((attribute, attributeIndex) => (
          <SwatchAccordion
            key={attributeIndex}
            title={
              <div className='Swatch-Header'>
                <div className='Swatch-attribute-name'>{attribute.name}</div>
                <div className='Type-Selection'>
                  <label htmlFor="attributeType" className='attrDropdown'>Attribute Type</label>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownSwatch
                      optionsmap={attributeTypeOptions}
                      selectedOption={attribute.type || selectedAttributeType}
                      handleOptionChange={(selectedValue) => {
                        setSelectedAttributeType(selectedValue);
                        handleTypeChange(attributeIndex, selectedValue);
                      }}
                    />
                  </div>
                </div>
              </div>
            }
            content={
              <div className='parent-accordion-content borderless'>
                {attribute.options.map((option, optionIndex) => (
                  <AttributeAccordion
                    key={option._id}
                    title={option.name}
                    content={renderOptionContent(attribute.type, option, attributeIndex, optionIndex)}
                    showDeleteIcon={false}
                    flexDirection="row"
                  />
                ))}
              </div>
            }
            showDeleteIcon={false}
            showToggleIcon={false}
          />
        ))
      )}
    </div>

    <div className="SubmitBtn">
      <CustomBtn
        label="Save Swatches"
        className="AddSwitchBtn"
        onClick={handleSubmit}
        type="button"
      />
    </div>

  </div>
);

// ----------------------------------------------------------------------------------------------------------
// variableSidebarItems Sections (Body-Content for handling of Variable Products)
// UI Component for displaying and selecting general fields of Variable Products
const VariableGeneralFields = ({ variableTaxTypeOptions, selectedVariableTax, handleChangeVariableTaxStatus, selectedVariableTaxClass, handleChangeVariableTaxClass, variableTaxClassOptions }) => (

  <div className='Content-VariableGeneralFields'>
    <div className='VariableGeneralFields-Data'>
      <label htmlFor="variabletaxStatus" className='VariableGeneralFields-Data-Label'>Tax Status</label>
      <Dropdowncustom
        options={variableTaxTypeOptions}
        selected={selectedVariableTax}
        onChange={handleChangeVariableTaxStatus} // Pass the selected value directly
        dropdownClass="custom-dropdown-tax"
      />
    </div>
    <div className='VariableGeneralFields-Data'>
      <label htmlFor="variableTaxClass" className='VariableGeneralFields-Data-Label'>Tax Class</label>
      <Dropdowncustom
        options={variableTaxClassOptions}
        selected={selectedVariableTaxClass}
        onChange={handleChangeVariableTaxClass} // Pass the selected value directly
        dropdownClass="custom-dropdown-tax"
      />
    </div>
    <div className='VariableGeneralFields-Data'>
      <label htmlFor="variablebrand" className='VariableGeneralFields-Data-Label'>Brand</label>
      <input type="text" id="variablebrand" name="variablebrand" className='VariableGeneralFields-Data-Field' placeholder='Text Field' />
    </div>

  </div >
);

// UI Component for displaying inventory fields of Variable Products
const VariableInventoryFields = ({ locationsOptions, handleChangeLocations, selectedLocations, isStockManagementChecked, handleStockManagementChange, setIsStockManagementChecked, }) => (
  <div className='Content-VariableGeneralFields'>
    <div className='VariableInventoryFields-Data' >
      <label htmlFor="variableSku" className='VariableInventoryFields-Data-Label'>SKU</label>
      <div className="VariableInventoryFields-Dropdown-Container">
        <div className='Inventory-center'>
          <input type="text" id="VariableSku" name="variableSku" className='VariableInventoryFields-Data-Field' placeholder='SKU' />
        </div>
        <div className='ImageContainer'>
          <img src={questionMark} alt="question" className='ImageStyle-Inventory' />
        </div>
      </div>
    </div>
    <div className='VariableInventoryFields-Data' >
      <label htmlFor="variableStockManagement" className='VariableInventoryFields-Data-Label'>Stock Management</label>
      <div className="VariableInventoryFields-Dropdown-Container">
        <div className='Inventory-center'>
          <input type="checkbox" id="variableStockManagement" name="variableStockManagement" className='Data-Checkbox' onChange={handleStockManagementChange} />
          <span>Manage Your Stocks</span>
        </div>
        <div className='ImageContainer'>
          <img src={questionMark} alt="question" className='ImageStyle-Inventory' />
        </div>
      </div>
    </div>

    {/* Conditionally render Quantity and Allow Back Order fields based on stock management checkbox */}
    {!isStockManagementChecked && (
      <>
        <div className='GeneralFields-InventoryData-1'>
          <label className='VariableInventoryFields-Data-Label'>Stock Status</label>
          <div className="Dropdown-Image-Container-Inventory-1">
            <div className='Inventory-Radiocenter'>
              <input type="radio" id="inStockVariable" name="stockStatusVariable" className='Data-Radio' value="inStockVariable" />
              <span>In Stock</span>
            </div>
            <div className='Inventory-Radiocenter'>
              <input type="radio" id="outOfStockVariable" name="stockStatusVariable" className='Data-Radio' value="outOfStockVariable" />
              <span>Out of Stock</span>
            </div>
            <div className='Inventory-Radiocenter-1'>
              <input type="radio" id="preOrderVariable" name="stockStatusVariable" className='Data-Radio' value="preOrderVariable" />
              <span>Pre-Order</span>
            </div>
          </div>
        </div>
        <div className='VariableInventoryFields-Data' >
          <label htmlFor="soldIndVariable" className='VariableInventoryFields-Data-Label'>Sold Individually</label>
          <div className="VariableInventoryFields-Dropdown-Container">
            <div className='Inventory-center'>
              <input type="checkbox" id="soldIndVariable" name="soldIndVariable" className='Data-Checkbox' />
              <span>Limit Purchase 1 purchase per order</span>
            </div>
            <div className='ImageContainer'>
              <img src={questionMark} alt="question" className='ImageStyle-Inventory' />
            </div>
          </div>
        </div>
      </>
    )}

    {/* Conditionally render Quantity and Allow Back Order fields based on stock management checkbox */}
    {isStockManagementChecked && (
      <>

        <div className='GeneralFields-CheckedData' >
          <label htmlFor="quantity" className='VariableInventoryFields-Data-Label'>Quantity</label>
          <div className="VariableInventoryFields-Dropdown-Container">
            <div className='Inventory-center'>
              <input type="text" id="variableQuantity" name="variableQuantity" className='VariableInventoryFields-Data-Field-Checked' placeholder='1' />
            </div>
          </div>
        </div>
        <div className='GeneralFields-CheckedData'>
          <label htmlFor="variableLocations" className='VariableInventoryFields-Data-Label'>Locations</label>
          <Dropdowncustom
            options={locationsOptions}
            selected={selectedLocations}
            onChange={handleChangeLocations}
            dropdownClass="custom-dropdown-locations"
            headerBgColor="#FFFFFF"
            listBgColor="#FFFFFF"
          />
        </div>
        <div className='GeneralFields-InventoryData-1'>
          <label className='VariableInventoryFields-Data-Label'>Allow Back Order</label>
          <div className="Dropdown-Image-Container-Inventory-1">
            <div className='Inventory-Radiocenter'>
              <input type="radio" id="dontAllowVariable" name="dontAllowVariable" className='Data-Radio' value="donotAllow" />
              <span>Do Not Allow</span>
            </div>
            <div className='Inventory-Radiocenter'>
              <input type="radio" id="notifyCustomerVariable" name="notifyCustomerVariable" className='Data-Radio' value="notifyCustomer" />
              <span>Allow but Notify Customer</span>
            </div>
            <div className='Inventory-Radiocenter-1'>
              <input type="radio" id="allowVariable" name="allowVariable" className='Data-Radio' value="Allow" />
              <span>Allow</span>
            </div>
          </div>
        </div>

      </>
    )}

  </div>
);

// UI Component for displaying shipping fields of Variable Products
const VariableShippingFields = ({ shippingClassOptions, handleChangeShippingClass, selectedShippingClass }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-ShippingData' >
      <label htmlFor="shippingClass" className='Data-Label-Shipping'>Shipping Class</label>
      <div className="Dropdown-Image-Container">
        <Dropdowncustom
          options={shippingClassOptions}
          selected={selectedShippingClass}
          onChange={handleChangeShippingClass}
          dropdownClass="custom-dropdown-shipping"
        // size={15}
        />
        <img src={questionMark} alt="question" className='ImageStyle-Shipping' />
      </div>
    </div>
  </div>
);

// UI Component for displaying linked fields of Variable Products
const VariableLinkedProducts = ({ collectionsList }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-LinkedData' >
      <label htmlFor="collections" className='Data-Label-Linked'>Collections</label>
      <div className="Dropdown-Image-Container-Linked">
        <input type="text" id="collections" name="collections" className='Data-Field-Linked' placeholder='' />
        {/* <SearchInput
        label="Collections"
        name="collections"
        placeholder="Search Collections..."
        options={collectionsList}
      /> */}
        <img src={questionMark} alt="question" className='ImageStyle-Linked' />
      </div>
    </div>
    <div className='GeneralFields-LinkedData' >
      <label htmlFor="relatedProducts" className='Data-Label-Linked'>Related Products</label>
      <div className="Dropdown-Image-Container-Linked">
        <input type="text" id="relatedProducts" name="relatedProducts" className='Data-Field-Linked' placeholder='' />
        <img src={questionMark} alt="question" className='ImageStyle-Linked' />
      </div>
    </div>
    <div className='GeneralFields-LinkedData' >
      <label htmlFor="mightNeed" className='Data-Label-Linked'>You might also need</label>
      <div className="Dropdown-Image-Container-Linked">
        <input type="text" id="mightNeed" name="mightNeed" className='Data-Field-Linked' placeholder='' />
        <img src={questionMark} alt="question" className='ImageStyle-Linked' />
      </div>
    </div>
  </div>
);

// UI Component for displaying and selecting attributes of Variable Products
const VariableAttributesFields = ({ handleSaveAttributes, attributes, selectedAttributes, handleAttributeSelect, handleMultiSelect, handleDeleteAttribute }) => (
  <div className='Content-VariableGeneralFields'>
    <div className='GeneralFields-AdvanceData'>
      <SearchInput
        label="Add Attributes"
        name="addAttributes"
        placeholder="Search & Select Attributes..."
        options={attributes.map(attr => attr.name)} // Show only attribute names
        onSelect={handleAttributeSelect}
      />
    </div>

    <div className='GeneralFields-AttributeAccordion'>
      {selectedAttributes.length === 0 ? (
        <p>No attributes selected yet.</p>
      ) : (
        selectedAttributes.map((attribute, index) => (
          <AttributeAccordion
            key={index}
            title={attribute.name}
            content={
              <div className="attribute-content">
                <div className="row">
                  <div className="label">Name</div>
                  <div className="label-1">Value</div>
                </div>
                <div className="row">
                  <div className="attribute-name">{attribute.name}</div>
                  <div className="attribute-value">
                    <SearchMultiple
                      name="multiSelect"
                      placeholder={`Enter value for ${attribute.name}`}
                      options={attribute.options.map(option => option.name)} // Show options of the selected attribute
                      onSelect={(option, isRemoving) => handleMultiSelect(attribute.name, option, isRemoving)}
                      selectedItems={attribute.selectedOptions}
                    />
                  </div>
                </div>
                <div className="checkboxes">
                  <label>
                    <input type="checkbox" /> <span className='Checkbox-Text'>Select all</span>
                  </label>
                  <label>
                    <input type="checkbox" /> <span className='Checkbox-Text'>Visible on product page</span>
                  </label>
                </div>
              </div>
            }
            handleDelete={() => handleDeleteAttribute(attribute.name)} // Handle attribute deletion
          />
        ))
      )}
    </div>

    <div className="SubmitBtn">
      <CustomBtn
        label="Save Attribute"
        className="AddAttributeBtn"
        onClick={handleSaveAttributes}
        type="button"
      />
    </div>
  </div>
);

// UI Component for displaying and adding variations
const VariableVariationsFields = ({ shippingClassOptions, handleChangeShippingClass, selectedShippingClass, variations, handleChangeTaxClass, handleChangeTaxStatus, generateVariationNumber, selectedTaxStatus, saleOptions, taxTypeOptions, taxClassOptions, selectedSale, selectedTaxClass, handleChangeSale }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-VariationData-1' >
      <label htmlFor="shippingClass" className='Data-Label-Linked'>Default Form Values</label>
      <div className="Dropdown-Image-Container-Linked">
        <Dropdowncustom
          options={shippingClassOptions}
          selected={selectedShippingClass}
          onChange={handleChangeShippingClass}
          dropdownClass="custom-dropdown-VariationsAttributes"
          size={15}
        />
        <Dropdowncustom
          options={shippingClassOptions}
          selected={selectedShippingClass}
          onChange={handleChangeShippingClass}
          dropdownClass="custom-dropdown-VariationsAttributes"
          size={15}
        />
      </div>
    </div>
    {variations.length === 0 ? (
      <p>No variations generated yet...<br /> <strong>Noted:</strong> For generating variations add more than one attribute </p>
    ) : (
      variations.map((variation, index) => (
        <AttributeAccordion
          key={index}
          title={
            <div className="variation-title">
              <span className="serialNo" >#{generateVariationNumber(index)}</span>
              <div className="variation-boxes">
                {/* Render the options in box-style */}
                {variation.map((option, i) => (
                  <div key={i} className="variation-box">
                    {option}
                  </div>
                ))}
              </div>
            </div>
          }
          content={(
            <div className='Variation-Content'>
              <VariationForm
                SaleOptions={saleOptions}
                taxTypeOptions={taxTypeOptions}
                taxClassOptions={taxClassOptions}
                selectedSale={selectedSale}
                selectedTaxStatus={selectedTaxStatus}
                selectedTaxClass={selectedTaxClass}
                handleChangeSale={handleChangeSale}
                handleChangeTaxStatus={handleChangeTaxStatus}
                handleChangeTaxClass={handleChangeTaxClass}
              />
            </div>
          )}
          handleDelete={() => console.log(`Delete variation ${index + 1}`)} // Handle delete logic here
          // Pass 'Edit' as the toggleLabel (no need for isOpen here)
          toggleLabel='Edit'
        />
      ))
    )}
  </div>
);

// UI Component for displaying Advance fields of Variable Products
const VariableAdvanceFields = ({ }) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-AdvanceData' >
      <label htmlFor="purchaseNote" className='Data-Label'>Purchase Note</label>
      <textarea
        id="purchaseNote"
        name="purchaseNote"
        className="Data-Field-Advance"
        placeholder="Text Field"
        rows="4"  // Set desired number of rows
        cols="50" // Adjust as needed
      />
    </div>
    <div className='GeneralFields-AdvanceData' >
      <label htmlFor="menuOrder" className='Data-Label'>Menu Order</label>
      <input type="text" id="menuOrder" name="menuOrder" className='Data-Field' placeholder='Text Field' />
    </div>
    <div className='GeneralFields-AdvanceData' >
      <label htmlFor="enableReviews" className='Data-Label'>Enable Reviews</label>
      <input type="checkbox" id="enableReviews" name="enableReviews" className='Data-Checkbox' />
    </div>
  </div>
);

const VariableSwatchFields = ({
  accordionsData,
  setAccordionsData,
  handleInputChange,
  attributeTypeOptions,
  selectedAttributeType,
  setSelectedAttributeType,
  handleSubmit,
  handleTypeChange,
  renderOptionContent,
  handleOptionValueChange,
}) => (
  <div className='Content-GeneralFields'>
    <div className='GeneralFields-VariationData'>
      {accordionsData.length === 0 ? (
        <div className="no-swatch-message">No Swatches Generated Yet...</div>
      ) : (
        accordionsData.map((attribute, attributeIndex) => (
          <SwatchAccordion
            key={attributeIndex}
            title={
              <div className='Swatch-Header'>
                <div className='Swatch-attribute-name'>{attribute.name}</div>
                <div className='Type-Selection'>
                  <label htmlFor="attributeType" className='attrDropdown'>Attribute Type</label>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownSwatch
                      optionsmap={attributeTypeOptions}
                      selectedOption={attribute.type || selectedAttributeType}
                      handleOptionChange={(selectedValue) => {
                        setSelectedAttributeType(selectedValue);
                        handleTypeChange(attributeIndex, selectedValue); // Update type on dropdown change
                      }}
                    />
                  </div>
                </div>
              </div>
            }
            content={
              <div className='parent-accordion-content borderless'>
                {attribute.options.map((option, optionIndex) => (
                  <AttributeAccordion
                    key={option._id}
                    title={option.name}
                    content={renderOptionContent(attribute.type, option, attributeIndex, optionIndex)}
                    showDeleteIcon={false}
                    flexDirection="row"
                  />
                ))}
              </div>
            }
            showDeleteIcon={false}
            showToggleIcon={false}
          />
        ))
      )}
    </div>

    <div className="SubmitBtn">
      <CustomBtn
        label="Save Swatches"
        className="AddSwitchBtn"
        onClick={handleSubmit}
        type="button"
      />
    </div>

  </div>
);

export default AddProduct;