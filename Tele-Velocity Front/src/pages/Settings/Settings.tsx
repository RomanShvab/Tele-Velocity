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

  async function changeUserData(field: string) {

    let promptText = "";

    switch (field) {
      case "phone":
        promptText = "Enter new phone number";
        break;

      case "bio":
        promptText = "Enter new bio";
        break;

      case "name":
        promptText = "Enter new name";
        break;

      default:
        return;
    }

    const newValue = prompt(promptText);

    if (!newValue || !currentUser)
      return;

    const updatedUser = {
      name: currentUser.name,
      bio: currentUser.bio,
      phone: currentUser.phone,
      avatarUrl: currentUser.avatarUrl,
    };

    updatedUser[field as keyof typeof updatedUser] = newValue;

    const response = await fetch(
      `http://localhost:8080/auth/user/${currentUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    const data = await response.json();

    setCurrentUser(data);

    localStorage.setItem("currentUser", JSON.stringify(data));
  }
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
                <p className="Name">{currentUser?.name}</p>
                <p className="Status">Active now</p>
              </div>

              <div className="CardLeft" style={{alignItems: "left", textAlign: "left"}}>
                <p className="Label">email</p>
                <h3>{currentUser?.email}</h3>

                <p className="Label">Phone</p>
                <h3>{currentUser?.phone ? currentUser?.phone : "Set Phone number"}</h3>

                <p className="Label">Bio</p>
                <p>
                  {currentUser?.bio ? currentUser?.bio : "Set profile bio"}
                </p>
              </div>

            </div>

            <h2 className="SectionTitle">Account Management</h2>

            <div className="Cards">

              <div className="CardLeft Small" onClick={() => changeUserData("phone")}>
                <h3>Change Phone Number</h3>
                <p>Update your phone number</p>
              </div>

              <div className="CardLeft Small" onClick={() => changeUserData("bio")}>
                <h3>Change Bio</h3>
                <p>Update your bio</p>
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