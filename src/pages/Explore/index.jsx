import React, { useState, useEffect } from "react";
import "./index.scss";

// import components
import SearchFilters from "./SearchFilters";
import Advertisement from "./Advertisement";
import { MarketTile } from "../../components/Tile";
import { SecondaryButton } from "../../components/Buttons";

// import masonry
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// import icons
import { BiLoaderCircle } from "react-icons/bi";

// import utils
import {
  // getMarketItemsCustom,
  getAvailableMarketItemsCustom,
} from "../../utils/wallets/marketplace";

const masonryColumnBreakPoints = {
  300: 1,
  600: 2,
  1000: 3,
  1500: 4,
  2000: 5,
};

const loadCount = 8;

const ExplorePage = () => {
  const [loading, setLoading] = useState(true);
  const [marketItemsArray, setMarketItemsArray] = useState([]);
  const [fromIndex, setFromIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getAvailableMarketItemsCustom(fromIndex, loadCount)
      .then((res) => {
        setTotalCount(res.totalCount);
        setFromIndex(res.fromIndex);
        setMarketItemsArray(
          [].concat(marketItemsArray).concat(res.marketItems)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log("Load More ERROR: ", err);
        setLoading(false);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    getAvailableMarketItemsCustom(fromIndex, loadCount)
      .then((res) => {
        setTotalCount(res.totalCount);
        setFromIndex(res.fromIndex);
        setMarketItemsArray(
          [].concat(marketItemsArray).concat(res.marketItems)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log("Load More ERROR: ", err);
        setLoading(false);
      });
  };

  return (
    <>
      <SearchFilters />
      <Advertisement />
      <div className="tiles_container">
        {marketItemsArray.length === 0 ? (
          !loading && (
            <div className="text-center text-white">
              <h2>There are no items.</h2>
            </div>
          )
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={masonryColumnBreakPoints}>
            <Masonry gutter="32px">
              {marketItemsArray.map((item, index) => (
                <MarketTile key={"tile_" + index} marketItem={item} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <div className="w-100 text-center mt-5">
          <SecondaryButton
            text="Load More"
            id={"tiles_load_more_button"}
            icon={<BiLoaderCircle className="text-white me-2" size={24} />}
            style={{ width: "200px" }}
            onClick={() => {
              onLoadMore();
            }}
            textSize={20}
            loading={loading}
            disabled={totalCount - fromIndex <= 0}
          />
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
