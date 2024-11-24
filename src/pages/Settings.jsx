import Footer from "../../components/Footer.jsx";
import Checkbox from "../../components/Checkbox.jsx";
import TextField from "../../components/TextField.jsx";

function Settings() {
    return (
        <>
            <div id="settings">
                <h1>Settings</h1>
                <h2>Timer</h2>
                    <TextField label="Main Timer (minutes)" />
                    <TextField label="Short Break (minutes)" />
                    <TextField label="Long Break (minutes)" />
                    <Checkbox label="Automatically start breaks" />
                    <Checkbox label="Enable long break" />
                <h2>Theme</h2>
            </div>
            <Footer />
        </>
    )
}

export default Settings;