import { useParams } from "react-router-dom";
import React from "react";
import POIData from "./POIData";
import RouteData from "./RouteData";
import ShopData from "./ShopData";
import UserData from "./UserData";

function DataOverview() {

  const { ParentKey } = useParams(); // Access the key from URL params
  //console.log(ParentKey);
  var ParentKeyValue;

  switch( ParentKey ){
    case "POIs":
      ParentKeyValue = <POIData />
      break;
    case "Routes":
      ParentKeyValue = <RouteData />
      break;
    case "Shop":
      ParentKeyValue = <ShopData />
      break;
    case "Users":
      ParentKeyValue = <UserData />
      break;
    default:
  }


  return(
    <div>
      {ParentKeyValue}
    </div>
  )
};

export default DataOverview;