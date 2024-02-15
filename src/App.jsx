import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";


import Home from "./pages/home/Home";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Explore from "./pages/explore/Explore";
import Watchlist from "./pages/watchlist/Watchlist";
import Search from "./pages/search/Search";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Details from "./pages/details/Details";
import ProtectedRoutes from "./ProtectedRoutes";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id]=item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
    <div className="yflex yflex-col yh-screen yjustify-between ">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/film/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore/movie" element={<Explore />} />
       <Route path="/watchlist" element={
          <ProtectedRoutes>
            <Watchlist />
          </ProtectedRoutes>
       }>
       </Route>
      </Routes>
      <Footer />
      <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;