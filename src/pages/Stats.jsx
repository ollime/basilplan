import Footer from "../../components/Footer.jsx";
import ChartApp from "../../components/charts/ChartApp.jsx";

/** Displays data from the log. */
function Stats() {
  return (
    <>
      <div className="lg:m-20">
        <ChartApp />
        <Footer />
      </div>
    </>
  );
}

export default Stats;
