import "./DropDownMenu.css";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";


export default function DropDownMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (    
        <div id = "DropDown">
            <button id = "BurgerButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FiMenu id = "BurgerIcon" size={24} />
            </button>
                {isMenuOpen && (
                    <div id = "DropDownMenu">
                        <div className = "DropDownMenuOptions">
                            Profile
                        </div>
                        <div className = "DropDownMenuOptions">
                            Settings
                        </div>
                        <div className = "DropDownMenuOptions">
                            Logout
                        </div>
                    </div>
                )}
            </div>
    );
}