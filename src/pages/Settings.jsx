import Footer from "../../components/Footer.jsx";
import Checkbox from "../../components/inputs/Checkbox.jsx";
import TextField from "../../components/inputs/TextField.jsx";
import RadioSelect from "../../components/inputs/RadioSelect.jsx";

/** Settings page. */
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
                <h2>Style</h2>
                    <RadioSelect label={"Theme"} options={[
                        "Light",
                        "Dark",
                        "Contrast"
                    ]}/>
            </div>
            <Footer />
        </>
    )
}

export default Settings;