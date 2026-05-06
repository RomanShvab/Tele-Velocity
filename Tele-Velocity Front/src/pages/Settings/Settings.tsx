import "./Settings.css";
import { useState } from "react";
import ContactIcon from "../../components/ContactIcon/ContactIcon";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div id="SettingsPage">
      
      <div id="SettingsSidebar">
        <div id="UserPreview">
          <ContactIcon contact = {{id: 0, name: "Alex Rivera" }} size = {60} />
          <div className="UserInfo">
            <h3>Alex Rivera</h3>
            <p>+1 234 567 890</p>
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
        </div>
      </div>

      <div id="SettingsContent">

        {activeTab === "account" && (
          <>
            <h1>Account</h1>
            <p className="Sub">
              Manage your profile and personal information.
            </p>

            <div className="Cards">

              <div className="Card">
                <div className="BigAvatar">A</div>
                <h2>Alex Rivera</h2>
                <p className="Status">Active now</p>
              </div>

              {/* INFO */}
              <div className="Card">
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

              <div className="Card Small">
                <h3>Change Phone Number</h3>
                <p>Update your phone number</p>
              </div>

              <div className="Card Small">
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