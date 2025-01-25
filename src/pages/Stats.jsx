/** @file Displays data from the log. */
import Footer from "../../components/Footer.jsx";
import ChartApp from "../../components/charts/ChartApp.jsx";

function Stats() {
  return (
    <>
      <div className="lg:m-20 xl:mx-40">
        <ChartApp />
        <Footer />
      </div>
    </>
  );
}

export default Stats;
