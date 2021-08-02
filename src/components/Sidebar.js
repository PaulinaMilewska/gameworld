import StickyBox from "react-sticky-box";
// import MenuBookIcon from "@material-ui/icons/MenuBook";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import {Link} from "react-router-dom";
import "../stylings/TopBarMenu.css";

export function Sidebar() {
  return (
    <>
      <StickyBox>
        <h2 className="sidebarHeader">Menu</h2>
        <div className="content-sidebar" style={{color: "white"}}>
          <ul>
            <li className="MenuItem2">
              <Link to="/articles">
                <ImportContactsIcon style={{float: "left"}} />
                <span>&nbsp;&nbsp;&nbsp;Articles</span>
              </Link>
            </li>
            <li className="MenuItem2">
              <Link to="/games">
                <SportsEsportsIcon style={{float: "left"}} />
                <span>&nbsp;&nbsp;&nbsp;Game catalog</span>
              </Link>
            </li>
            <li className="MenuItem2">
              <Link to="/gallery">
                <WallpaperIcon style={{float: "left"}} />
                <span>&nbsp;&nbsp;&nbsp;Gallery</span>
              </Link>
            </li>
          </ul>
        </div>
      </StickyBox>
    </>
  );
}
