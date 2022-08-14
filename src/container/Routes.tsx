import {
  BrowserRouter as Router,
  Route,
  Routes as Routing,
} from "react-router-dom";
import QrCodeGenerator from "./QrCodeGenerator";

const Routes = () => {
  return (
    <Router>
      <Routing>
        <Route path="/" element={<QrCodeGenerator />}>
          <Route path=":type" element={<QrCodeGenerator />} />
        </Route>
      </Routing>
    </Router>
  );
};
export default Routes;
