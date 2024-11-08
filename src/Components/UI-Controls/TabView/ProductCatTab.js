import React, { useState } from 'react';
import './TabBarView.css'; // Import CSS for styling
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SEOSection = ({ metaData, handleInputChange, accordions, viewType,
    keyPhrase, handleKeyPhraseChange, handleViewChange, isAccordionOpen, toggleAccordion, isAccordionAdvanceOpen,
    toggleAdvanceAccordion }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', lineHeight: '10px', }}>
        <label style={{ paddingLeft: '10px', }}>Focus Keyphrase:</label>
        <input type="text" placeholder="Enter Keyphrase" style={{ width: '270px', height: '30px', marginLeft: '10px', }} />
        <br />

        <hr style={{ width: '103%', border: '1px dotted #ccc' }} />

        <div style={{ marginBottom: 10, paddingLeft: '10px', }}>
            <label>Search Appearance</label>
            <p style={{ fontSize: '11.5px', marginLeft: 5, }}>Determine how your post look in the search result</p>
        </div>

        <label style={{ paddingLeft: '10px', }}>Preview as:</label>
        <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '270px', }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                    type="radio"
                    id="mobile_view"
                    name="viewType"
                    value="mobile"
                    checked={viewType === 'mobile'}
                    onChange={handleViewChange}
                    style={{ width: '15px', height: '15px', marginRight: '10px' }}
                />
                <label htmlFor="mobile_view" style={{ fontFamily: 'var(--font-family)', color: 'black', fontSize: '11.5px', }}>Mobile View</label><br />
            </div><div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                    type="radio"
                    id="desktop_view"
                    name="viewType"
                    value="desktop"
                    checked={viewType === 'desktop'}
                    onChange={handleViewChange}
                    style={{ width: '15px', height: '15px', marginRight: '10px' }}
                />
                <label htmlFor="desktop_view" style={{ fontFamily: 'var(--font-family)', color: 'black', fontSize: '11.5px', }}>Desktop View</label>
            </div></div>

        {/* Display card based on the selected view */}
        {viewType && (
            <div style={{
                width: '295px',
                height: '40px',
                marginLeft: '10px',
                backgroundColor: viewType === 'mobile' ? 'var(--primary-color)' : 'var(--primary-color-opacity)',
                color: viewType === 'mobile' ? 'white' : 'var(--primary-color)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
            }}>
                <span>{viewType === 'mobile' ? 'Mobile View' : 'Desktop View'} Card</span>
            </div>
        )}

        <label style={{ paddingLeft: '10px', }}>SEO Title:</label>
        <input
            type="text"
            placeholder="Enter SEO Titles, separated by commas"
            name="metaTitle"
            value={metaData.metaTitle}
            onChange={handleInputChange}
            style={{ width: '270px', height: '30px', marginLeft: '10px' }}
        />
        <br />
        <label style={{ paddingLeft: '10px', }}>Slug:</label>
        <input type="text" placeholder="Enter Slug" style={{ width: '270px', height: '30px', marginLeft: '10px', }} />
        <br />
        <label style={{ paddingLeft: '10px' }}>Meta Description:</label>
        <input
            type="text"
            placeholder="Enter Meta Description"
            name="metaDescription"
            style={{ width: '270px', height: '30px', marginLeft: '10px' }}
            value={metaData.metaDescription}
            onChange={handleInputChange}
        />
        <br />

        {/* Accordion for Related Keyphrase */}
        <div>
            {accordions.map((accordion, index) => (
                <div key={index}>
                    {/* Accordion for Related Keyphrase */}
                    <div
                        onClick={() => toggleAccordion(index)}
                        style={{
                            width: '298px',
                            height: 'auto',
                            // marginTop: '10px',
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            borderLeft: 'none',
                            borderRight: 'none',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <div style={{ lineHeight: '18px' }}>
                            <FaPlus style={{ marginRight: '8px', fontSize: 'var(--font-size-small)', }} />
                            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-large)', color: 'var(--text-color)' }}>Add Related Keyphrase</span>
                        </div>
                        <div>
                            {accordion.isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>

                    {/* Accordion Content */}
                    <div
                        style={{
                            maxHeight: accordion.isAccordionOpen ? '300px' : '0',
                            opacity: accordion.isAccordionOpen ? 1 : 0,
                            width: '298px',
                            overflow: 'hidden',
                            transition: 'max-height 0.5s ease, opacity 0.5s ease',
                            borderBottom: accordion.isAccordionOpen ? '1px solid #ccc' : 'none',
                            padding: accordion.isAccordionOpen ? '10px' : '0 10px',
                        }}
                    >
                        <label>Related Keyphrase:</label>
                        <span
                            style={{
                                display: 'block',
                                width: '270px',
                                height: '20px',
                                lineHeight: '18px',
                                padding: '5px',
                                fontSize: '11.5px',
                            }}
                        >
                            {accordion.keyPhrase || ''}
                        </span>

                        <br />
                        <label>Key Phrase:</label>
                        <input
                            type="text"
                            placeholder="Enter Key Phrase"
                            value={accordion.keyPhrase}
                            onChange={(e) => handleKeyPhraseChange(index, e.target.value)}
                            style={{
                                width: '270px',
                                height: '30px',
                                marginBottom: '10px',
                                transition: 'opacity 0.5s ease',
                            }}
                        />
                        <br />
                        <label>Synonyms:</label>
                        <input
                            type="text"
                            placeholder="Enter Synonyms, separated by commas"
                            style={{
                                width: '270px',
                                height: '30px',
                                transition: 'opacity 0.5s ease',
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>

        {/* Accordion for Advance */}
        <div
            onClick={toggleAdvanceAccordion}
            style={{
                cursor: 'pointer',
                border: 'none',
                padding: '10px',
                width: '298px',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}
        >
            <div>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-large)', color: 'var(--text-color)', }}>Advance</span>
            </div>
            <div>{isAccordionAdvanceOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
        </div>

        <div
            style={{
                maxHeight: isAccordionAdvanceOpen ? '300px' : '0',
                opacity: isAccordionAdvanceOpen ? 1 : 0,
                overflow: 'hidden',
                width: '298px',
                borderTop: isAccordionAdvanceOpen ? '1px solid #ccc' : 'none',
                transition: 'max-height 0.5s ease, opacity 0.5s ease',
                padding: isAccordionAdvanceOpen ? '10px' : '0 10px',
            }}
        >
            <p style={{ fontSize: '11.5px', fontWeight: 500, marginLeft: '0 5px 5px 5px' }}>
                Allow search engines to show this content in search results?
            </p>
            <input
                type="text"
                placeholder=""
                style={{
                    width: '270px',
                    height: '30px',
                    marginBottom: '10px',
                    transition: 'opacity 0.5s ease',
                }}
            />
            <br />
            <label>Breadcrumbs Title ?</label>
            <input
                type="text"
                placeholder=""
                style={{
                    width: '270px',
                    height: '30px',
                    marginBottom: '10px',
                    transition: 'opacity 0.5s ease',
                }}
            />
            <br />
            <label>Canonical URL ?</label>
            <input
                type="text"
                placeholder=""
                style={{
                    width: '270px',
                    height: '30px',
                    transition: 'opacity 0.5s ease',
                }}
                name='canonicalUrl'
                value={metaData.canonicalUrl}
                onChange={handleInputChange}
            />
        </div>

    </div>
);

const SocialSection = ({ updateCategoryData, handleInputChange, metaData, selectedImage, handleImageSelection, 
    handleImageCancel, isHovered, setIsHovered, toggleXAppearanceAccordion, isAccordionXOpen, selectedXImage, 
    handleXImageSelection, handleXImageCancel }) => (

    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', lineHeight: '10px', }}>
        <label style={{ paddingLeft: '10px', }}>Social Media Appearance</label>
        <span style={{ fontSize: '10px', lineHeight: '12px', paddingLeft: '10px', }}>Determine how your post look on social media like Facebook, X, Instagram, Whatsapp, Threads, LinkedIn, Slack & more.</span>
        <br />
        <label style={{ fontSize: '11.5px', paddingLeft: '10px', }}>Social share preview</label>
        <div style={{
            margin: '0 0 10px 10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            width: '295px',
            position: 'relative' // Make the parent container relative for absolute positioning
        }}>
            <div style={{ height: '150px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selectedImage ? (
                    <>
                        <img src={selectedImage} alt="Selected" style={{ maxHeight: '130px', maxWidth: '100%', borderRadius: '4px' }} />
                        <button
                            onClick={handleImageCancel}
                            style={{
                                position: 'absolute',
                                top: '5px', // Adjust top position as needed
                                right: '5px', // Adjust right position as needed
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'red',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                zIndex: 1 // Ensure the button is above the image
                            }}
                        >
                            &times; {/* Cross icon */}
                        </button>
                    </>
                ) : (
                    <label
                        style={{ cursor: 'pointer', textDecoration: isHovered ? 'underline' : 'none', color: isHovered ? 'var(--primary-color)' : 'var(--text-color)' }}
                        onMouseEnter={() => setIsHovered(true)}  // Change state on hover
                        onMouseLeave={() => setIsHovered(false)} // Reset state on mouse leave
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelection}
                            // onChange={handleInputChange}
                            style={{ display: 'none' }} />
                        <span>Select an Image</span>
                    </label>
                )}
            </div>
            <div style={{ height: '65px' }}>
                <span
                    style={{
                        display: 'block',
                        width: '240px',
                        height: '20px',
                        lineHeight: '10px',
                        padding: '8px 0 0 8px',
                        fontSize: '11.5px',
                        fontWeight: 'var(--font-weight-semi-bold)',
                    }}
                >
                    {metaData.ogTitle}
                </span>
                <span
                    style={{
                        display: 'block',
                        width: '240px',
                        height: '20px',
                        lineHeight: '10px',
                        padding: '0 0 0 8px',
                        fontSize: '11.5px',
                    }}
                >
                    {metaData.ogDescription}
                </span>
                <br />
            </div>
        </div>
        <label style={{ paddingLeft: '10px', }}>Social Title:</label>
        <input
            type="text"
            placeholder="Enter Social Title"
            name='ogTitle'
            value={metaData.ogTitle}
            onChange={handleInputChange}
            style={{ width: '270px', height: '30px', marginLeft: '10px' }}
        />
        <label style={{ paddingLeft: '10px', }}>Social Description:</label>
        <textarea
            type="text"
            placeholder="Enter Social Description"
            name='ogDescription'
            value={metaData.ogDescription}
            onChange={handleInputChange}
            style={{ width: '270px', height: '30px', marginLeft: '10px' }}
        />
        <span style={{ fontSize: '10px', lineHeight: '13px', paddingLeft: '10px', }}>
            To customize the appearance of your post specifically for X, please fill out the 'X appearance' setting below.
            if you leave these settings untouched. the 'Social media appearance' settings mentioned above will also be applied
            for sharing on X.
        </span>
        <br />

        {/* Accordion for X-Appearance */}
        <div
            onClick={toggleXAppearanceAccordion}
            style={{
                marginTop: '10px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                padding: '10px',
                width: '298px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}
        >
            <div>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-large)', color: 'var(--text-color)', }}>X Appearance</span>
            </div>
            <div>{isAccordionXOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
        </div>

        <div
            style={{
                maxHeight: isAccordionXOpen ? '600px' : '0',
                opacity: isAccordionXOpen ? 1 : 0,
                width: '298px',
                overflow: 'hidden',
                transition: 'max-height 0.5s ease, opacity 0.5s ease',
                borderTop: isAccordionXOpen ? '1px solid #ccc' : 'none',
                padding: isAccordionXOpen ? '10px' : '0 10px',
            }}
        >
            <label style={{ fontSize: '11.5px', marginLeft: '10px' }}>X share preview</label>
            <div style={{
                margin: '5px 0 10px 5px',
                border: '1px solid #ccc',
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
                width: '285px',
                position: 'relative' // Make the parent container relative for absolute positioning
            }}>
                <div style={{ height: '150px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedXImage ? (
                        <>
                            <img src={selectedXImage} alt="Selected" style={{ maxHeight: '130px', maxWidth: '100%', borderRadius: '4px' }} />
                            <button
                                onClick={handleXImageCancel}
                                style={{
                                    position: 'absolute',
                                    top: '5px', // Adjust top position as needed
                                    right: '5px', // Adjust right position as needed
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'red',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    zIndex: 1 // Ensure the button is above the image
                                }}
                            >
                                &times; {/* Cross icon */}
                            </button>
                        </>
                    ) : (
                        <label
                            style={{ cursor: 'pointer', textDecoration: isHovered ? 'underline' : 'none', color: isHovered ? 'var(--primary-color)' : 'var(--text-color)' }}
                            onMouseEnter={() => setIsHovered(true)}  // Change state on hover
                            onMouseLeave={() => setIsHovered(false)} // Reset state on mouse leave
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleXImageSelection}
                                style={{ display: 'none' }}
                            />
                            <span>Select an Image</span>
                        </label>
                    )}
                </div>
                <div style={{ height: '65px' }}>
                    <span
                        style={{
                            display: 'block',
                            width: '240px',
                            height: '20px',
                            lineHeight: '10px',
                            padding: '8px 0 0 8px',
                            fontSize: '11.5px',
                            fontWeight: 'var(--font-weight-semi-bold)',
                        }}
                    >
                        {metaData.xTitle}
                    </span>
                    <span
                        style={{
                            display: 'block',
                            width: '240px',
                            height: '20px',
                            lineHeight: '10px',
                            padding: '0 0 0 8px',
                            fontSize: '11.5px',
                        }}
                    >
                        {metaData.xDescription}
                    </span>
                    <br />
                </div>
            </div>
            <label>X Title:</label>
            <input
                type="text"
                placeholder="Enter X Title"
                name='xTitle'
                value={metaData.xTitle}
                onChange={handleInputChange}
                style={{ width: '270px', height: '30px', }}
            />
            <label>X Description:</label>
            <textarea
                type="text"
                placeholder="Enter X Description"
                name='xDescription'
                value={metaData.xDescription}
                onChange={handleInputChange}
                style={{ width: '270px', height: '30px' }}
            />
        </div>
    </div>
);

const TabBarView = ({ onKeyPhrasesChange, handleInputChange, metaData, updateCategoryData, categoryData }) => {
    const [activeTab, setActiveTab] = useState('SEO');
    const [viewType, setViewType] = useState('');
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isAccordionAdvanceOpen, setIsAccordionAdvanceOpen] = useState(false);
    const [keyPhrase, setKeyPhrase] = useState('');
    const [accordions, setAccordions] = useState([
        { keyPhrase: '', isAccordionOpen: false },
    ]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedXImage, setSelectedXImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isAccordionXOpen, setIsAccordionXOpen] = useState(false);

    // Toggle accordion open/close for a specific accordion
    const toggleAccordion = (index) => {
        const newAccordions = [...accordions];
        newAccordions[index].isAccordionOpen = !newAccordions[index].isAccordionOpen;
        setAccordions(newAccordions);
    };

    const toggleAdvanceAccordion = () => {
        setIsAccordionAdvanceOpen((prev) => !prev);
    };

    const handleViewChange = (e) => {
        setViewType(e.target.value);
    };
    
    // Handle key phrase change, add a new accordion if needed, and remove the last one if empty
    const handleKeyPhraseChange = (index, value) => {
        const newAccordions = [...accordions];
        newAccordions[index].keyPhrase = value;

        // Add a new accordion if current one has value and it's the last one
        if (value && index === accordions.length - 1) {
            newAccordions.push({ keyPhrase: '', isAccordionOpen: false });
        }
        // Remove the last accordion if the previous one is empty
        else if (!value && accordions.length > 1 && index === accordions.length - 2 && accordions[accordions.length - 1].keyPhrase === '') {
            newAccordions.pop(); // Remove last accordion
        }

        setAccordions(newAccordions);

        // Call the parent function to update key phrases
        const keyPhrases = newAccordions.map(accordion => accordion.keyPhrase).filter(Boolean);
        onKeyPhrasesChange(keyPhrases);
    };

    const handleImageSelection = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            updateCategoryData({
                ...categoryData,
                og_image: file,
            });
        }
    };

    const handleImageCancel = () => {
        // Call the function to clear the selected image
        handleImageSelection(null); // or setSelectedImage(null) if you pass setSelectedImage as a prop
    };

    const handleXImageSelection = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedXImage(URL.createObjectURL(file));
            updateCategoryData({
                ...categoryData,
                x_image: file,
            });
        }
    };

    const handleXImageCancel = () => {
        // Call the function to clear the selected image
        handleXImageSelection(null); // or setSelectedImage(null) if you pass setSelectedImage as a prop
    };

    const toggleXAppearanceAccordion = () => {
        setIsAccordionXOpen((prev) => !prev);
    };

    return (
        <div className="tab-bar-container">
            <div className="tab-bar">
                <div
                    className={`tab ${activeTab === 'SEO' ? 'active' : ''}`}
                    onClick={() => setActiveTab('SEO')}
                >
                    SEO
                </div>
                <div
                    className={`tab ${activeTab === 'Social' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Social')}
                >
                    Social
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'SEO' ? (
                    <SEOSection
                        viewType={viewType}
                        handleViewChange={handleViewChange}
                        isAccordionOpen={isAccordionOpen}
                        toggleAccordion={toggleAccordion}
                        isAccordionAdvanceOpen={isAccordionAdvanceOpen}
                        toggleAdvanceAccordion={toggleAdvanceAccordion}
                        keyPhrase={keyPhrase}
                        handleKeyPhraseChange={handleKeyPhraseChange}
                        accordions={accordions}
                        handleInputChange={handleInputChange}
                        metaData={metaData}
                    />
                ) : (
                    <SocialSection
                        selectedImage={selectedImage}
                        handleImageSelection={handleImageSelection}
                        handleImageCancel={handleImageCancel}
                        isHovered={isHovered}
                        setIsHovered={setIsHovered}
                        toggleXAppearanceAccordion={toggleXAppearanceAccordion}
                        isAccordionXOpen={isAccordionXOpen}
                        selectedXImage={selectedXImage}
                        handleXImageSelection={handleXImageSelection}
                        handleXImageCancel={handleXImageCancel}
                        handleInputChange={handleInputChange}
                        metaData={metaData}
                        updateCategoryData={updateCategoryData}
                    />
                )}
            </div>
        </div>
    );
};

export default TabBarView;