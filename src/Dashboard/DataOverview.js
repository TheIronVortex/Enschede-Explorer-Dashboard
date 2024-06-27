import { useParams } from "react-router-dom";
import React from "react";
import POIData from "./POIData";
import RouteData from "./RouteData";
import ShopData from "./ShopData";
import UserData from "./UserData";
import QRCodeData from "./QRcodeData";

function DataOverview({selectedColor, selectedTextColor}) {

  const { ParentKey } = useParams(); // Access the key from URL params
  //console.log(ParentKey);
  var ParentKeyValue;

  switch( ParentKey ){
    case "POIs":
      ParentKeyValue = <POIData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>
      break;
    case "Routes":
      ParentKeyValue = <RouteData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>
      break;
    case "Shop":
      ParentKeyValue = <ShopData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>
      break;
    case "Users":
      ParentKeyValue = <UserData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>
      break;
    case "QRCodes":
      ParentKeyValue = <QRCodeData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>
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