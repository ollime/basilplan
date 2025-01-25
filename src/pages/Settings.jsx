import Checkbox from "../../components/Checkbox.jsx";
import Footer from "../../components/Footer.jsx";
import RadioSelect from "../../components/RadioSelect.jsx";
import TextField from "../../components/TextField.jsx";

/** Settings page. */
function Settings() {
  return (
    <>
      <div id="settings" className="mb-20 flex flex-col gap-1">
        <h1 className="mb-2 text-2xl">Settings</h1>
        <h2 className="text-xl">Timer</h2>
        <TextField label="Main Timer (minutes)" />
        <TextField label="Short Break (minutes)" />
        <TextField label="Long Break (minutes)" />
        <Checkbox label="Automatically start breaks" />
        <h2 className="text-xl">Style</h2>
        <RadioSelect label={"Theme"} options={["Light", "Dark"]} />
      </div>
      <Footer />
    </>
  );
}

export default Settings;
