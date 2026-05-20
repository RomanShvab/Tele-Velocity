import "./Settings.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactIcon from "../../components/ContactIcon/ContactIcon";
import { useCurrentUser } from "../../CurrentUserContext";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const {currentUser} = useCurrentUser();
  const {setCurrentUser} = useCurrentUser();
  const navigate = useNavigate();

  console.log(currentUser);
  return (
    <div id="SettingsPage">      
      <div id="SettingsSidebar">
        <div id="UserPreview">
          <ContactIcon name = {currentUser?.name}  avatar = {currentUser?.avatarUrl} size = {70} />
          <div className="UserInfo">
            <p className="UserName">{currentUser?.name}</p>
            <p className="UserPhone">{currentUser?.phone ? currentUser?.phone : "Set Phone number"}</p>
          </div>
        </div>

        <div className="Menu">
          <button onClick={() => setActiveTab("account")} className={activeTab === "account" ? "active" : ""}>
            Account
          </button>
          <button onClick={() => setActiveTab("privacy")} className={activeTab === "privacy" ? "active" : ""}>
            Privacy
          </button>
          <button onClick={() => setActiveTab("chat")} className={activeTab === "chat" ? "active" : ""}>
            Chat Settings
          </button>
          <button onClick={() => {
            setCurrentUser(null);
            localStorage.removeItem("currentUser");
            navigate("/");
          }
          } className={activeTab === "chat" ? "active" : ""}>
            Log Out
          </button>
        </div>
      </div>

      <div id="SettingsContent">

        {activeTab === "account" && (
          <>
          <div className="Title">
            <h1>Account</h1>
            <p className="Sub">
              Manage your profile and personal information.
            </p>

          </div>

            <div className="Cards">

              <div className="CardCenter">
                <ContactIcon style = {{marginBottom: 10}} name = {currentUser?.name} size = {120}></ContactIcon>
                <p className="Name">Alex Rivera</p>
                <p className="Status">Active now</p>
              </div>

              {/* INFO */}
              <div className="CardLeft" style={{alignItems: "left", textAlign: "left"}}>
                <p className="Label">Username</p>
                <h3>@alex_dev</h3>

                <p className="Label">Phone</p>
                <h3>+48 123 456 789</h3>

                <p className="Label">Bio</p>
                <p>
                  Frontend developer. Likes clean UI and simple solutions.
                </p>
              </div>

            </div>

            <h2 className="SectionTitle">Account Management</h2>

            <div className="Cards">

              <div className="CardLeft Small">
                <h3>Change Phone Number</h3>
                <p>Update your phone number</p>
              </div>

              <div className="CardLeft Small">
                <h3>Security Check</h3>
                <p>Review login activity</p>
              </div>

            </div>
          </>
        )}

        {activeTab === "privacy" && (
          <h1>Privacy settings (coming soon)</h1>
        )}

        {activeTab === "chat" && (
          <h1>Chat settings (coming soon)</h1>
        )}

      </div>
    </div>
  );
}

export default Settings;