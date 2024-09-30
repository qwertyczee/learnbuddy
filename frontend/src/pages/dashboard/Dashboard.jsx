import React, { useState, useRef, useEffect } from 'react';
import style from "./dashboard.module.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

import { ReactComponent as ComputerScience } from '../../imgs/ComputerScience.svg';
import { ReactComponent as Economics } from '../../imgs/Economics.svg';
import { ReactComponent as Biology } from '../../imgs/Biology.svg';
import { ReactComponent as Chemistry } from '../../imgs/Chemistry.svg';
import { ReactComponent as Humanities } from '../../imgs/Humanities.svg';
import { ReactComponent as Math } from '../../imgs/Math.svg';
import { ReactComponent as Physics } from '../../imgs/Physics.svg';
import { ReactComponent as Other } from '../../imgs/Other.svg';


const iconMapping = {
    "ComputerScience": <ComputerScience className={style.svgIcon} />,
    "Economics": <Economics className={style.svgIcon} />,
    "Biology": <Biology className={style.svgIcon} />,
    "Chemistry": <Chemistry className={style.svgIcon} />,
    "Humanities": <Humanities className={style.svgIcon} />,
    "Math": <Math className={style.svgIcon} />,
    "Physics": <Physics className={style.svgIcon} />,
    "Other": <Other className={style.svgIcon} />
};

// FloatingPanel
const FloatingPanel = ({ type, onClose, isVisible }) => {
    const panelRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [link, setLink] = useState("");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Link:", link);
        handleClose();
    };

    const handleClose = () => {
        setSelectedOption(null); // Reset selected option
        setLink(""); // Reset link input field
        onClose();
    };

    const options = [
        { iconName: "ComputerScience", name: "Computer Science", description: "Data Structures, Algorithms, Operating Systems, etc." },
        { iconName: "Economics", name: "Economics", description: "Microeconomics, Macroeconomics, Behavioral Economics, etc." },
        { iconName: "Biology", name: "Biology", description: "Genetics, Ecology, Anatomy, Microbiology, etc." },
        { iconName: "Chemistry", name: "Chemistry", description: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, etc." },
        { iconName: "Humanities", name: "Humanities", description: "Philosophy, Literature, Art History, Cultural Studies, etc." },
        { iconName: "Math", name: "Math", description: "Calculus, Algebra, Geometry, Statistics, etc." },
        { iconName: "Physics", name: "Physics", description: "Classical Mechanics, Quantum Mechanics, Thermodynamics, etc." },
        { iconName: "Other", name: "Other", description: "Any other topics not listed above" }
    ];


    const renderOptions = () => (
        <div className={style.optionList}>
            <p className={style.classOpinion}>What type of class is this for?</p>
            <p className={style.classOpinionSubText}>This helps us create accurate notes for you.</p>
            {options.map((option, index) => (
                <div key={index} className={style.optionItem} onClick={() => handleOptionSelect(option)}>
                    <div className={style.optionContent}>
                        {/* Přidání ikony vlevo od textu */}
                        {iconMapping[option.iconName] || null}
                        <div className={style.optionText}>
                            <h3>{option.name}</h3>
                            <p>{option.description}</p>
                        </div>
                    </div>
                    <div className={style.optionArrow}>➔</div>
                </div>
            ))}
        </div>
    );

    const renderLinkInput = () => (
        <div>
            <h2>YouTube Link</h2>
            <p>Selected Option: {selectedOption?.name}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={link}
                    onChange={handleLinkChange}
                    placeholder="Paste a YouTube link here"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );

    return (
        <div className={`${style.overlay} ${isVisible ? style.overlayVisible : style.overlayHidden}`}>
            <div className={`${style.floatingPanel} ${isVisible ? style.panelVisible : style.panelHidden}`} ref={panelRef}>
                {selectedOption ? renderLinkInput() : renderOptions()}
            </div>
        </div>
    );
};


const Dashboard = () => {
    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState(null);
    const navigate = useNavigate();

    const todashboard = async (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };
    const tosettings = async (e) => {
        e.preventDefault();
        navigate("/settings");
    };

    const handleCardClick = (type) => {
        setPanelType(type);
        setShowPanel(true);
    };

    const handlePanelClose = () => {
        setShowPanel(false);
        setPanelType(null);
    };

    return (
        <div className={style.dashboard}>
            <aside className={style.sidebar}>
                <div className={style.top}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className={style.logo}>Learn Buddy</span>
                    </Link>
                </div>
                <hr/>
                <ul>
                    <p className={style.title}>MAIN</p>
                    <li onClick={todashboard}>
                        <HomeOutlinedIcon className={style.icon} />
                        <span>Dashboard</span>
                    </li>
                    <li onClick={tosettings}>
                        <SettingsOutlinedIcon className={style.icon} />
                        <span>Settings</span>
                    </li>
                </ul>
            </aside>
            <main className={style.mainContent}>
                <h1>Dashboard</h1>
                <span className={style.newNotesSpan}>Create new notes</span>
                <div className={style.cardsContainer}>
                    <div className={style.card} onClick={() => handleCardClick('audio')}>
                        <div className={style.cardIcon}>
                            <FontAwesomeIcon icon={faMicrophone} size="2x" />
                        </div>
                        <div className={style.content}>
                            <h2>Record or Upload Audio</h2>
                            <p>Upload an audio file</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={() => handleCardClick('youtube')}>
                        <div className={style.cardIcon}>
                            <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </div>
                        <div className={style.content}>
                            <h2>YouTube Video</h2>
                            <p>Paste a YouTube link</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={() => handleCardClick('pdf')}>
                        <div className={style.cardIcon}>
                            <FontAwesomeIcon icon={faFilePdf} size="2x" />
                        </div>
                        <div className={style.content}>
                            <h2>PDF Upload</h2>
                            <p>Upload a PDF file</p>
                        </div>
                    </div>
                </div>
            </main>
            <FloatingPanel type={panelType} onClose={handlePanelClose} isVisible={showPanel} />
        </div>
    );
};

export default Dashboard;
