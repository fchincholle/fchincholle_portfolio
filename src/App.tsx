import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRouter from "./router/PublicRouter";

//import TopMenu from "./components/nav/TopMenu";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            {/*<TopMenu />*/}
            <div>
                <Routes>
                    <Route path="/*" element={<PublicRouter />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
